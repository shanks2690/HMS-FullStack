package org.hms.Guard.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hms.Guard.auth.Credentials;
import org.hms.Guard.auth.GeneratedToken;
import org.hms.Guard.auth.RegistrationCredentials;
import org.hms.Guard.dto.CredentialsDto;
import org.hms.Guard.entity.Role;
import org.hms.Guard.entity.SimpleMail;
import org.hms.Guard.entity.User;
import org.hms.Guard.exception.BadCredentialsException;
import org.hms.Guard.exception.MailServiceNotReady;
import org.hms.Guard.exception.UserNameAlreadyExistsException;
import org.hms.Guard.exception.UserNotFoundException;
import org.hms.Guard.feignservices.MailFeign;
import org.hms.Guard.kafka.Sender;
import org.hms.Guard.mapper.UserMapper;
import org.hms.Guard.repository.UserRepository;
import org.hms.Guard.service.JwtService;
import org.springframework.cloud.config.environment.Environment;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;


@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationService  {
    private final Sender sender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailFeign mailFeign;
    private final HttpServletResponse response;
    private final ObjectMapper objectMapper;
    public CredentialsDto register(RegistrationCredentials request) throws JsonProcessingException {
        User user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .build();
        try {
            if (userRepository.findByEmail(user.getEmail()).isPresent())
                throw new RuntimeException();
        } catch (RuntimeException e) {
            throw new UserNameAlreadyExistsException("User name specified already exists. Try a different one");
        }
    log.info(request);
        userRepository.save(user);
        sendToken(request);
        try {
            try {
                mailFeign.sendMail(composeMail(request));
            } catch (Exception e) {
                throw new MailServiceNotReady("Mail Server Not Running");
            }
        } catch (MailServiceNotReady e) {

        }
        return UserMapper.userToCreddto(user);
    }

    private void sendToken(RegistrationCredentials reg)  {
        CredToken credToken = new CredToken();
        credToken.setEmail(reg.getEmail());
        credToken.setFirstname(reg.getFirstname());
        credToken.setLastname(reg.getLastname());
        credToken.setRole(reg.getRole().toUpperCase());

        if (credToken.getRole().equalsIgnoreCase("PATIENT")) {
            try {
                sender.sendToPat(objectMapper.writeValueAsString(credToken));
            } catch (JsonProcessingException e) {
                log.error("Kafka send errored out {} ", e.getMessage());
            }
        }
        log.info(credToken);
    }


    private SimpleMail composeMail(RegistrationCredentials regCred) {
        SimpleMail mail = new SimpleMail();
        mail.setTo(regCred.getEmail());
        mail.setFrom("shashankk.smail@gmail.com");
        mail.setSub("Login Credentials");
        mail.setBody("""
                Hi %s %s. Your account in Hospital Managament System has been made with the following credentials.
                1. Username - %s
                2. password - %s
                        
                You have been authorised to access the %s module.
                Regards
                Team HMS""".formatted(regCred.getFirstname(), regCred.getLastname(), regCred.getEmail(), regCred.getPassword(), regCred.getRole()));
        log.info(mail);
        return mail;
    }
    public GeneratedToken authenticate(Credentials request) {
        log.info(request.getEmail());
        log.info(request.getPassword());
        Authentication auth;
        try {
         auth = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("Authenticated -> {} ",auth.getName());
            log.info("Authenticated -> {} ",auth.getAuthorities());

        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Bad Credentials");
        }
        User user = (User) auth.getPrincipal();
        String jwtToken = jwtService.generateToken(user, user.getRole());
        response.setHeader("Authorization", jwtToken);
        return GeneratedToken.builder()
                .token(jwtToken).role(user.getRole())
                .build();
    }
}

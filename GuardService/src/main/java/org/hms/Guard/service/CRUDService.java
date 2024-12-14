package org.hms.Guard.service;

import lombok.RequiredArgsConstructor;
import org.hms.Guard.auth.RegistrationCredentials;
import org.hms.Guard.dto.CredentialsDto;
import org.hms.Guard.dto.PasswordChange;
import org.hms.Guard.entity.User;
import org.hms.Guard.exception.UserNotFoundException;
import org.hms.Guard.mapper.UserMapper;
import org.hms.Guard.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CRUDService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public String delAccount(String userName) {
        try {
            userRepository.deleteByEmail(userName);
            return "User account deleted successfully";
        } catch (Exception e) {
            throw new UserNotFoundException("User doesn't exist!");
        }
    }

    public String upateAccount(RegistrationCredentials credentials) {
        try {
            User user = userRepository.findByEmail(credentials.getEmail()).orElseThrow();
            User newUser = new User();

            newUser.setPassword(credentials.getPassword() == null ? user.getPassword() : passwordEncoder.encode(credentials.getPassword()));
            newUser.setEmail(credentials.getEmail() == null ? user.getEmail() : credentials.getEmail());
            newUser.setLastName(credentials.getLastname() == null ? user.getLastName() : credentials.getLastname());
            newUser.setFirstName(credentials.getFirstname() == null ? user.getFirstName() : credentials.getFirstname());
            return "User account updated successfully";
        } catch (Exception e) {
            throw new UserNotFoundException("User not found!");
        }
    }

    public List<CredentialsDto> fetchAll() {
        List<User> credentials = userRepository.findAll();
        return credentials.stream().map(x -> UserMapper.userToCreddto(x)).toList();
    }

    public CredentialsDto getUser(String email) {
        User credentials;
        try {
            credentials = userRepository.findByEmail(email).orElseThrow();
        } catch (Exception e) {
            throw new UserNotFoundException("User not found!");
        }
        return UserMapper.userToCreddto(credentials);
    }

    public String changePwd(PasswordChange pwd) {

        User updatedUser;

        try {
            updatedUser = userRepository.findByEmail(pwd.getEmail()).orElseThrow();
            if (passwordEncoder.matches(pwd.getOp(), updatedUser.getPassword())) {
                if (pwd.getNp2().equals(pwd.getNp2())) {
                    updatedUser.setPassword(passwordEncoder.encode(pwd.getNp1()));
                    userRepository.deleteByEmail(pwd.getEmail());
                    userRepository.save(updatedUser);
                    return "Password Changed successfully!";
                } else return "New Passwords don't match";
            } else throw new RuntimeException("Wrong old password");

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new UserNotFoundException("Incorrect Username");
        }
    }
}

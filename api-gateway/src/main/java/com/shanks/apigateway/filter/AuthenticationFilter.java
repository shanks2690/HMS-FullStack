package com.shanks.apigateway.filter;

import com.shanks.apigateway.util.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.eclipse.jgit.ignore.internal.PathMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.nio.file.Path;
import java.util.regex.Pattern;

@Log4j2
@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = null;
            log.info("The uri is  {}",exchange.getRequest().getURI().getPath());
            if (validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String token = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (token != null && token.startsWith("Bearer ")) {
                    token = token.substring(7);
                }
                try {
                    jwtUtil.validateToken(token);
                    log.info("Valid token");
                    String role;
                    String path=exchange.getRequest().getPath().toString();
                    log.info("Path is {}",path);

                    role=  jwtUtil.extractRole(token);
                    log.info("Role is {}",role);

                if(path.charAt(path.length()-1)=='/');   // the  following check will not be carried out in case  path has / in the end as it is an invalid path and let the logic in the other part of the program handle it
                    else if(!chkAuthorization(role,path))
                            throw new Exception("Some problem in the authorization");

            request =exchange.getRequest().mutate().header("loggedInUser", jwtUtil.extractUsername(token)).build();
             log.info("Request headers {}",request.getHeaders());
                } catch (Exception e) {
                    log.error("invalid access...! \n {}",  e.getMessage());
                    throw new RuntimeException("un authorized access to application");
                }
            }
            return chain.filter(exchange.mutate().request(request).build());
        });
    }

    private boolean chkAuthorization(String role, String path) {
        log.info("Checking auth with {} and {}",role,path);
        String admin = "^/admin(?:/[\\w\\d]+)?$";
        String pat = "^/pat(?:/[\\w\\d]+)?$";
        String mail = "^/mail(?:/[\\w\\d]+)?$";
        String doc = "^/doc(?:/[\\w\\d]+)?$";
        String rec = "^/rec(?:/[\\w\\d]+)?$";
        String apnt = "^/apnt(?:/[\\w\\d]+)?$";
        String pharma ="^/pharma(?:/[\\w\\d]+)?$";
        String prsc = "^/prsc(?:/[\\w\\d]+)?$";
        String room = "^/room(?:/[\\w\\d]+)?$";

        if(role.equals("ADMIN"))
            return Pattern.matches(admin,path)||Pattern.matches(mail,path)||Pattern.matches(apnt,path)||Pattern.matches("/guard/.*",path);
        if(role.equals("DOCTOR"))
            return Pattern.matches(doc,path)||Pattern.matches(mail,path)||Pattern.matches(apnt,path)||Pattern.matches(prsc,path)||Pattern.matches("^/pharma/allmed",path)||Pattern.matches("/guard/changepwd",path);
        if(role.equals("PATIENT"))
            return Pattern.matches(pat,path)||Pattern.matches(apnt,path)||Pattern.matches("/guard/changepwd",path);
        if(role.equals("RECEPTIONIST"))
            return Pattern.matches(rec,path)||Pattern.matches(mail,path)||Pattern.matches(apnt,path)||Pattern.matches(room,path)||Pattern.matches("/guard/changepwd",path);
        if(role.equals("PHARMACIST"))
            return Pattern.matches(pharma,path)||Pattern.matches("/guard/changepwd",path);
    return false;
}

    public static class Config {

    }
}

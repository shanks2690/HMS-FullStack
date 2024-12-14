package org.hms.Guard.contoller;


import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.hms.Guard.auth.*;
import org.hms.Guard.dto.CredentialsDto;
import org.hms.Guard.dto.PasswordChange;
import org.hms.Guard.service.AuthenticationService;
import org.hms.Guard.service.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("guard")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @Autowired
    private CRUDService crudService;


    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody RegistrationCredentials request) {
        System.out.println("Entered here");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("authenticate")  //common entry point
    public ResponseEntity<?> authenticate(@RequestBody Credentials request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("allusers") // access with admin
    public ResponseEntity<List<CredentialsDto>> fetchAll() {
        return ResponseEntity.ok(crudService.fetchAll());
    }

    @PostMapping("user") // access with admin
    public ResponseEntity<CredentialsDto> getUser(@RequestBody  String email) {
        System.out.println("Recieved get user request from admin");
        return ResponseEntity.ok(crudService.getUser(email));
    }

    @DeleteMapping("del")   // access with admin
    public ResponseEntity<String> delAccount(@RequestBody String userName) {

        System.out.println("Delete request received");
        return ResponseEntity.ok(crudService.delAccount(userName));
    }


    @PutMapping("update")  //access with user
    public ResponseEntity<String> updateAccount(@RequestBody RegistrationCredentials credentials) {
        return ResponseEntity.ok(crudService.upateAccount(credentials));
    }

    @PutMapping("changepwd")
    public ResponseEntity<?> update(@RequestBody PasswordChange pwd) {
        System.out.println(pwd);
        return ResponseEntity.ok(crudService.changePwd(pwd));
    }
}

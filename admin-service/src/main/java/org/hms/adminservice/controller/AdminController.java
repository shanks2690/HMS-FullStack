package org.hms.adminservice.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.adminservice.document.RegDoc;
import org.hms.adminservice.dto.CredentialsDto;
import org.hms.adminservice.dto.RegistrationCredentials;
import org.hms.adminservice.feigncalls.GuardFeign;
import org.hms.adminservice.repository.RegRepository;
import org.hms.adminservice.service.AdminImpl;
import org.hms.adminservice.transferservices.ConsistencyTfr;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Guard;
import java.util.List;


@RestController
@Slf4j
@RequestMapping("admin")
@AllArgsConstructor
public class AdminController {
    AdminImpl admin;
    RegRepository regRepository;
    ConsistencyTfr consistencyTfr;
    GuardFeign guardFeign;
    @PostMapping("register")
    public ResponseEntity<CredentialsDto> registerUser(@RequestBody RegistrationCredentials request) {
        CredentialsDto userCred = admin.registerUser(request).getBody();
        consistencyTfr.saveUser(userCred);
        return ResponseEntity.ok(userCred);
    }
    @DeleteMapping("del")
    public ResponseEntity<String> delUser(@RequestBody String email) {

        System.out.println("deleting "+ email);
        ResponseEntity<CredentialsDto> cred = guardFeign.getUser(email);
        String msg = admin.delUser(email).getBody();

        System.out.println("deleted from user");
//        if(!cred.getBody().getRole().equalsIgnoreCase("ADMIN"))
        consistencyTfr.delUser(cred.getBody());
        return ResponseEntity.ok(msg);

    }

    @GetMapping("allusers")
    public ResponseEntity<List<CredentialsDto>> getAllUsers() {
        return admin.getAllUsers();
    }

    @PostMapping("user")
    public ResponseEntity<CredentialsDto> getUser(@RequestBody  String email) {
        System.out.println("Finding "+ email);
            return guardFeign.getUser(email);

    }

    @GetMapping("regreq")
    public ResponseEntity<List<RegDoc>> getRegRequests() {
        System.out.println(regRepository.findAll());
        return ResponseEntity.ok(regRepository.findAll());
    }
    @PostMapping("regpat")
    public ResponseEntity<?> regPats() {
        log.info("I Entered here");
        List<RegDoc> regList = regRepository.findAll();
        if (regList.isEmpty()) {
            return ResponseEntity.ok("No registration requests found.");
        }

        for (RegDoc x : regList) {
            RegistrationCredentials request = new RegistrationCredentials();
            request.setRole("PATIENT");
            request.setEmail(x.getEmail());
            request.setFirstname(x.getFirstname());
            request.setPassword("patient123");
            request.setLastname(x.getLastname());

            // Register the user
            CredentialsDto dto = admin.registerUser(request).getBody();
try {
    // Save user to consistent storage
    consistencyTfr.saveUser(dto);
}catch(Exception e)
{
    admin.delUser(request.getEmail());
}
            // Remove the request from the repository
            regRepository.deleteByEmail(x.getEmail());
        }

        return ResponseEntity.ok("All registration requests approved successfully.");
    }

}

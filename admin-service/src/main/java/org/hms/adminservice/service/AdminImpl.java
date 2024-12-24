package org.hms.adminservice.service;

import lombok.AllArgsConstructor;
import org.hms.adminservice.dto.CredentialsDto;
import org.hms.adminservice.dto.RegistrationCredentials;
import org.hms.adminservice.feigncalls.GuardFeign;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminImpl  implements AdminServices{

    GuardFeign guardFeign;
    @Override
    public ResponseEntity<CredentialsDto> registerUser(RegistrationCredentials request) {
        return guardFeign.register(request);
    }

    @Override
    public ResponseEntity<String> delUser(String userName) {

        System.out.println(userName);
return guardFeign.delAccount(userName);
    }

    @Override
    public ResponseEntity<RegistrationCredentials> updateUser(String userName) {
        return null;
    }

    @Override
    public ResponseEntity<List<CredentialsDto>> getAllUsers(String authHeader) {
        return guardFeign.fetchAll(authHeader);
    }

}

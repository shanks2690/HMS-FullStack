package org.hms.adminservice.service;

import org.hms.adminservice.dto.CredentialsDto;
import org.hms.adminservice.dto.RegistrationCredentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public interface AdminServices {

    public ResponseEntity<CredentialsDto> registerUser(RegistrationCredentials request);
    public ResponseEntity<String> delUser(String userName);
    public ResponseEntity<RegistrationCredentials> updateUser(String userName);

     ResponseEntity<List<CredentialsDto>> getAllUsers(String authorization);

}

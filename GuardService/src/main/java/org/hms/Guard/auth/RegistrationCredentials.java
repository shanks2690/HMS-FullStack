package org.hms.Guard.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationCredentials {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;

}

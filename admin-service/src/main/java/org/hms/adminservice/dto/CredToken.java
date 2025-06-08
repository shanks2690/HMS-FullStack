package org.hms.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CredToken {
    private String firstname;
    private String lastname;
    private String email;
    private String role;
}
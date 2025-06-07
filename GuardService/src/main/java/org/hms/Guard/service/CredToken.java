package org.hms.Guard.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CredToken {
    private String email;
    private String firstname;
    private String lastname;
    private String role;
}

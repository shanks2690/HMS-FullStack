package org.hms.Guard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PasswordChange {
    private String op;
    private String np1;
    private String np2;
    private String email;
}

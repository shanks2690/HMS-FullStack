package org.hms.Guard.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hms.Guard.entity.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedToken {
    private String token;
    private Role role;
}

package org.hms.Guard.mapper;

import org.hms.Guard.dto.CredentialsDto;
import org.hms.Guard.entity.User;

public class UserMapper {

    public static CredentialsDto userToCreddto(User user)
    {
        CredentialsDto dto= new CredentialsDto();
        dto.setEmail(user.getEmail());
        dto.setFirstname(user.getFirstName());
        dto.setRole(user.getRole().toString());
        dto.setLastname(user.getLastName());
        return dto;
    }
}

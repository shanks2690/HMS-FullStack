package com.shanks.appointmentservice.dto;

import com.shanks.appointmentservice.entity.enums.BranchCode;
import com.shanks.appointmentservice.entity.enums.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocDepDto {
    private int docId;
    private String firstname;
    private String lastname;
    private String email;
    private Department department;
    private String regNo;
    private String Qualification;
    private BranchCode branchCode;
    private Boolean availability;
    private String message;
}


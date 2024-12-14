package org.hms;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AppointmentRequest {
    private String patientName;
}

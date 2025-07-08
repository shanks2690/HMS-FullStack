package org.shanks;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentRequest {
    private String docId;
    private String patientName;
    private LocalDateTime from;
    private LocalDateTime to;
    private LocalDate date;

    public AppointmentRequest(String docId, String patientName, LocalDateTime from, LocalDateTime to, LocalDate date) {
        this.docId = docId;
        this.patientName = patientName;
        this.from = from;
        this.to = to;
        this.date = date;
    }

    public AppointmentRequest() {
    }

    public String getDocId() {
        return this.docId;
    }


    public void setDocId(String docId) {
        this.docId = docId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public LocalDateTime getFrom() {
        return from;
    }

    public void setFrom(LocalDateTime from) {
        this.from = from;
    }

    public LocalDateTime getTo() {
        return to;
    }

    public void setTo(LocalDateTime to) {
        this.to = to;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

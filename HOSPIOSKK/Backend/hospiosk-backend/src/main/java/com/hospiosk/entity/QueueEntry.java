package com.hospiosk.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "queue_entries")
public class QueueEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tokenNumber;

    private String status; 
    // WAITING
    // SERVING
    // COMPLETED

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    public QueueEntry() {}

    public QueueEntry(String tokenNumber, String status, Appointment appointment) {
        this.tokenNumber = tokenNumber;
        this.status = status;
        this.appointment = appointment;
    }

    public Long getId() {
        return id;
    }

    public String getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(String tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}

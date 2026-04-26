package com.hospiosk.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorName;

    private String specialization;

    private int availableSlots; // existing (freeze)

    // NEW FIELD (Actual time slots store karega)
    private String slotTimings;

    // Default Constructor
    public Doctor() {
    }

    // Parameterized Constructor
    public Doctor(Long id, String doctorName, String specialization,
                  int availableSlots, String slotTimings) {

        this.id = id;
        this.doctorName = doctorName;
        this.specialization = specialization;
        this.availableSlots = availableSlots;
        this.slotTimings = slotTimings;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public int getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(int availableSlots) {
        this.availableSlots = availableSlots;
    }

    
    public String getSlotTimings() {
        return slotTimings;
    }

    public void setSlotTimings(String slotTimings) {
        this.slotTimings = slotTimings;
    }
}

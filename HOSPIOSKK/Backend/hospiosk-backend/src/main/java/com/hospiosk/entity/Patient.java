package com.hospiosk.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aadhaar_number", unique = true, nullable = false, length = 12)
    private String aadhaarNumber;

    @Column(name = "fingerprint_id", unique = true)
    private String fingerprintId;

    @Column(nullable = false)
    private String name;

    private Integer age;

    private String gender;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    // Automatically set time
    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getFingerprintId() {
        return fingerprintId;
    }

    public void setFingerprintId(String fingerprintId) {
        this.fingerprintId = fingerprintId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

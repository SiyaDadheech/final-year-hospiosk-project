package com.hospiosk.repository;

import com.hospiosk.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientAadhaarNumber(String aadhaarNumber);
    
    List<Appointment> findByDoctorName(String doctorName);


}

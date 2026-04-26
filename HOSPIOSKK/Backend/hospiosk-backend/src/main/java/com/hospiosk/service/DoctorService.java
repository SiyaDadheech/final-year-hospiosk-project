package com.hospiosk.service;

import com.hospiosk.entity.Doctor;

import java.util.List;

public interface DoctorService {

    Doctor addDoctor(Doctor doctor);

    List<Doctor> getAllDoctors();

    List<String> getAvailableSlots(String doctorName);


}

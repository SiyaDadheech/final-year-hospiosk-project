package com.hospiosk.controller;

import com.hospiosk.entity.Doctor;
import com.hospiosk.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Add Doctor API
    @PostMapping("/add")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    // Get All Doctors
    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
    
    @GetMapping("/available-slots/{doctorName}")
    public List<String> getAvailableSlots(@PathVariable String doctorName) {

        return doctorService.getAvailableSlots(doctorName);
    }

}

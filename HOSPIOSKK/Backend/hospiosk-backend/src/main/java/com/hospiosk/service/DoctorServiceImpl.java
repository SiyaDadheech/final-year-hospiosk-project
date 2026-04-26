package com.hospiosk.service;

import com.hospiosk.entity.Appointment;
import com.hospiosk.entity.Doctor;
import com.hospiosk.repository.AppointmentRepository;
import com.hospiosk.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;

    // Constructor Injection
    public DoctorServiceImpl(DoctorRepository doctorRepository,
                             AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
    }

    // Doctor Add
    @Override
    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Available Slots Logic
    @Override
    public List<String> getAvailableSlots(String doctorName) {

        // Doctor fetch
        Doctor doctor = doctorRepository.findByDoctorName(doctorName)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Doctor ke saare slots
        List<String> allSlots =
                Arrays.asList(doctor.getSlotTimings().split(","));

        // Already booked appointments
        List<Appointment> bookedAppointments =
                appointmentRepository.findByDoctorName(doctorName);

        // Booked slot list
        List<String> bookedSlots =
                bookedAppointments.stream()
                        .map(Appointment::getTimeSlot)
                        .toList();

        // Available slot return
        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .toList();
    }
}

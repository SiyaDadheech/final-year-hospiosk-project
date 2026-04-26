package com.hospiosk.service;

import com.hospiosk.dto.ReceiptResponse;
import com.hospiosk.entity.Appointment;
import com.hospiosk.entity.Patient;
import com.hospiosk.repository.AppointmentRepository;
import com.hospiosk.repository.PatientRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final QueueService queueService;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  PatientRepository patientRepository,
                                  QueueService queueService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.queueService = queueService;
    }

    @Override
    public Appointment bookAppointment(Appointment appointment) {

    	if(appointment.getAadhaarNumber() == null || appointment.getAadhaarNumber().isEmpty()) {
    	    throw new RuntimeException("Aadhaar number is required");
    	}
        // Aadhaar se patient fetch
        Patient patient = patientRepository
                .findByAadhaarNumber(appointment.getAadhaarNumber())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Patient attach
        appointment.setPatient(patient);

        // Token generate
        appointment.setTokenNumber(generateToken());

        // Payment already done
        appointment.setPaymentStatus("PAID");

        // Appointment save
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Auto Queue Add
        queueService.addToQueue(savedAppointment.getId());

        return savedAppointment;
    }

    // Aadhaar se appointments fetch
    @Override
    public List<Appointment> getAppointmentsByAadhaar(String aadhaarNumber) {

        return appointmentRepository
                .findByPatientAadhaarNumber(aadhaarNumber);
    }

    // Token Generator
    private String generateToken() {

        Random random = new Random();
        int token = 1000 + random.nextInt(9000);

        return "TKN-" + token;
    }

    // Optional Future Method (Leave as it is)
    @Override
    public Appointment updatePaymentStatus(Long appointmentId, String status) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setPaymentStatus(status);

        Appointment savedAppointment = appointmentRepository.save(appointment);

        if ("PAID".equalsIgnoreCase(status)) {
            queueService.addToQueue(appointmentId);
        }

        return savedAppointment;
    }

    @Override
    public ReceiptResponse getReceipt(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = appointment.getPatient();

        return new ReceiptResponse(
                patient.getName(),
                patient.getAadhaarNumber(),
                appointment.getDoctorName(),
                appointment.getTimeSlot(),
                appointment.getTokenNumber(),
                appointment.getPaymentStatus()
        );
    }

    @Override
    public Appointment markAsPrinted(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setPrinted(true);

        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }
}

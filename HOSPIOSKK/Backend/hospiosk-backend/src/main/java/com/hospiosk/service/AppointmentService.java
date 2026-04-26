package com.hospiosk.service;

import com.hospiosk.dto.ReceiptResponse;
import com.hospiosk.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    // Appointment book karna
    Appointment bookAppointment(Appointment appointment);

    // Patient ki appointments fetch karna
    List<Appointment> getAppointmentsByAadhaar(String aadhaarNumber);
    
    Appointment updatePaymentStatus(Long appointmentId, String status);

    ReceiptResponse getReceipt(Long appointmentId);
    
    Appointment markAsPrinted(Long appointmentId);

    Appointment getAppointmentById(Long id);

}

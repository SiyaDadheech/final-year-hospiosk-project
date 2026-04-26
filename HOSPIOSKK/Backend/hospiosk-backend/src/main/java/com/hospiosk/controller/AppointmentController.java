package com.hospiosk.controller;

import com.hospiosk.dto.ReceiptResponse;
import com.hospiosk.entity.Appointment;
import com.hospiosk.service.AppointmentService;
import com.hospiosk.service.ReceiptPdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Appointment Book 
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // Patient ke appointments fetch
    @GetMapping("/patient/{aadhaar}")
    public List<Appointment> getAppointments(@PathVariable String aadhaar) {
        return appointmentService.getAppointmentsByAadhaar(aadhaar);
    }

    // Receipt Fetch
    @GetMapping("/receipt/{appointmentId}")
    public ReceiptResponse getReceipt(@PathVariable Long appointmentId) {
        return appointmentService.getReceipt(appointmentId);
    }

    // Mark Printed
    @PostMapping("/print/{id}")
    public Appointment markPrinted(@PathVariable Long id) {
        return appointmentService.markAsPrinted(id);
    }

    @Autowired
    private ReceiptPdfService receiptPdfService;

    // PDF Generate
    @GetMapping("/receipt/pdf/{id}")
    public ResponseEntity<byte[]> generateReceiptPdf(@PathVariable Long id) {

        Appointment appointment = appointmentService.getAppointmentById(id);

        byte[] pdf = receiptPdfService.generateReceiptPdf(appointment);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=receipt.pdf")
                .header("Content-Type", "application/pdf")
                .body(pdf);
    }
}

package com.hospiosk.dto;

public class ReceiptResponse {

    private String patientName;
    private String aadhaarNumber;
    private String doctorName;
    private String timeSlot;
    private String tokenNumber;
    private String paymentStatus;

    public ReceiptResponse(String patientName, String aadhaarNumber,
                           String doctorName, String timeSlot,
                           String tokenNumber, String paymentStatus) {

        this.patientName = patientName;
        this.aadhaarNumber = aadhaarNumber;
        this.doctorName = doctorName;
        this.timeSlot = timeSlot;
        this.tokenNumber = tokenNumber;
        this.paymentStatus = paymentStatus;
    }

    public String getPatientName() { return patientName; }
    public String getAadhaarNumber() { return aadhaarNumber; }
    public String getDoctorName() { return doctorName; }
    public String getTimeSlot() { return timeSlot; }
    public String getTokenNumber() { return tokenNumber; }
    public String getPaymentStatus() { return paymentStatus; }
}

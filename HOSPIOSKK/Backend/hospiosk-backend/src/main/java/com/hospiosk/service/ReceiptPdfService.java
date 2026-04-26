package com.hospiosk.service;

import com.hospiosk.entity.Appointment;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class ReceiptPdfService {

    public byte[] generateReceiptPdf(Appointment appointment) {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            document.add(new Paragraph("Hospital Receipt"));
            document.add(new Paragraph("----------------------------"));

            document.add(new Paragraph("Patient Name: "
                    + appointment.getPatient().getName()));

            document.add(new Paragraph("Aadhaar Number: "
                    + appointment.getPatient().getAadhaarNumber()));

            document.add(new Paragraph("Doctor Name: "
                    + appointment.getDoctorName()));

            document.add(new Paragraph("Time Slot: "
                    + appointment.getTimeSlot()));

            document.add(new Paragraph("Token Number: "
                    + appointment.getTokenNumber()));

            document.add(new Paragraph("Payment Status: "
                    + appointment.getPaymentStatus()));

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }
}

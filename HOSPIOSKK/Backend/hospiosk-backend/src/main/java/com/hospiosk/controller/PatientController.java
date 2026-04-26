package com.hospiosk.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.hospiosk.entity.Patient;
import com.hospiosk.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:8081")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

  
    @GetMapping("/aadhaar/{aadhaarNumber}")
    public ResponseEntity<?> getPatientByAadhaar(@PathVariable String aadhaarNumber) {

        Patient patient = patientService.getPatientByAadhaar(aadhaarNumber);

      
        if (patient == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Patient not found with Aadhaar number: " + aadhaarNumber);
        }

       
        return ResponseEntity.ok(patient);
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addPatient(@RequestBody Patient patient) {

        try {
            Patient savedPatient = patientService.addPatient(patient);
            return ResponseEntity.ok(savedPatient);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
    
    @GetMapping("/fingerprint/{fingerprintId}")
    public Patient getPatientByFingerprint(@PathVariable String fingerprintId) {
        return patientService.getPatientByFingerprint(fingerprintId);
    }



}

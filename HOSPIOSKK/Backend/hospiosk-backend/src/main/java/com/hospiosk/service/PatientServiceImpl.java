package com.hospiosk.service;

import com.hospiosk.entity.Patient;
import com.hospiosk.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient getPatientByAadhaar(String aadhaarNumber) {

        return patientRepository
                .findByAadhaarNumber(aadhaarNumber)
                .orElse(null);   // important line
    }
    
    @Override
    public Patient addPatient(Patient patient) {

        // Aadhaar already exist check
        if (patientRepository.findByAadhaarNumber(patient.getAadhaarNumber()).isPresent()) {

            throw new RuntimeException("Patient already exists with this Aadhaar Number");
        }

        return patientRepository.save(patient);
    }
    
    @Override
    public Patient getPatientByFingerprint(String fingerprintId) {

        return patientRepository
                .findByFingerprintId(fingerprintId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}

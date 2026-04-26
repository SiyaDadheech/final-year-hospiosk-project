package com.hospiosk.service;

import com.hospiosk.entity.Patient;

public interface PatientService {

    Patient getPatientByAadhaar(String aadhaarNumber);

    Patient addPatient(Patient patient);
    
    Patient getPatientByFingerprint(String fingerprintId);

}

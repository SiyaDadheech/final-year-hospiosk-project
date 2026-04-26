package com.hospiosk.repository;

import com.hospiosk.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByAadhaarNumber(String aadhaarNumber);

    Optional<Patient> findByFingerprintId(String fingerprintId);

}

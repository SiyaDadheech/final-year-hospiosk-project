package com.hospiosk.repository;

import com.hospiosk.entity.Doctor;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	Optional<Doctor> findByDoctorName(String doctorName);


}

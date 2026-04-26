package com.hospiosk.repository;

import com.hospiosk.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueRepository extends JpaRepository<QueueEntry, Long> {

    List<QueueEntry> findByStatus(String status);

    List<QueueEntry> findByStatusOrderByIdAsc(String status);

}

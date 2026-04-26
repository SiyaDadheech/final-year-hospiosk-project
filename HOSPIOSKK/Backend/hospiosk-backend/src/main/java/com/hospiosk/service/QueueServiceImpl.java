package com.hospiosk.service;

import com.hospiosk.entity.Appointment;
import com.hospiosk.entity.QueueEntry;
import com.hospiosk.repository.AppointmentRepository;
import com.hospiosk.repository.QueueRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueueServiceImpl implements QueueService {

    private final QueueRepository queueRepository;
    private final AppointmentRepository appointmentRepository;

    public QueueServiceImpl(QueueRepository queueRepository,
                            AppointmentRepository appointmentRepository) {
        this.queueRepository = queueRepository;
        this.appointmentRepository = appointmentRepository;
    }

    // Add Patient to Queue
    @Override
    public QueueEntry addToQueue(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!"PAID".equals(appointment.getPaymentStatus())) {
            throw new RuntimeException("Payment not completed");
        }

        QueueEntry entry = new QueueEntry(
                appointment.getTokenNumber(),
                "WAITING",
                appointment
        );

        return queueRepository.save(entry);
    }

    
    @Override
    public QueueEntry callNextPatient() {

        List<QueueEntry> waitingList = queueRepository.findByStatus("WAITING");

        if (waitingList.isEmpty()) {
            throw new RuntimeException("No patients in queue");
        }

        QueueEntry next = waitingList.get(0);
        next.setStatus("SERVING");

        return queueRepository.save(next);
    }

    // View Waiting Queue
    @Override
    public List<QueueEntry> getWaitingQueue() {
        return queueRepository.findByStatus("WAITING");
    }
    
    @Override
    public int getQueuePosition(String tokenNumber) {

        List<QueueEntry> waitingList =
                queueRepository.findByStatusOrderByIdAsc("WAITING");

        for (int i = 0; i < waitingList.size(); i++) {

            if (waitingList.get(i).getTokenNumber().equals(tokenNumber)) {
                return i + 1;
            }
        }

        throw new RuntimeException("Token not found in queue");
    }

}

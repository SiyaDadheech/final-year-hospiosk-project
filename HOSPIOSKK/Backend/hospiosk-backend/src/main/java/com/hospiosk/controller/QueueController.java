package com.hospiosk.controller;

import com.hospiosk.entity.QueueEntry;
import com.hospiosk.service.QueueService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/queue")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // Add to Queue
    @PostMapping("/add/{appointmentId}")
    public QueueEntry addToQueue(@PathVariable Long appointmentId) {
        return queueService.addToQueue(appointmentId);
    }

    // Call Next Patient
    @PostMapping("/next")
    public QueueEntry callNext() {
        return queueService.callNextPatient();
    }

    // View Waiting Queue
    @GetMapping("/waiting")
    public List<QueueEntry> getWaiting() {
        return queueService.getWaitingQueue();
    }
    
    @GetMapping("/position/{token}")
    public int getPosition(@PathVariable String token) {
        return queueService.getQueuePosition(token);
    }

    
}

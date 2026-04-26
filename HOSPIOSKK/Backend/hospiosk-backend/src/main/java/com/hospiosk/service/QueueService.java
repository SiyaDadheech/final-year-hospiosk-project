package com.hospiosk.service;

import com.hospiosk.entity.QueueEntry;

import java.util.List;

public interface QueueService {

    QueueEntry addToQueue(Long appointmentId);

    QueueEntry callNextPatient();

    List<QueueEntry> getWaitingQueue();
    
    int getQueuePosition(String tokenNumber);

}
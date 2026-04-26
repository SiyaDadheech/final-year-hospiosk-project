package com.hospiosk.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hospiosk.service.PaymentService;
import com.razorpay.Order;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) throws Exception {

        double amount = Double.parseDouble(data.get("amount").toString());

        Order order = paymentService.createOrder(amount);

        Map<String, Object> response = new HashMap<>();

        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("key", paymentService.getKey());

        return response;
    }
}
package com.hospiosk.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentService {

    private static final String KEY = "rzp_test_SFFBZE3PmY7fBw";
    private static final String SECRET = "9irV1KSW7PtSRdvfxNyrIz3o";

    public Order createOrder(double amount) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(KEY, SECRET);

        JSONObject options = new JSONObject();

        options.put("amount", (int) (amount * 100)); 
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        return client.orders.create(options);
    }

    public String getKey() {
        return KEY;
    }
}
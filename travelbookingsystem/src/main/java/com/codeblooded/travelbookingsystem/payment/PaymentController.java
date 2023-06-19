package com.codeblooded.travelbookingsystem.payment;

import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService stripeService) {
        this.paymentService = stripeService;
    }

    @PostMapping("/createPaymentToken")
    @ResponseBody
    public PaymentTokenDTO createCardToken(@RequestBody PaymentTokenDTO paymentToken) {
        // Call the payment service to create a payment token for the provided payment information
        return paymentService.createPaymentToken(paymentToken);
    }

    @PostMapping("/chargeCard")
    @ResponseBody
    public PaymentChargeDTO makePayment(@RequestBody PaymentChargeDTO paymentCharge) {
        // Call the payment service to make a payment using the provided payment information
        return paymentService.makePayment(paymentCharge);
    }
}

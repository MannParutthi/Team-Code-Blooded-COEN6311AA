package com.codeblooded.travelbookingsystem.payment;

import lombok.Data;
import java.util.HashMap;
import java.util.Map;


@Data
public class PaymentChargeDTO {
    private String stripeToken;
    private String username;
    private Double amount;
    private Boolean success;
    private String message;
    private String chargeId;
}

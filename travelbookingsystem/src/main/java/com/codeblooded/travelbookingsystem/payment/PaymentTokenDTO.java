package com.codeblooded.travelbookingsystem.payment;
import lombok.Data;

@Data
public class PaymentTokenDTO {
    private String cardNumber;
    private String expMonth;
    private String expYear;
    private String cvc;
    private String token;
    private String username;
    private boolean success;
}
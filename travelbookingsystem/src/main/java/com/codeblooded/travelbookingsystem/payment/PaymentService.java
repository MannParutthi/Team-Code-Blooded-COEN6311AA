package com.codeblooded.travelbookingsystem.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${stripe.apiKey}")
    String stripeAPIKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeAPIKey;
    }

    public PaymentTokenDTO createPaymentToken(PaymentTokenDTO paymentToken) {
        try {
            Map <String, Object> cardDetails = new HashMap<>();
            cardDetails.put("number", paymentToken.getCardNumber());
            cardDetails.put("exp_month", Integer.parseInt(paymentToken.getExpMonth()));
            cardDetails.put("exp_year", Integer.parseInt(paymentToken.getExpYear()));
            cardDetails.put("cvc", paymentToken.getCvc());


            Map <String, Object> tokenParams = new HashMap<>();
            tokenParams.put("card", cardDetails);
            Token token = Token.create(tokenParams);

            if (token != null && token.getId() != null) {
                paymentToken.setSuccess(true);
                paymentToken.setToken(token.getId());
            }

            return paymentToken;
        } catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    public PaymentChargeDTO makePayment(PaymentChargeDTO paymentRequest) {
        try {
            paymentRequest.setSuccess(false);
            Map <String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", (int) (paymentRequest.getAmount() * 100));
            chargeParams.put("currency", "CAD");
            chargeParams.put("description", "Payment for travel booking system");
            chargeParams.put("source", paymentRequest.getStripeToken());

            Map <String, Object> metaData = new HashMap<>();
            metaData.put("id", paymentRequest.getChargeId());
            chargeParams.put("metadata", metaData);
            Charge charge = Charge.create(chargeParams);
            paymentRequest.setMessage(charge.getOutcome().getSellerMessage());

            if (charge.getPaid()) {
                paymentRequest.setChargeId(charge.getId());
                paymentRequest.setSuccess(true);
            }

            return paymentRequest;
        }
        catch (StripeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    private void validatePaymentDetails(String cardNumber, int expMonth, int expYear, String cvc, int amount, String currency) {
        // Perform validations here...
    }
}

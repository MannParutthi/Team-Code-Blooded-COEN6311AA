package com.codeblooded.travelbookingsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import jakarta.mail.MessagingException;

import java.io.IOException;
import java.io.StringWriter;

// For Email templating
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    /**
     * Sends an email with a template using the JavaMailSender.
     *
     * @param recipientEmail The recipient's email address.
     * @param subject        The subject of the email.
     * @param htmlContent    The HTML content of the email.
     */
    private void sendEmailWithTemplate(String recipientEmail, String subject, String htmlContent) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        try {
            helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Sends an account registration email to the recipient.
     *
     * @param recipientEmail The recipient's email address.
     */
    public void sendAccountRegistrationEmail(String recipientEmail) {
        String templateFilePath = "Email-Templates/NewUserRegistrationTemplate.html";
        String subject = "Concordia Travel Booking System: Welcome to Concordia Travel Booking System";
        AccountRegistrationTemplateData accountRegistrationTemplateData = new AccountRegistrationTemplateData(recipientEmail);

        try {
            MustacheFactory mustacheFactory = new DefaultMustacheFactory();
            Mustache mustache = mustacheFactory.compile(templateFilePath);
            StringWriter writer = new StringWriter();
            mustache.execute(writer, accountRegistrationTemplateData).flush();

            String htmlContent = writer.toString();
            sendEmailWithTemplate(recipientEmail, subject, htmlContent);
        } catch (IOException e) {
            System.out.println("----- Error in reading HTML Template: " + templateFilePath + "-----");
        }
    }

    /**
     * Sends a booking confirmation email to the recipient.
     *
     * @param emailAddress      The recipient's email address.
     * @param customerID        The customer ID.
     * @param bookingID         The booking ID.
     * @param paymentID         The payment ID.
     * @param travelPackageID   The travel package ID.
     * @param departureDate     The departure date.
     * @param bookingStatus     The booking status.
     */
    public void sendBookingConfirmationEmail(String emailAddress, long customerID, long bookingID, long paymentID, long travelPackageID, String departureDate, String bookingStatus) {
        String templateFilePath = "Email-Templates/BookingConfirmationTemplate.html";
        String subject = "Concordia Travel Booking System: Booking Confirmation";
        BookingConfirmationTemplateData bookingConfirmationTemplateData = new BookingConfirmationTemplateData(customerID, bookingID, paymentID, travelPackageID, departureDate, bookingStatus);

        try {
            MustacheFactory mustacheFactory = new DefaultMustacheFactory();
            Mustache mustache = mustacheFactory.compile(templateFilePath);
            StringWriter writer = new StringWriter();
            mustache.execute(writer, bookingConfirmationTemplateData).flush();

            String htmlContent = writer.toString();
            sendEmailWithTemplate(emailAddress, subject, htmlContent);
        } catch (IOException e) {
            System.out.println("----- Error in reading HTML Template: " + templateFilePath + "-----");
        }
    }

    /**
     * Sends a booking update email to the recipient.
     *
     * @param emailAddress      The recipient's email address.
     * @param customerID        The customer ID.
     * @param bookingID         The booking ID.
     * @param paymentID         The payment ID.
     * @param travelPackageID   The travel package ID.
     * @param departureDate     The departure date.
     * @param bookingStatus     The booking status.
     */
    public void sendBookingUpdateEmail(String emailAddress, long customerID, long bookingID, long paymentID, long travelPackageID, String departureDate, String bookingStatus) {
        String templateFilePath = "Email-Templates/BookingUpdateTemplate.html";
        String subject = "Concordia Travel Booking System: Booking Confirmation";
        BookingUpdateTemplateData bookingUpdateTemplateData = new BookingUpdateTemplateData(customerID, bookingID, paymentID, travelPackageID, departureDate, bookingStatus);

        try {
            MustacheFactory mustacheFactory = new DefaultMustacheFactory();
            Mustache mustache = mustacheFactory.compile(templateFilePath);
            StringWriter writer = new StringWriter();
            mustache.execute(writer, bookingUpdateTemplateData).flush();

            String htmlContent = writer.toString();
            sendEmailWithTemplate(emailAddress, subject, htmlContent);
        } catch (IOException e) {
            System.out.println("----- Error in reading HTML Template: " + templateFilePath + "-----");
        }
    }

    /**
     * Inner class representing data for the account registration email template.
     */
    private static class AccountRegistrationTemplateData {
        private final String recipientEmailAddress;

        public AccountRegistrationTemplateData(String recipientName) {
            this.recipientEmailAddress = recipientName;
        }

        public String getRecipientEmailAddress() {
            return recipientEmailAddress;
        }
    }

    /**
     * Inner class representing data for the booking confirmation email template.
     */
    private static class BookingConfirmationTemplateData {
        private final long customerID;
        private final long bookingID;
        private final long paymentID;
        private final long travelPackageID;
        private final String departureDate;
        private final String bookingStatus;

        private BookingConfirmationTemplateData(long customerID, long bookingID, long paymentID, long travelPackageID, String departureDate, String bookingStatus) {
            this.customerID = customerID;
            this.bookingID = bookingID;
            this.paymentID = paymentID;
            this.travelPackageID = travelPackageID;
            this.departureDate = departureDate;
            this.bookingStatus = bookingStatus;
        }

        public long getCustomerID() {
            return customerID;
        }

        public long getBookingID() {
            return bookingID;
        }

        public long getPaymentID() {
            return paymentID;
        }

        public long getTravelPackageID() {
            return travelPackageID;
        }

        public String getDepartureDate() {
            return departureDate;
        }

        public String getBookingStatus() {
            return bookingStatus;
        }
    }

    /**
     * Inner class representing data for the booking update email template.
     */
    private static class BookingUpdateTemplateData {
        private final long customerID;
        private final long bookingID;
        long paymentID;
        private final long travelPackageID;
        private final String departureDate;
        private final String bookingStatus;

        private BookingUpdateTemplateData(long customerID, long bookingID, long paymentID, long travelPackageID, String departureDate, String bookingStatus) {
            this.customerID = customerID;
            this.bookingID = bookingID;
            this.paymentID = paymentID;
            this.travelPackageID = travelPackageID;
            this.departureDate = departureDate;
            this.bookingStatus = bookingStatus;
        }

        public long getCustomerID() {
            return customerID;
        }

        public long getBookingID() {
            return bookingID;
        }

        public long getPaymentID() {
            return paymentID;
        }

        public long getTravelPackageID() {
            return travelPackageID;
        }

        public String getDepartureDate() {
            return departureDate;
        }

        public String getBookingStatus() {
            return bookingStatus;
        }
    }
}

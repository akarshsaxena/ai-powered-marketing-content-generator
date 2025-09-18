package com.project.ai_marketing.service;

import com.project.ai_marketing.entity.Customer;
import com.project.ai_marketing.repository.CustomerRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final CustomerRepository customerRepository;

    @Value("${spring.mail.username}")
    private String fromAddress;

    private final String fromName = "NAB Communications";

    public EmailService(JavaMailSender mailSender, CustomerRepository customerRepository) {
        this.mailSender = mailSender;
        this.customerRepository = customerRepository;
    }

    public void sendToCustomer(String cgid, String subject, String bodyHtml) {
        Customer customer = customerRepository.findByCgid(cgid)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + cgid));

        String toEmail = customer.getEmail();
        log.info("Sending email to {}",toEmail);
        if (toEmail == null || toEmail.isBlank()) {
            throw new IllegalStateException("Customer has no email on record: " + cgid);
        }

        sendEmail(toEmail, subject, bodyHtml);
    }


    public void sendEmail(String to, String subject, String bodyHtml) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom(String.format("%s <%s>", fromName, fromAddress));
            helper.setTo(to);
            helper.setSubject(subject == null || subject.isBlank() ? "Message from " + fromName : subject);
            String htmlBody = """
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                %s
              </body>
            </html>
            """.formatted(
                    bodyHtml.replace("\n", "<br/>")
                            .replace("**", "<b>")
            );

            helper.setText(htmlBody, true); // true = HTML
            log.info("Email prepared {}",message.getContent().toString());
            mailSender.send(message);
        } catch (MessagingException ex) {
            throw new RuntimeException("Failed to construct email message", ex);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to send email", ex);
        }
    }
}


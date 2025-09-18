package com.project.ai_marketing.controller;


import com.project.ai_marketing.dto.MarketingEmailRequest;
import com.project.ai_marketing.dto.MarketingEmailResponse;
import com.project.ai_marketing.dto.SendEmailRequest;
import com.project.ai_marketing.service.EmailService;
import com.project.ai_marketing.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marketing")
@CrossOrigin(origins = "*")
public class MarketingEmailController {

    private final GeminiService geminiService;
    private final EmailService emailService;

    public MarketingEmailController(GeminiService geminiService,EmailService emailService) {
        this.geminiService = geminiService;
        this.emailService = emailService;
    }

    @PostMapping("/generate")
    public ResponseEntity<MarketingEmailResponse> generateEmail(
            @RequestBody MarketingEmailRequest request) {

        String generatedEmail = geminiService.generateEmail(request.getCgid(),request.getRequirement());

        return ResponseEntity.ok(new MarketingEmailResponse(generatedEmail));
    }

    @PostMapping("/send")
    public ResponseEntity<MarketingEmailResponse> sendEmail(@RequestBody SendEmailRequest req) {
        if (req.getCgid() == null || req.getCgid().isBlank()) {
            return ResponseEntity.badRequest().body(new MarketingEmailResponse("Missing cgid"));
        }
        if (req.getBodyHtml() == null || req.getBodyHtml().trim().length() < 10) {
            return ResponseEntity.badRequest().body(new MarketingEmailResponse("Email body too short"));
        }

        try {

            emailService.sendToCustomer(req.getCgid(), req.getSubject(), req.getBodyHtml());
            return ResponseEntity.ok(new MarketingEmailResponse("SENT"));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(new MarketingEmailResponse("ERROR: " + ex.getMessage()));
        }
    }
}

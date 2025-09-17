package com.project.ai_marketing.controller;

//import com.example.dto.MarketingEmailRequest;
//import com.example.dto.MarketingEmailResponse;
//import com.example.entity.Customer;
//import com.example.repository.CustomerRepository;
//import com.example.service.GeminiService;
import com.project.ai_marketing.dto.MarketingEmailRequest;
import com.project.ai_marketing.dto.MarketingEmailResponse;
import com.project.ai_marketing.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marketing")
@CrossOrigin(origins = "*")
public class MarketingEmailController {

    private final GeminiService geminiService;

    public MarketingEmailController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<MarketingEmailResponse> generateEmail(
            @RequestBody MarketingEmailRequest request) {

        String generatedEmail = geminiService.generateEmail(request.getCgid(),request.getRequirement());

        return ResponseEntity.ok(new MarketingEmailResponse(generatedEmail));
    }
}

package com.project.ai_marketing.controller;

import com.project.ai_marketing.dto.AllEmailResponse;
import com.project.ai_marketing.dto.CustomerDTO;
import com.project.ai_marketing.dto.SaveStatusRequest;
import com.project.ai_marketing.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/{cgid}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable String cgid) {
        return customerService.getCustomerByCgid(cgid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/save-status")
    public ResponseEntity<?> saveStatus(@RequestBody SaveStatusRequest request) {
        log.info("Saving status request {}", request.toString());
        return ResponseEntity.ok(
                customerService.saveStatus(
                        request.getId(),
                        request.getCustomerId(),
                        request.getCustomerType(),
                        request.getProductType(),
                        request.getEmail(),
                        request.getStatus()
                )
        );
    }

    @GetMapping("/get-all-emails")
    public List<AllEmailResponse> getAll() {
        return customerService.getAllEmails();
    }
}

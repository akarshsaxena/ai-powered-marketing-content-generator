package com.project.ai_marketing.controller;

import com.project.ai_marketing.dto.AllEmailResponse;
import com.project.ai_marketing.dto.CustomerDTO;
import com.project.ai_marketing.dto.SaveStatusRequest;
import com.project.ai_marketing.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
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
        return ResponseEntity.ok(
                customerService.saveStatus(
                        request.getCustomerId(),
                        request.getCustomerType(),
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

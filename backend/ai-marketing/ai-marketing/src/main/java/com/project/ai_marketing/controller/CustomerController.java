package com.project.ai_marketing.controller;

import com.project.ai_marketing.dto.CustomerDTO;
import com.project.ai_marketing.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

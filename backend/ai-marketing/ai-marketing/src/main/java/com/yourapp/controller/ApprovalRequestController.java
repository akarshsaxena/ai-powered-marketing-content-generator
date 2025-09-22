// src/main/java/com/yourapp/controller/ApprovalRequestController.java
package com.yourapp.controller;

import com.yourapp.model.ApprovalRequest;
import com.yourapp.repository.ApprovalRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@CrossOrigin // if front end is separate
public class ApprovalRequestController {

    private final ApprovalRequestRepository repository;

    public ApprovalRequestController(ApprovalRequestRepository repository) {
        this.repository = repository;
    }

    // create new request
    @PostMapping
    public ApprovalRequest create(@RequestBody ApprovalRequest request) {
        request.setStatus("Pending");
        return repository.save(request);
    }

    // list all past records
    @GetMapping
    public List<ApprovalRequest> getAll() {
        return repository.findAll();
    }

    // approve / reject
    @PutMapping("/{id}")
    public ApprovalRequest updateStatus(@PathVariable Long id, @RequestParam String status) {
        ApprovalRequest req = repository.findById(id).orElseThrow();
        req.setStatus(status);
        return repository.save(req);
    }
}

package com.project.ai_marketing.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 20)
    private String cgid;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 20)
    private String customerType;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, length = 50)
    private String state;

    @Column(nullable = false, length = 50)
    private String country;

    @Column(nullable = false, length = 10)
    private String pincode;

    // New profile fields
    @Column(name = "age_group", length = 50)
    private String ageGroup;                  // e.g., "25–35"

    @Column(name = "income_bracket", length = 100)
    private String incomeBracket;             // e.g., "5–10 LPA"

    @Column(length = 100)
    private String profession;                // e.g., "IT", "Healthcare"

    @Column(name = "spending_patterns", length = 255)
    private String spendingPatterns;          // e.g., "Travel, Dining"

    @Column(name = "loan_history", length = 255)
    private String loanHistory;               // e.g., "Existing home loan"

    @Column(name = "investment_preferences", length = 255)
    private String investmentPreferences;     // e.g., "Mutual Funds, FDs"

    @Column(name = "digital_engagement_level", length = 100)
    private String digitalEngagementLevel;    // e.g., "Mobile App User"

    @Column(name = "preferred_channel", length = 50)
    private String preferredChannel;          // e.g., "Email", "WhatsApp"

    // Getters and Setters omitted for brevity
}

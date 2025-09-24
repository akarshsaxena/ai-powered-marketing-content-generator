-- Drop table if exists
DROP TABLE IF EXISTS customer;

-- Create table
CREATE TABLE customer (
                          id SERIAL PRIMARY KEY,
                          cgid VARCHAR(20),
                          full_name VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          phone VARCHAR(20) NOT NULL,
                          gender VARCHAR(10),
                          customer_type VARCHAR(20),
                          city VARCHAR(50),
                          state VARCHAR(50),
                          country VARCHAR(50),
                          pincode VARCHAR(10),

    -- New profile fields
                          age_group VARCHAR(50),                  -- e.g., "25–35"
                          income_bracket VARCHAR(100),            -- e.g., "5–10 LPA"
                          profession VARCHAR(100),                -- e.g., "IT", "Healthcare"
                          spending_patterns VARCHAR(255),         -- e.g., "Travel, Dining"
                          loan_history VARCHAR(255),              -- e.g., "Existing home loan"
                          investment_preferences VARCHAR(255),    -- e.g., "Mutual Funds, FDs"
                          digital_engagement_level VARCHAR(100),  -- e.g., "Mobile App User"
                          preferred_channel VARCHAR(50)        -- e.g., "Email", "WhatsApp"


);


DROP TABLE IF EXISTS marketing_requests;
CREATE TABLE marketing_requests (
                                    id SERIAL PRIMARY KEY,
                                    customer_id VARCHAR(50) NOT NULL,
                                    customer_type VARCHAR(50),
                                    email TEXT,
                                    status VARCHAR(20) DEFAULT 'Pending',
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V3__insert_dummy_customers.sql

INSERT INTO customer (
    cgid, full_name, email, phone, gender, customer_type, city, state, country, pincode,
    age_group, income_bracket, profession, spending_patterns, loan_history,
    investment_preferences, digital_engagement_level, preferred_channel
) VALUES
      (
          'CGID-001', 'Rajiv Sharma', 'vinayak270603@gmail.com', '9876543210', 'Male', 'Premium',
          'Delhi', 'Delhi', 'India', '110001',
          '25-35', '10-15 LPA', 'IT Professional', 'Travel, Shopping',
          'Closed personal loan', 'Mutual Funds, Stocks', 'Mobile App User', 'Email'
      ),
      (
          'CGID-002', 'Neha Gupta', 'neha.gupta@example.com', '9123456789', 'Female', 'Standard',
          'Mumbai', 'Maharashtra', 'India', '400001',
          '35-45', '5-10 LPA', 'Healthcare Worker', 'Dining, Shopping',
          'Existing home loan', 'FDs, Insurance', 'Net Banking User', 'WhatsApp'
      ),
      (
          'CGID-003', 'Amit Verma', 'amit.verma@example.com', '9988776655', 'Male', 'Gold',
          'Bengaluru', 'Karnataka', 'India', '560001',
          '45-55', '15-20 LPA', 'Government Employee', 'Minimal Spending',
          'No loans', 'Stocks, Mutual Funds', 'Both App & Net Banking', 'Phone Call'
      );

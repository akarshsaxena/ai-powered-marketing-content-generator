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
                          pincode VARCHAR(10)
);

-- Insert 50 mock customers
INSERT INTO customer (cgid, full_name, email, phone, gender, customer_type, city, state, country, pincode) VALUES


                                                                                                              ('CGID-100001', 'John Smith', 'vinayak270603@gmail.com', '+1111111111', 'Male', 'Regular', 'New York', 'NY', 'USA', '10001'),
                                                                                                               ('CGID-100002', 'Jane Doe', 'jane.doe@example.com', '+1111111112', 'Female', 'Corporate', 'Los Angeles', 'CA', 'USA', '90001'),
                                                                                                               ('CGID-100003', 'Michael Johnson', 'michael.johnson@example.com', '+1111111113', 'Male', 'Premium', 'Chicago', 'IL', 'USA', '60007'),
                                                                                                               ('CGID-100004', 'Emily Davis', 'emily.davis@example.com', '+1111111114', 'Female', 'HNI', 'Houston', 'TX', 'USA', '77001'),
                                                                                                               ('CGID-100005', 'William Brown', 'william.brown@example.com', '+1111111115', 'Male', 'Regular', 'Phoenix', 'AZ', 'USA', '85001'),
                                                                                                               ('CGID-100006', 'Olivia Wilson', 'olivia.wilson@example.com', '+1111111116', 'Female', 'Corporate', 'Philadelphia', 'PA', 'USA', '19019'),
                                                                                                               ('CGID-100007', 'James Miller', 'james.miller@example.com', '+1111111117', 'Male', 'Premium', 'San Antonio', 'TX', 'USA', '78201'),
                                                                                                               ('CGID-100008', 'Sophia Moore', 'sophia.moore@example.com', '+1111111118', 'Female', 'HNI', 'San Diego', 'CA', 'USA', '92101'),
                                                                                                               ('CGID-100009', 'Benjamin Taylor', 'benjamin.taylor@example.com', '+1111111119', 'Male', 'Regular', 'Dallas', 'TX', 'USA', '75201'),
                                                                                                               ('CGID-100010', 'Ava Anderson', 'ava.anderson@example.com', '+1111111120', 'Female', 'Corporate', 'San Jose', 'CA', 'USA', '95101'),

                                                                                                               ('CGID-100011', 'Liam Thomas', 'liam.thomas@example.com', '+1111111121', 'Male', 'Premium', 'Austin', 'TX', 'USA', '73301'),
                                                                                                               ('CGID-100012', 'Isabella Jackson', 'isabella.jackson@example.com', '+1111111122', 'Female', 'HNI', 'Jacksonville', 'FL', 'USA', '32099'),
                                                                                                               ('CGID-100013', 'Noah White', 'noah.white@example.com', '+1111111123', 'Male', 'Regular', 'Fort Worth', 'TX', 'USA', '76101'),
                                                                                                               ('CGID-100014', 'Mia Harris', 'mia.harris@example.com', '+1111111124', 'Female', 'Corporate', 'Columbus', 'OH', 'USA', '43085'),
                                                                                                               ('CGID-100015', 'Elijah Martin', 'elijah.martin@example.com', '+1111111125', 'Male', 'Premium', 'Charlotte', 'NC', 'USA', '28201'),
                                                                                                               ('CGID-100016', 'Amelia Thompson', 'amelia.thompson@example.com', '+1111111126', 'Female', 'HNI', 'San Francisco', 'CA', 'USA', '94101'),
                                                                                                               ('CGID-100017', 'Alexander Garcia', 'alexander.garcia@example.com', '+1111111127', 'Male', 'Regular', 'Indianapolis', 'IN', 'USA', '46201'),
                                                                                                               ('CGID-100018', 'Charlotte Martinez', 'charlotte.martinez@example.com', '+1111111128', 'Female', 'Corporate', 'Seattle', 'WA', 'USA', '98101'),
                                                                                                               ('CGID-100019', 'Daniel Robinson', 'daniel.robinson@example.com', '+1111111129', 'Male', 'Premium', 'Denver', 'CO', 'USA', '80201'),
                                                                                                               ('CGID-100020', 'Harper Clark', 'harper.clark@example.com', '+1111111130', 'Female', 'HNI', 'Washington', 'DC', 'USA', '20001'),

                                                                                                               ('CGID-100021', 'Matthew Rodriguez', 'matthew.rodriguez@example.com', '+1111111131', 'Male', 'Regular', 'Boston', 'MA', 'USA', '02101'),
                                                                                                               ('CGID-100022', 'Evelyn Lewis', 'evelyn.lewis@example.com', '+1111111132', 'Female', 'Corporate', 'Nashville', 'TN', 'USA', '37201'),
                                                                                                               ('CGID-100023', 'David Lee', 'david.lee@example.com', '+1111111133', 'Male', 'Premium', 'Baltimore', 'MD', 'USA', '21201'),
                                                                                                               ('CGID-100024', 'Abigail Walker', 'abigail.walker@example.com', '+1111111134', 'Female', 'HNI', 'Louisville', 'KY', 'USA', '40201'),
                                                                                                               ('CGID-100025', 'Joseph Hall', 'joseph.hall@example.com', '+1111111135', 'Male', 'Regular', 'Portland', 'OR', 'USA', '97201'),
                                                                                                               ('CGID-100026', 'Ella Allen', 'ella.allen@example.com', '+1111111136', 'Female', 'Corporate', 'Oklahoma City', 'OK', 'USA', '73101'),
                                                                                                               ('CGID-100027', 'Samuel Young', 'samuel.young@example.com', '+1111111137', 'Male', 'Premium', 'Las Vegas', 'NV', 'USA', '88901'),
                                                                                                               ('CGID-100028', 'Avery Hernandez', 'avery.hernandez@example.com', '+1111111138', 'Female', 'HNI', 'Memphis', 'TN', 'USA', '38101'),
                                                                                                               ('CGID-100029', 'Henry King', 'henry.king@example.com', '+1111111139', 'Male', 'Regular', 'Detroit', 'MI', 'USA', '48201'),
                                                                                                               ('CGID-100030', 'Scarlett Wright', 'scarlett.wright@example.com', '+1111111140', 'Female', 'Corporate', 'El Paso', 'TX', 'USA', '79901'),

                                                                                                               ('CGID-100031', 'Owen Scott', 'owen.scott@example.com', '+1111111141', 'Male', 'Premium', 'Memphis', 'TN', 'USA', '38101'),
                                                                                                               ('CGID-100032', 'Luna Green', 'luna.green@example.com', '+1111111142', 'Female', 'HNI', 'Milwaukee', 'WI', 'USA', '53201'),
                                                                                                               ('CGID-100033', 'Jack Adams', 'jack.adams@example.com', '+1111111143', 'Male', 'Regular', 'Albuquerque', 'NM', 'USA', '87101'),
                                                                                                               ('CGID-100034', 'Chloe Baker', 'chloe.baker@example.com', '+1111111144', 'Female', 'Corporate', 'Tucson', 'AZ', 'USA', '85701'),
                                                                                                               ('CGID-100035', 'Leo Gonzalez', 'leo.gonzalez@example.com', '+1111111145', 'Male', 'Premium', 'Fresno', 'CA', 'USA', '93650'),
                                                                                                               ('CGID-100036', 'Victoria Nelson', 'victoria.nelson@example.com', '+1111111146', 'Female', 'HNI', 'Sacramento', 'CA', 'USA', '94203'),
                                                                                                               ('CGID-100037', 'Ethan Carter', 'ethan.carter@example.com', '+1111111147', 'Male', 'Regular', 'Kansas City', 'MO', 'USA', '64101'),
                                                                                                               ('CGID-100038', 'Grace Mitchell', 'grace.mitchell@example.com', '+1111111148', 'Female', 'Corporate', 'Mesa', 'AZ', 'USA', '85201'),
                                                                                                               ('CGID-100039', 'Logan Perez', 'logan.perez@example.com', '+1111111149', 'Male', 'Premium', 'Atlanta', 'GA', 'USA', '30301'),
                                                                                                               ('CGID-100040', 'Aria Roberts', 'aria.roberts@example.com', '+1111111150', 'Female', 'HNI', 'Omaha', 'NE', 'USA', '68101'),

                                                                                                               ('CGID-100041', 'Lucas Turner', 'lucas.turner@example.com', '+1111111151', 'Male', 'Regular', 'Colorado Springs', 'CO', 'USA', '80901'),
                                                                                                               ('CGID-100042', 'Zoey Phillips', 'zoey.phillips@example.com', '+1111111152', 'Female', 'Corporate', 'Raleigh', 'NC', 'USA', '27601'),
                                                                                                               ('CGID-100043', 'Mason Campbell', 'mason.campbell@example.com', '+1111111153', 'Male', 'Premium', 'Oklahoma City', 'OK', 'USA', '73101'),
                                                                                                               ('CGID-100044', 'Lily Parker', 'lily.parker@example.com', '+1111111154', 'Female', 'HNI', 'Miami', 'FL', 'USA', '33101'),
                                                                                                               ('CGID-100045', 'Jacob Evans', 'jacob.evans@example.com', '+1111111155', 'Male', 'Regular', 'Minneapolis', 'MN', 'USA', '55401'),
                                                                                                               ('CGID-100046', 'Ella Edwards', 'ella.edwards@example.com', '+1111111156', 'Female', 'Corporate', 'Tulsa', 'OK', 'USA', '74101'),
                                                                                                               ('CGID-100047', 'William Collins', 'william.collins@example.com', '+1111111157', 'Male', 'Premium', 'Arlington', 'TX', 'USA', '76001'),
                                                                                                               ('CGID-100048', 'Zoe Stewart', 'zoe.stewart@example.com', '+1111111158', 'Female', 'HNI', 'New Orleans', 'LA', 'USA', '70112'),
                                                                                                               ('CGID-100049', 'Daniel Sanchez', 'daniel.sanchez@example.com', '+1111111159', 'Male', 'Regular', 'Wichita', 'KS', 'USA', '67201'),
                                                                                                               ('CGID-100050', 'Hannah Morris', 'hannah.morris@example.com', '+1111111160', 'Female', 'Corporate', 'Cleveland', 'OH', 'USA', '44101');
CREATE TABLE marketing_requests (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(50),
  email VARCHAR(255),
  prompt TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
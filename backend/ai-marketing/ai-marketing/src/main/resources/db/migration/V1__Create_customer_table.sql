-- Drop table if it already exists
DROP TABLE IF EXISTS customer;

-- Create table
CREATE TABLE customer (
                          id SERIAL PRIMARY KEY,
                          cgid VARCHAR(20) NOT NULL UNIQUE,     -- Customer Global ID
                          full_name VARCHAR(100) NOT NULL,
                          email VARCHAR(100) NOT NULL,
                          phone VARCHAR(20) NOT NULL,
                          customer_type VARCHAR(20) NOT NULL,   -- e.g. Regular, HNI, Premium, Corporate
                          city VARCHAR(50) NOT NULL,
                          state VARCHAR(50) NOT NULL,
                          country VARCHAR(50) NOT NULL,
                          pincode VARCHAR(10) NOT NULL
);

-- Insert mock data (50 customers)
INSERT INTO customer (cgid, full_name, email, phone, customer_type, city, state, country, pincode) VALUES
                                                                                                       ('CG001', 'Amit Sharma', 'amit.sharma@example.com', '9876543210', 'Regular', 'Delhi', 'Delhi', 'India', '110001'),
                                                                                                       ('CG002', 'Priya Verma', 'priya.verma@example.com', '9876543211', 'HNI', 'Mumbai', 'Maharashtra', 'India', '400001'),
                                                                                                       ('CG003', 'Rohit Mehta', 'rohit.mehta@example.com', '9876543212', 'Premium', 'Bengaluru', 'Karnataka', 'India', '560001'),
                                                                                                       ('CG004', 'Sneha Kapoor', 'sneha.kapoor@example.com', '9876543213', 'Regular', 'Chennai', 'Tamil Nadu', 'India', '600001'),
                                                                                                       ('CG005', 'Vikram Joshi', 'vikram.joshi@example.com', '9876543214', 'Corporate', 'Hyderabad', 'Telangana', 'India', '500001'),
                                                                                                       ('CG006', 'Meera Iyer', 'meera.iyer@example.com', '9876543215', 'HNI', 'Pune', 'Maharashtra', 'India', '411001'),
                                                                                                       ('CG007', 'Arjun Singh', 'arjun.singh@example.com', '9876543216', 'Regular', 'Lucknow', 'Uttar Pradesh', 'India', '226001'),
                                                                                                       ('CG008', 'Neha Gupta', 'neha.gupta@example.com', '9876543217', 'Premium', 'Jaipur', 'Rajasthan', 'India', '302001'),
                                                                                                       ('CG009', 'Karan Malhotra', 'karan.malhotra@example.com', '9876543218', 'HNI', 'Chandigarh', 'Chandigarh', 'India', '160017'),
                                                                                                       ('CG010', 'Divya Nair', 'divya.nair@example.com', '9876543219', 'Corporate', 'Kochi', 'Kerala', 'India', '682001'),
                                                                                                       ('CG011', 'Rahul Jain', 'rahul.jain@example.com', '9876543220', 'Regular', 'Indore', 'Madhya Pradesh', 'India', '452001'),
                                                                                                       ('CG012', 'Shweta Mishra', 'shweta.mishra@example.com', '9876543221', 'Premium', 'Bhopal', 'Madhya Pradesh', 'India', '462001'),
                                                                                                       ('CG013', 'Siddharth Rao', 'siddharth.rao@example.com', '9876543222', 'HNI', 'Nagpur', 'Maharashtra', 'India', '440001'),
                                                                                                       ('CG014', 'Pooja Desai', 'pooja.desai@example.com', '9876543223', 'Corporate', 'Ahmedabad', 'Gujarat', 'India', '380001'),
                                                                                                       ('CG015', 'Manish Arora', 'manish.arora@example.com', '9876543224', 'Regular', 'Kanpur', 'Uttar Pradesh', 'India', '208001'),
                                                                                                       ('CG016', 'Ritika Bansal', 'ritika.bansal@example.com', '9876543225', 'Premium', 'Surat', 'Gujarat', 'India', '395001'),
                                                                                                       ('CG017', 'Ankit Chawla', 'ankit.chawla@example.com', '9876543226', 'HNI', 'Varanasi', 'Uttar Pradesh', 'India', '221001'),
                                                                                                       ('CG018', 'Kavita Reddy', 'kavita.reddy@example.com', '9876543227', 'Corporate', 'Visakhapatnam', 'Andhra Pradesh', 'India', '530001'),
                                                                                                       ('CG019', 'Rajeev Khanna', 'rajeev.khanna@example.com', '9876543228', 'Regular', 'Patna', 'Bihar', 'India', '800001'),
                                                                                                       ('CG020', 'Simran Gill', 'simran.gill@example.com', '9876543229', 'Premium', 'Amritsar', 'Punjab', 'India', '143001'),
                                                                                                       ('CG021', 'Gaurav Saxena', 'gaurav.saxena@example.com', '9876543230', 'HNI', 'Ghaziabad', 'Uttar Pradesh', 'India', '201001'),
                                                                                                       ('CG022', 'Anjali Dubey', 'anjali.dubey@example.com', '9876543231', 'Corporate', 'Noida', 'Uttar Pradesh', 'India', '201301'),
                                                                                                       ('CG023', 'Nitin Tiwari', 'nitin.tiwari@example.com', '9876543232', 'Regular', 'Gurgaon', 'Haryana', 'India', '122001'),
                                                                                                       ('CG024', 'Pallavi Sen', 'pallavi.sen@example.com', '9876543233', 'Premium', 'Bhubaneswar', 'Odisha', 'India', '751001'),
                                                                                                       ('CG025', 'Akash Yadav', 'akash.yadav@example.com', '9876543234', 'HNI', 'Ranchi', 'Jharkhand', 'India', '834001'),
                                                                                                       ('CG026', 'Deepika Roy', 'deepika.roy@example.com', '9876543235', 'Corporate', 'Raipur', 'Chhattisgarh', 'India', '492001'),
                                                                                                       ('CG027', 'Harsh Vardhan', 'harsh.vardhan@example.com', '9876543236', 'Regular', 'Dehradun', 'Uttarakhand', 'India', '248001'),
                                                                                                       ('CG028', 'Swati Kulkarni', 'swati.kulkarni@example.com', '9876543237', 'Premium', 'Mysuru', 'Karnataka', 'India', '570001'),
                                                                                                       ('CG029', 'Vivek Chauhan', 'vivek.chauhan@example.com', '9876543238', 'HNI', 'Thiruvananthapuram', 'Kerala', 'India', '695001'),
                                                                                                       ('CG030', 'Rashmi Pathak', 'rashmi.pathak@example.com', '9876543239', 'Corporate', 'Coimbatore', 'Tamil Nadu', 'India', '641001'),
                                                                                                       ('CG031', 'Tarun Kapoor', 'tarun.kapoor@example.com', '9876543240', 'Regular', 'Vadodara', 'Gujarat', 'India', '390001'),
                                                                                                       ('CG032', 'Mona Aggarwal', 'mona.aggarwal@example.com', '9876543241', 'Premium', 'Jodhpur', 'Rajasthan', 'India', '342001'),
                                                                                                       ('CG033', 'Abhishek Sinha', 'abhishek.sinha@example.com', '9876543242', 'HNI', 'Agra', 'Uttar Pradesh', 'India', '282001'),
                                                                                                       ('CG034', 'Sonia Paul', 'sonia.paul@example.com', '9876543243', 'Corporate', 'Kolkata', 'West Bengal', 'India', '700001'),
                                                                                                       ('CG035', 'Ravi Menon', 'ravi.menon@example.com', '9876543244', 'Regular', 'Madurai', 'Tamil Nadu', 'India', '625001'),
                                                                                                       ('CG036', 'Anusha Rao', 'anusha.rao@example.com', '9876543245', 'Premium', 'Mangaluru', 'Karnataka', 'India', '575001'),
                                                                                                       ('CG037', 'Ashok Pillai', 'ashok.pillai@example.com', '9876543246', 'HNI', 'Nashik', 'Maharashtra', 'India', '422001'),
                                                                                                       ('CG038', 'Shilpa Anand', 'shilpa.anand@example.com', '9876543247', 'Corporate', 'Faridabad', 'Haryana', 'India', '121001'),
                                                                                                       ('CG039', 'Ramesh Kulkarni', 'ramesh.kulkarni@example.com', '9876543248', 'Regular', 'Meerut', 'Uttar Pradesh', 'India', '250001'),
                                                                                                       ('CG040', 'Poonam Bhatt', 'poonam.bhatt@example.com', '9876543249', 'Premium', 'Jabalpur', 'Madhya Pradesh', 'India', '482001'),
                                                                                                       ('CG041', 'Naveen Chopra', 'naveen.chopra@example.com', '9876543250', 'HNI', 'Srinagar', 'Jammu & Kashmir', 'India', '190001'),
                                                                                                       ('CG042', 'Kirti Sood', 'kirti.sood@example.com', '9876543251', 'Corporate', 'Shimla', 'Himachal Pradesh', 'India', '171001'),
                                                                                                       ('CG043', 'Alok Tripathi', 'alok.tripathi@example.com', '9876543252', 'Regular', 'Udaipur', 'Rajasthan', 'India', '313001'),
                                                                                                       ('CG044', 'Renu Saxena', 'renu.saxena@example.com', '9876543253', 'Premium', 'Bareilly', 'Uttar Pradesh', 'India', '243001'),
                                                                                                       ('CG045', 'Vikas Thakur', 'vikas.thakur@example.com', '9876543254', 'HNI', 'Jammu', 'Jammu & Kashmir', 'India', '180001'),
                                                                                                       ('CG046', 'Seema Das', 'seema.das@example.com', '9876543255', 'Corporate', 'Durgapur', 'West Bengal', 'India', '713201'),
                                                                                                       ('CG047', 'Raj Malviya', 'raj.malviya@example.com', '9876543256', 'Regular', 'Gwalior', 'Madhya Pradesh', 'India', '474001'),
                                                                                                       ('CG048', 'Nisha Rathi', 'nisha.rathi@example.com', '9876543257', 'Premium', 'Ajmer', 'Rajasthan', 'India', '305001'),
                                                                                                       ('CG049', 'Aakash Bhardwaj', 'aakash.bhardwaj@example.com', '9876543258', 'HNI', 'Panaji', 'Goa', 'India', '403001'),
                                                                                                       ('CG050', 'Jyoti Singh', 'jyoti.singh@example.com', '9876543259', 'Corporate', 'Shillong', 'Meghalaya', 'India', '793001');

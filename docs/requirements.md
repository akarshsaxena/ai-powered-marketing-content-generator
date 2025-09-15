# Project Requirements — AI-Powered Marketing Content Generator

This document captures the functional and non-functional requirements for the project, along with clear **acceptance criteria** for each screen.

---

## 1️⃣ Search Screen

### **User Story**
As a marketer, I want to search for a customer by CGID so that I can view their details before generating content.

### **Requirements**
- Input box to enter **CGID**.
- Search button to trigger lookup.
- Call `GET /api/customers/{cgid}` from backend.
- If found → navigate to Customer Details screen.
- If not found → display error message: “Customer not found.”

### **Acceptance Criteria**
✅ User can type CGID and click Search.  
✅ API call is made to backend with correct CGID.  
✅ Loader or progress indicator is shown while waiting for response.  
✅ If customer exists → Details screen is shown with correct data.  
✅ If customer does not exist → error message displayed.  
✅ Form cannot be submitted when input is empty (validation).  

---

## 2️⃣ Customer Details Screen

### **User Story**
As a marketer, I want to view and personalize customer details so that I can generate targeted content.

### **Requirements**
- Show customer info:
  - **First Name**, **Last Name**
  - **Mobile Number** (masked except last 4 digits, read-only)
  - **Type of Customer** (dropdown: HNI, Regular, Corporate)
  - **Gender** (read-only)
  - **Address** (collapsed with “View” link to expand)
- Multi-line text box: “Describe Content Requirement”
- Button: **Generate Content**
  - Calls `POST /api/content/generate` with:
    ```jsonc
    {
      "cgid": "CG12345",
      "context": "user input from text box"
    }
    ```

### **Acceptance Criteria**
✅ Customer data is correctly fetched and displayed in respective fields.  
✅ Mobile number shows masked format (e.g., `xxx-xxx-1234`).  
✅ Editing first/last name updates local state (not DB yet).  
✅ Context text box accepts at least 10 characters (basic validation).  
✅ Generate Content button disabled until text box has valid input.  
✅ Clicking Generate Content navigates to Content Screen with generated text shown.  

---

## 3️⃣ Content Screen

### **User Story**
As a marketer, I want to review, edit, regenerate, approve, and send email content to the customer.

### **Requirements**
- Show AI-generated content returned from backend.
- Buttons:
  - **Edit** → makes content editable (textarea)
  - **Regenerate** → calls `POST /api/content/generate` again
  - **Approve** → locks content and enables Send Email button
  - **Send Email** → calls `POST /api/content/send` with payload:
    ```jsonc
    {
      "cgid": "CG12345",
      "content": "final approved content"
    }
    ```

### **Acceptance Criteria**
✅ Generated content is displayed as soon as screen loads.  
✅ Clicking **Edit** allows user to change the text manually.  
✅ Clicking **Regenerate** fetches new content from backend and replaces current text.  
✅ Clicking **Approve** disables editing, enables Send button.  
✅ Clicking **Send Email** calls backend API and shows confirmation (toast or message).  
✅ User cannot send until content is approved.  

---

## 🔧 Non-Functional Requirements
- Responsive UI (works on laptop screen sizes).
- Frontend and backend run independently (CORS handled).
- Proper error handling:
  - 404 → show “Customer not found.”
  - 500 → show generic error message.
- Backend validation for missing/invalid CGID or empty content.
- Logging (backend logs each API call with timestamp).
- Clean commit history (squash merges).
- CI must pass before merge.

---

## 🏆 Bonus (Optional)
- Unit tests for critical components (React & Spring Boot).
- Loading spinners for API calls.
- Toast notifications for success/failure.
- Accessibility: proper labels, keyboard navigation, good contrast.
- Save approved content to DB (for history).

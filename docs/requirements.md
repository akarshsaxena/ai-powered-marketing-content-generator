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

---

## 9️⃣ Issues & Task Breakdown

Below are the suggested GitHub issues to create and assign among team members.  
Each issue should link to the relevant section above and be closed once acceptance criteria are met.

1. **Setup Frontend Skeleton**
   - Create Vite + React app in `/frontend`
   - Install `axios`, `react-router-dom`
   - Setup base routes (`/`, `/details/:cgid`, `/content/:cgid`)

2. **Setup Backend Skeleton**
   - Create Spring Boot project in `/backend`
   - Add dependencies: Spring Web, JPA, Validation, Lombok, Postgres Driver
   - Add base package structure (controller, service, repository)

3. **Setup Postgres Schema + Sample Data**
   - Create `customers` table (cgid, first_name, last_name, mobile, type, gender, address)
   - Insert 3–4 sample records
   - Configure `application.yml` for local Postgres

4. **Build `GET /customers/{cgid}` API**
   - Implement repository query to fetch by CGID
   - Return `404` if not found
   - Write unit test for service

5. **Build `POST /content/generate` API (Mock AI)**
   - Accept payload with `cgid` and `context`
   - Generate mock text (or call real AI if available)
   - Return generated content

6. **Build `POST /content/send` API (Mock Email)**
   - Accept payload with `cgid` and `final content`
   - Log “Email sent to <cgid>” in backend console
   - Return success response

7. **Search Screen**
   - Implement UI with CGID input + Search button
   - Call backend API and handle errors

8. **Details Screen**
   - Display customer details
   - Editable first/last name, masked mobile
   - Context text box + Generate Content button

9. **Content Screen**
   - Show generated content
   - Implement Edit, Regenerate, Approve, Send flow

10. **CI Workflow Setup**
    - Add GitHub Actions workflow for:
      - Backend: `mvn verify`
      - Frontend: `npm install && npm run build`
    - Enable “require status checks to pass” in branch protection

11. **Styling + Validation**
    - Add responsive styles
    - Input validation (non-empty CGID, min length for personalization)
    - Accessibility checks (labels, keyboard navigation)


---

# 📋 5. Requirements Document

`docs/requirements.md`:

```markdown
# Functional Requirements

## 1. Search Screen
- Input CGID + Search button
- Calls GET `/api/customers/{cgid}`
- Show error if not found

## 2. Customer Details Screen
- Show first name, last name, mobile (mask all but last 4 digits), type, gender, address
- Textbox: "Describe Content Requirement"
- Button: "Generate Content" → calls POST `/api/content/generate`

## 3. Content Screen
- Show AI-generated email content
- Buttons:
  - Edit → makes content editable
  - Regenerate → calls AI API again
  - Approve → enables Send button
  - Send → calls POST `/api/content/send` (mock sending)

## Non-Functional
- Responsive UI
- Backend validation (cgid must exist)
- Proper error handling/logging

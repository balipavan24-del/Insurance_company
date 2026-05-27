"""Generate InsureEase signup validation logic PDF (separate doc for backend team)."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, Preformatted, SimpleDocTemplate, Spacer, Table, TableStyle

DESKTOP = Path.home() / "OneDrive" / "Desktop"
if not DESKTOP.exists():
    DESKTOP = Path.home() / "Desktop"

OUTPUT_PDF = DESKTOP / "InsureEase_Signup_Validation_Logic.pdf"

SIGNUP_FLOW = """
1. User opens route: /signup  (React Router in src/App.jsx)
2. User fills form in src/pages/Signup/Signup.jsx
3. On submit → buildSignupApiPayload() normalizes data
4. validateSignupDetails() runs all field + password checks
5. If errors → show alert, stop (no API call)
6. If pass → POST /api/v1/auth/create-account (Spring Boot)
""".strip()

SIGNUP_FIELDS = [
    ["Field", "Validation rule", "Error message"],
    ["fullName", "Required; trim whitespace; minimum 2 characters", "Please enter a valid full name (at least 2 characters)."],
    ["mobileNumber", "Required; remove non-digits; exactly 10 digits", "Please enter a valid 10-digit mobile number."],
    ["email", "Required; must be valid email format", "Please enter your email address."],
    ["email", "Invalid format", "Please enter a valid email address."],
    ["password", "All password rules below must pass", "Password: [rule label]."],
]

SIGNUP_PASSWORD = [
    ["Rule ID", "Requirement", "Check in JavaScript"],
    ["minLength", "Minimum 8 characters", "password.length >= 8"],
    ["uppercase", "At least one uppercase A–Z", "regex: /[A-Z]/"],
    ["lowercase", "At least one lowercase a–z", "regex: /[a-z]/"],
    ["digit", "At least one number 0–9", "regex: /\\d/"],
    ["special", "At least one special character", "regex: /[@$!%*?&#]/"],
]

SIGNUP_PAYLOAD = [
    ["JSON field", "Source (form name)", "Example"],
    ["fullName", "fullName", '"Pavan Bali"'],
    ["mobileNumber", "mobileNumber", '"9876543210"'],
    ["email", "emailAddress", '"user@example.com"'],
    ["password", "password", '"Secure@123"'],
]

SIGNUP_API = [
    ["Item", "Value"],
    ["HTTP method", "POST"],
    ["Endpoint", "/api/v1/auth/create-account"],
    ["Content-Type", "application/json"],
    ["Frontend validation", "src/utils/validations/leadValidation.js"],
    ["Functions", "validateSignupDetails(), validateSignupPassword(), buildSignupApiPayload()"],
    ["UI page", "src/pages/Signup/Signup.jsx"],
]

SIGNUP_RESPONSE = [
    ["Case", "HTTP status", "Response body (example)"],
    ["Success", "201 Created", '{"success":true,"message":"Account created","userId":"..."}'],
    ["Validation failed", "400 Bad Request", '{"success":false,"errors":["..."]}'],
]

JS_REFERENCE = """
// File: src/utils/validations/leadValidation.js

export const validateSignupDetails({ fullName, mobileNumber, email, password }) {
  // 1. fullName: trim, length >= 2
  // 2. mobileNumber: sanitizePhoneNumber → 10 digits
  // 3. email: required + isValidEmail()
  // 4. password: validateSignupPassword() — 5 rules
  return validationErrors;  // [] means OK
}

export const buildSignupApiPayload({ fullName, mobileNumber, email, password }) {
  return {
    fullName: trimmed,
    mobileNumber: 10 digits only,
    email: trimmed,
    password: as entered (hash on server only!)
  };
}
""".strip()


def _escape(text: str) -> str:
    return str(text).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def pdf_table(rows, col_widths, cell_font=8):
    header_style = ParagraphStyle(
        "TblHead", fontName="Helvetica-Bold", fontSize=cell_font, leading=cell_font + 2
    )
    cell_style = ParagraphStyle(
        "TblCell", fontName="Helvetica", fontSize=cell_font, leading=cell_font + 2
    )
    wrapped = []
    for r_idx, row in enumerate(rows):
        style = header_style if r_idx == 0 else cell_style
        wrapped.append([Paragraph(_escape(cell), style) for cell in row])
    table = Table(wrapped, colWidths=col_widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
            ]
        )
    )
    return table


def build_pdf(path: Path) -> None:
    styles = getSampleStyleSheet()
    title = ParagraphStyle("Title", parent=styles["Heading1"], fontSize=16, spaceAfter=8)
    h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=11, spaceBefore=12, spaceAfter=6)
    body = ParagraphStyle("Body", parent=styles["Normal"], fontSize=9, textColor=colors.HexColor("#334155"))
    code = ParagraphStyle("Code", fontName="Courier", fontSize=7.5, leading=10)

    story = [
        Paragraph("InsureEase — Signup Validation Logic", title),
        Paragraph(
            "For backend developers: implement the same rules in Spring Boot. "
            "Source of truth: src/utils/validations/leadValidation.js",
            body,
        ),
        Spacer(1, 8),
        Paragraph("1. Flow (frontend → backend)", h2),
        Preformatted(SIGNUP_FLOW, code),
        Spacer(1, 10),
        Paragraph("2. Field validation rules", h2),
        pdf_table(SIGNUP_FIELDS, [68, 200, 248]),
        Spacer(1, 10),
        Paragraph("3. Password rules (all required)", h2),
        pdf_table(SIGNUP_PASSWORD, [72, 160, 284]),
        Spacer(1, 10),
        Paragraph("4. Request JSON payload", h2),
        pdf_table(SIGNUP_PAYLOAD, [90, 130, 296]),
        Spacer(1, 10),
        Paragraph("5. API endpoint", h2),
        pdf_table(SIGNUP_API, [130, 366]),
        Spacer(1, 10),
        Paragraph("6. Suggested API responses", h2),
        pdf_table(SIGNUP_RESPONSE, [100, 90, 306]),
        Spacer(1, 10),
        Paragraph("7. JavaScript reference (summary)", h2),
        Preformatted(JS_REFERENCE, code),
        Spacer(1, 8),
        Paragraph(
            "Important: Never store plain-text password in database. Use BCrypt hash in Spring Boot. "
            "Test with Postman before connecting React fetch.",
            body,
        ),
    ]

    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
    )
    doc.build(story)


def main() -> None:
    build_pdf(OUTPUT_PDF)
    print(f"PDF saved: {OUTPUT_PDF}")


if __name__ == "__main__":
    main()

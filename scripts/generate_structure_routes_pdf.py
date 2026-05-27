"""Generate InsureEase folder structure + routes PDF (no signup — see generate_signup_validation_pdf.py)."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, Preformatted, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DESKTOP = Path.home() / "OneDrive" / "Desktop"
if not DESKTOP.exists():
    DESKTOP = Path.home() / "Desktop"

OUTPUT_PDF = DESKTOP / "InsureEase_Folder_Structure_and_Routes.pdf"

# Usable width ~516pt (A4 minus margins)
COL_ROUTE = 200
COL_PAGE = 108
COL_NOTES = 208

FOLDER_TREE = """
insurance/
|-- public/
|   |-- favicon.svg
|   +-- images/
|
|-- src/
|   |-- main.jsx         app entry (BrowserRouter)
|   |-- App.jsx          ALL ROUTES defined here
|   |
|   |-- assets/          icons, images, videos
|   |-- components/      Navbar, Footer, Faq, ...
|   |-- pages/           Landing, Login, Signup, Motor, ...
|   |-- data/productContent/
|   +-- utils/
|       |-- validations/ leadValidation.js
|       +-- api.js, media.js
|
|-- index.html
|-- package.json
+-- vite.config.js
""".strip()

ROUTES = [
    ["Route path", "Page file", "Description"],
    ["/", "Landing-Page.jsx", "Home"],
    ["/login", "Login.jsx", "OTP login (demo: 1234)"],
    ["/signup", "Signup.jsx", "Create account"],
    ["/motor-insurance", "—", "Redirect to /motor-insurance/car"],
    ["/motor-insurance/car", "MotorInsurance.jsx", "Motor: car"],
    ["/motor-insurance/bike", "MotorInsurance.jsx", "Motor: bike"],
    ["/motor-insurance/three-wheeler", "MotorInsurance.jsx", "Motor: three-wheeler"],
    ["/motor-insurance/commercial-vehicle", "MotorInsurance.jsx", "Motor: commercial"],
    ["/health-insurance", "Health-Home.jsx", "Health quote wizard"],
    ["/term-insurance", "Term-Home.jsx", "Term quote"],
    ["/cargo-insurance", "Cargo-Home.jsx", "Cargo hub"],
    ["/cargo-insurance/marine", "Cargo-Merain.jsx", "Marine cargo"],
    ["/cargo-insurance/air", "Cargo-Air.jsx", "Air cargo"],
    ["/cargo-insurance/inland", "Cargo-Inland.jsx", "Inland transit"],
    ["/business-insurance", "Business-Home.jsx", "Business hub"],
    ["/business/fire", "Business-Fire.jsx", "Fire coverage"],
    ["/business-insurance/theft-protection", "Theft-Business.jsx", "Theft protection"],
    ["/business-insurance/natural-disaster", "Business-Natural.jsx", "Natural disaster"],
    ["/business-insurance/equipment-breakdown", "Business-Equipment.jsx", "Equipment breakdown"],
    ["/contact-us", "ContactUs.jsx", "Contact form"],
    ["/insurance-basics", "InsuranceBasics.jsx", "Insurance basics"],
    ["*", "—", "Unknown URL redirects to /"],
]

MOTOR_SLUGS = [
    ["URL slug", "Category ID"],
    ["car", "motor-car"],
    ["bike", "motor-bike"],
    ["three-wheeler", "motor-three-wheeler"],
    ["commercial-vehicle", "motor-commercial-vehicle"],
]

def _escape(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def pdf_table(rows, col_widths, cell_font=7.5):
    header_style = ParagraphStyle(
        "TblHead",
        fontName="Helvetica-Bold",
        fontSize=cell_font,
        leading=cell_font + 2,
    )
    cell_style = ParagraphStyle(
        "TblCell",
        fontName="Helvetica",
        fontSize=cell_font,
        leading=cell_font + 2,
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
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
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
    tree_style = ParagraphStyle("Tree", fontName="Courier", fontSize=7, leading=9)

    route_cols = [COL_ROUTE, COL_PAGE, COL_NOTES]

    story = [
        Paragraph("InsureEase — Folder Structure &amp; Routes", title),
        Paragraph("Frontend: React 19 + Vite 8 + React Router 7", body),
        Spacer(1, 8),
        Paragraph("1. Project folder structure", h2),
        Preformatted(FOLDER_TREE, tree_style),
        Spacer(1, 10),
        Paragraph("2. React Router (src/App.jsx)", h2),
        pdf_table(ROUTES, route_cols),
        Spacer(1, 10),
        Paragraph("3. Motor insurance URL slugs", h2),
        pdf_table(MOTOR_SLUGS, [240, 240]),
        Spacer(1, 8),
        Paragraph(
            "Signup validation logic: see separate PDF "
            "(InsureEase_Signup_Validation_Logic.pdf). "
            "Entry: src/main.jsx → BrowserRouter → App.jsx.",
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

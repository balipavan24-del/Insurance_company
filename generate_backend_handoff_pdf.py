from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, Preformatted, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parent
SOURCE_MD = ROOT / "BACKEND_HANDOFF.md"
OUTPUT_PDF = ROOT / "BACKEND_DEVELOPER_HANDOFF.pdf"


def markdown_to_story(markdown_text):
    styles = getSampleStyleSheet()
    normal = styles["BodyText"]
    normal.fontName = "Helvetica"
    normal.fontSize = 10
    normal.leading = 14
    normal.spaceAfter = 6

    heading = ParagraphStyle(
        "Heading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=16,
        spaceBefore=8,
        spaceAfter=6,
        textColor=colors.HexColor("#0f172a"),
    )

    code_style = ParagraphStyle(
        "Code",
        fontName="Courier",
        fontSize=9,
        leading=12,
        leftIndent=8,
        rightIndent=8,
        backColor=colors.HexColor("#f8fafc"),
        borderColor=colors.HexColor("#e2e8f0"),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=8,
    )

    story = []
    in_code = False
    code_lines = []

    for raw_line in markdown_text.splitlines():
        line = raw_line.rstrip()

        if line.strip().startswith("```"):
            if in_code:
                story.append(Preformatted("\n".join(code_lines), code_style))
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not line.strip():
            story.append(Spacer(1, 2))
            continue

        if line.startswith("#"):
            text = line.lstrip("#").strip()
            story.append(Paragraph(text, heading))
            continue

        if line.startswith("- "):
            bullet_text = line[2:].replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            story.append(Paragraph(f"• {bullet_text}", normal))
            continue

        safe = line.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        story.append(Paragraph(safe, normal))

    if code_lines:
        story.append(Preformatted("\n".join(code_lines), code_style))

    return story


def main():
    md = SOURCE_MD.read_text(encoding="utf-8")
    story = markdown_to_story(md)
    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Backend Developer Handoff",
        author="Frontend Team",
    )
    doc.build(story)
    print(f"Generated: {OUTPUT_PDF}")


if __name__ == "__main__":
    main()

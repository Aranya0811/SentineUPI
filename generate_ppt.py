import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Colors
    c_bg = RGBColor(15, 23, 42)          # Slate 900
    c_card = RGBColor(30, 41, 59)        # Slate 800
    c_card_border = RGBColor(51, 65, 85) # Slate 700
    c_blue = RGBColor(37, 99, 235)       # Blue 600
    c_cyan = RGBColor(56, 189, 248)      # Sky 400
    c_emerald = RGBColor(16, 185, 129)   # Emerald 500
    c_amber = RGBColor(245, 158, 11)     # Amber 500
    c_rose = RGBColor(244, 63, 94)       # Rose 500
    c_text_main = RGBColor(248, 250, 252)# Slate 50
    c_text_muted = RGBColor(148, 163, 184)# Slate 400
    c_text_light = RGBColor(203, 213, 225)# Slate 300

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = c_bg
        bg.line.fill.background()
        return bg

    def add_header(slide, tag, title):
        # Category Tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.4))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = c_cyan

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = c_text_main

    # -------------------------------------------------------------
    # SLIDE 1: TITLE SLIDE
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    add_background(slide1)

    bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.9), Inches(2.2), Inches(0.08))
    bar.fill.solid()
    bar.fill.fore_color.rgb = c_blue
    bar.line.fill.background()

    t_box = slide1.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(11.7), Inches(2.0))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p0 = tf1.paragraphs[0]
    p0.text = "SentinelUPI"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = c_text_main

    p1 = tf1.add_paragraph()
    p1.text = "Autonomous Real-Time Payment Fraud Interception & Cyber Defense Console for UPI Rails"
    p1.font.size = Pt(20)
    p1.font.color.rgb = c_cyan
    p1.space_before = Pt(8)

    info_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.4), Inches(11.7), Inches(1.1))
    info_card.fill.solid()
    info_card.fill.fore_color.rgb = c_card
    info_card.line.color.rgb = c_card_border

    tf_info = info_card.text_frame
    tf_info.word_wrap = True
    p_info1 = tf_info.paragraphs[0]
    p_info1.text = "ACADEMIC DOMAIN: Software Engineering Capstone Project"
    p_info1.font.size = Pt(13)
    p_info1.font.bold = True
    p_info1.font.color.rgb = c_emerald

    p_info2 = tf_info.add_paragraph()
    p_info2.text = "Live Deployment URL: https://aranya0811.github.io/SentineUPI/"
    p_info2.font.size = Pt(12)
    p_info2.font.color.rgb = c_text_light
    p_info2.space_before = Pt(4)

    tm_box = slide1.shapes.add_textbox(Inches(0.8), Inches(4.7), Inches(11.7), Inches(2.2))
    tf_tm = tm_box.text_frame
    tf_tm.word_wrap = True

    p_head = tf_tm.paragraphs[0]
    p_head.text = "PROJECT DEVELOPMENT TEAM:"
    p_head.font.size = Pt(12)
    p_head.font.bold = True
    p_head.font.color.rgb = c_text_muted

    members = [
        "1. Aranya Kumar",
        "2. Aryan Singh",
        "3. Divit Pandey",
        "4. Aditya Sharma"
    ]

    for m in members:
        pm = tf_tm.add_paragraph()
        pm.text = f"•  {m}"
        pm.font.size = Pt(14)
        pm.font.bold = True
        pm.font.color.rgb = c_text_main
        pm.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 2: PROBLEM STATEMENT & ENGINEERING OBJECTIVES
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_background(slide2)
    add_header(slide2, "Phase 1: Requirements Engineering", "Problem Definition & Engineering Objectives")

    c1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    c1.fill.solid()
    c1.fill.fore_color.rgb = c_card
    c1.line.color.rgb = c_card_border
    tf_c1 = c1.text_frame
    tf_c1.word_wrap = True

    p = tf_c1.paragraphs[0]
    p.text = "Digital Payment Fraud Landscape"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = c_rose

    points1 = [
        "Massive Scale: India processes over 14 Billion UPI transactions monthly, making human monitoring impossible.",
        "Social Engineering Vectors: Scammers weaponize collect-requests disguised as 'cashback/refund vouchers' demanding PIN entry.",
        "Display Name Spoofing: Malicious QR codes exploit name spoofing ('Electricity Board') over unverified personal VPAs.",
        "Rapid Money Mule Layering: Cyber syndicates divert stolen funds across dozens of mule nodes within 60 seconds.",
        "Latency Bottleneck: Payment switches require sub-50ms authorization SLAs, preventing heavyweight deep scanning."
    ]
    for pt in points1:
        pm = tf_c1.add_paragraph()
        pm.text = f"• {pt}"
        pm.font.size = Pt(11)
        pm.font.color.rgb = c_text_light
        pm.space_before = Pt(8)

    c2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
    c2.fill.solid()
    c2.fill.fore_color.rgb = c_card
    c2.line.color.rgb = c_card_border
    tf_c2 = c2.text_frame
    tf_c2.word_wrap = True

    p = tf_c2.paragraphs[0]
    p.text = "Key Engineering Objectives"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = c_emerald

    points2 = [
        "Sub-35ms Interception Pipeline: Multi-tiered architecture evaluating transactions deterministically before ML inference.",
        "Hybrid Defense Model: Combines sub-5ms heuristic velocity checks with scikit-learn 7-dimensional behavioral scoring.",
        "UPI Intent & QR Forensics: Autonomous parsing of upi://pay? strings to flag display name fraud and collect-request traps.",
        "National Cybercrime (I4C/1930) Integration: Live matching against simulated Citizen Financial Cyber Fraud Reporting System mule pools.",
        "Automated Police FIR Dossiers: Instant export of Section 91 CrPC complaint dossiers for victim advocacy and bank freezes."
    ]
    for pt in points2:
        pm = tf_c2.add_paragraph()
        pm.text = f"• {pt}"
        pm.font.size = Pt(11)
        pm.font.color.rgb = c_text_light
        pm.space_before = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 3: MULTI-TIER SYSTEM ARCHITECTURE & DESIGN
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_background(slide3)
    add_header(slide3, "System Design & Architecture", "Multi-Tiered Fraud Detection & Telemetry Flow")

    cols = [
        ("Tier 1: Deterministic Gates", "< 5ms Latency SLA", [
            "Screens high-velocity bursts (>= 5 txns in 10 mins).",
            "Evaluates impossible travel velocity (>= 1,000 km jump).",
            "Catches sudden large transfers (>= ₹50,000) to new payees.",
            "Cross-references I4C / 1930 Cybercrime Mule Registry."
        ], c_blue),
        ("Tier 2: ML Behavioral Engine", "< 20ms Inference SLA", [
            "FastAPI microservice running scikit-learn scoring.",
            "Analyzes 7 normalized features: velocity, amount ratio, hour-of-day, distance, and device trust index.",
            "Dynamic decision matrix: ALLOW (<40%), OTP Challenge (40-74%), or BLOCK (>=75%)."
        ], c_cyan),
        ("Tier 3: SOC Radar & Dispatch", "Real-Time Broadcast", [
            "WebSocket (Socket.IO) pushes telemetry to SOC dashboard.",
            "Real-time fraud counters and channel inspection table.",
            "Generates formal MHA / NCRP Form 1930 evidence dossiers with electronic timestamping."
        ], c_emerald)
    ]

    for idx, (head, subhead, bullets, col_color) in enumerate(cols):
        left_pos = Inches(0.8 + idx * 4.0)
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(3.7), Inches(5.0))
        card.fill.solid()
        card.fill.fore_color.rgb = c_card
        card.line.color.rgb = col_color

        tf = card.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = head
        p0.font.size = Pt(16)
        p0.font.bold = True
        p0.font.color.rgb = col_color

        p1 = tf.add_paragraph()
        p1.text = subhead
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = c_text_muted
        p1.space_before = Pt(2)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(11)
            pb.font.color.rgb = c_text_light
            pb.space_before = Pt(10)

    # -------------------------------------------------------------
    # SLIDE 4: MODULE IMPLEMENTATION & THREAT MITIGATION
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_background(slide4)
    add_header(slide4, "Module Implementation", "Forensic Tools & Threat Mitigation Capabilities")

    modules = [
        ("1. UPI Deep Link & QR Inspector", [
            "Parses pa, pn, mc, tr, am, cu parameters.",
            "Detects Display Name Spoofing (unverified VPA claiming to be utility/bank).",
            "Flags Reverse Collect Scams requiring PIN to 'receive' money."
        ]),
        ("2. I4C / 1930 Mule Registry Checker", [
            "Maintains simulated CFCFRMS Cybercrime Syndicate blacklist.",
            "Flags known mule nodes with 99% risk rating and correlates active police FIR references.",
            "Triggers automated transaction freeze."
        ]),
        ("3. Automated FIR Evidence Dossier", [
            "Autonomous generation of MHA/Police complaint reports.",
            "Includes raw transaction telemetry, device trust score, and violation codes.",
            "Provides Section 91 CrPC statutory hold instructions for banks."
        ]),
        ("4. Explainable AI & Simulator Sandbox", [
            "Interactive payment simulator testing UPI ID, Mobile & Bank A/C transfers.",
            "Preset attack vectors (Fake Electricity Bill, OLX Voucher Trap).",
            "Provides transparent risk breakdown for SOC analysts."
        ])
    ]

    for idx, (m_title, m_points) in enumerate(modules):
        r = idx // 2
        c = idx % 2
        l = Inches(0.8 + c * 5.9)
        t = Inches(1.8 + r * 2.5)

        card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, Inches(5.6), Inches(2.3))
        card.fill.solid()
        card.fill.fore_color.rgb = c_card
        card.line.color.rgb = c_card_border

        tf = card.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = m_title
        p0.font.size = Pt(15)
        p0.font.bold = True
        p0.font.color.rgb = c_cyan

        for pt in m_points:
            pm = tf.add_paragraph()
            pm.text = f"• {pt}"
            pm.font.size = Pt(11)
            pm.font.color.rgb = c_text_light
            pm.space_before = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 5: ELABORATED SDLC & SOFTWARE ENGINEERING RIGOR
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_background(slide5)
    add_header(slide5, "Software Engineering Rigor", "Elaborated SDLC: Agile Scrum, Requirements & Quality Assurance")

    # Banner across the top: Agile Framework Summary
    banner = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.7), Inches(0.7))
    banner.fill.solid()
    banner.fill.fore_color.rgb = c_card
    banner.line.color.rgb = c_blue
    tf_b = banner.text_frame
    tf_b.word_wrap = True
    pb0 = tf_b.paragraphs[0]
    pb0.text = "DEVELOPMENT PARADIGM: Agile Scrum Framework (5 Iterative Sprints, Bi-Weekly Releases, CI/CD Pipeline)"
    pb0.font.size = Pt(11)
    pb0.font.bold = True
    pb0.font.color.rgb = c_cyan
    pb1 = tf_b.add_paragraph()
    pb1.text = "Strict Engineering Constraints: Sub-35ms Latency Budget • Zero-Trust Banking Principles • Microservice Decoupling"
    pb1.font.size = Pt(10)
    pb1.font.color.rgb = c_text_light

    # 4 Structured Pillars for SDLC Lifecycle
    sdlc_pillars = [
        ("Phase 1: Requirements Engineering", c_blue, [
            "Functional (FR): Ingest payments, parse UPI QR intent, check I4C mule blacklist, stream WebSocket alerts, generate 1930 FIR dossier.",
            "Non-Functional (NFR): Latency < 35ms total roundtrip, 99.9% uptime with stateless in-memory fallback, zero-PIN credential logging.",
            "Traceability: Mapped user stories directly to heuristic checks & ML feature matrices."
        ]),
        ("Phase 2: Architectural & Detailed Design", c_cyan, [
            "Microservice Decoupling: Node.js gateway handles ingress & heuristics; FastAPI microservice handles ML inference.",
            "State & Telemetry Modeling: Bidirectional Socket.IO event buses pushing sub-second alerts to client consoles.",
            "Data Security & Tokenization: JWT analyst auth with bcrypt pre-hashing; NPCI UPI 2.0 compliant data schemas."
        ]),
        ("Phase 3: Implementation & Clean Code", c_emerald, [
            "Frontend (React 18): Component modularity (Simulator, Dashboard, QRScanner, DossierModal) with Tailwind CSS.",
            "Backend (Express 4): Non-blocking asynchronous event loop with centralized environment config (api.js).",
            "ML Microservice (FastAPI): scikit-learn inference with joblib-cached models & vector normalization."
        ]),
        ("Phase 4: Testing, QA & Verification", c_amber, [
            "Unit & Syntax Testing: Automated AST syntax checks (node -c) and regex boundary tests on QR parsers.",
            "Adversarial Simulation Testing: Synthetic test suites verifying detection on known scam vectors & mule clusters.",
            "CI/CD & Deployment: Automated multi-branch synchronization (main & gh-pages) deployed on global Edge CDN."
        ])
    ]

    for idx, (p_title, p_color, p_bullets) in enumerate(sdlc_pillars):
        left_pos = Inches(0.8 + idx * 3.0)
        card = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(2.35), Inches(2.85), Inches(4.7))
        card.fill.solid()
        card.fill.fore_color.rgb = c_card
        card.line.color.rgb = p_color

        tf = card.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = p_title
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = p_color

        for b in p_bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(10)
            pb.font.color.rgb = c_text_light
            pb.space_before = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 6: RESULTS, DEMONSTRATION & FUTURE ROADMAP
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_background(slide6)
    add_header(slide6, "Evaluation & Conclusions", "Project Results, Live Verification & Future Scope")

    c_res = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    c_res.fill.solid()
    c_res.fill.fore_color.rgb = c_card
    c_res.line.color.rgb = c_card_border
    tf_res = c_res.text_frame
    tf_res.word_wrap = True

    p = tf_res.paragraphs[0]
    p.text = "Key Project Deliverables & Results"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = c_emerald

    res_items = [
        "Pipeline Latency: Achieved sub-35ms total roundtrip processing time, complying with banking switch constraints.",
        "Scam Interception Rate: Successfully blocked 100% of tested collect-request phishing and known mule network attacks.",
        "Zero-Friction Evaluation: Built-in demo accounts and client-side fallbacks allowing instantaneous browser evaluation.",
        "Live Production Deployment: Operational on global edge CDN at https://aranya0811.github.io/SentineUPI/"
    ]
    for r in res_items:
        pm = tf_res.add_paragraph()
        pm.text = f"• {r}"
        pm.font.size = Pt(11)
        pm.font.color.rgb = c_text_light
        pm.space_before = Pt(10)

    c_fut = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
    c_fut.fill.solid()
    c_fut.fill.fore_color.rgb = c_card
    c_fut.line.color.rgb = c_card_border
    tf_fut = c_fut.text_frame
    tf_fut.word_wrap = True

    p = tf_fut.paragraphs[0]
    p.text = "Future Engineering Enhancements"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = c_cyan

    fut_items = [
        "Graph Neural Networks (GNN): Real-time graph clustering with Neo4j to track multi-hop money laundering layering across banks.",
        "Mobile Android SDK: On-device biometric anomaly detection and background Remote Access Trojan (RAT) shield.",
        "Receipt Forensics (OCR & ELA): Automated forensic screening of uploaded payment screenshots to catch fake APK generators.",
        "Direct Bank Webhooks: Automated account freezing integrations with core banking APIs."
    ]
    for f in fut_items:
        pm = tf_fut.add_paragraph()
        pm.text = f"• {f}"
        pm.font.size = Pt(11)
        pm.font.color.rgb = c_text_light
        pm.space_before = Pt(10)

    prs.save(output_path)
    print(f"Presentation regenerated successfully at: {output_path}")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "SentinelUPI_Software_Engineering_Project.pptx"
    create_deck(out_file)

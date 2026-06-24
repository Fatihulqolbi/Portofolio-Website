import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Experience from "@/models/Experience";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear old data
    await Experience.deleteMany({});
    await Project.deleteMany({});

    const academicCards = [
      {
        title: "ASSISTANT LECTURER OF DATABASE MANAGEMENT SYSTEM",
        period: "FEB 2026 – PRESENT",
        imageSrc: "/Experiences/academic/Asisten SBD.png",
        description: "Experienced in SQL and MongoDB, including database design, query optimization, relational database management, NoSQL databases, indexing, aggregation pipelines, and data modeling.",
        logoSrc: "/Experiences/academic/Its.png",
        type: "Academic",
        organization: "Institut Teknologi Sepuluh Nopember"
      },
      {
        title: "ASSISTANT LECTURER OF ALGORITHMS & PROGRAMMING",
        period: "AUG 2025 – FEB 2026",
        imageSrc: "/Experiences/academic/Asisten ATP.png",
        description: "Proficient in C and C++ for algorithm implementation, data structures, structured programming, debugging, and advanced problem solving.",
        logoSrc: "/Experiences/academic/Its.png",
        type: "Academic",
        organization: "Institut Teknologi Sepuluh Nopember"
      },
      {
        title: "COMMUNITY SERVICE (KKN) AT PONPES AL IZZAH BALIKPAPAN",
        period: "SEP 2025 – OCT 2025",
        imageSrc: "/Experiences/academic/Ponpes_Al-Izzah.png",
        description: "Conducted an educational initiative for students and teachers focused on leveraging Artificial Intelligence to enhance learning efficiency. Held in strategic collaboration with Institut Teknologi Kalimantan (ITK).",
        logoSrc: "/Experiences/academic/IT.png",
        type: "Academic",
        organization: "Ponpes Al Izzah"
      },
      {
        title: "COMMUNITY SERVICE (KKN) AT PONPES NUSA SIDOARJO",
        period: "MAY 2025 – JUL 2025",
        imageSrc: "/Experiences/academic/Ponpes_Nusa.png",
        description: "Conducted a 7-day intensive educational program at the boarding school, dedicated to teaching foundational technology skills alongside Islamic religious studies to empower the young students.",
        logoSrc: "/Experiences/academic/Its.png",
        type: "Academic",
        organization: "Ponpes Nusa Sidoarjo"
      }
    ];

    const nonAcademicCards = [
      {
        title: "STAFF OF EVENT RDK 46 ITS",
        period: "DEC 2024 - APR 2025",
        imageSrc: "/Experiences/non-academic/Rdk46doc.png",
        description: "Conceptualized the event structure, served as Master of Ceremonies (MC), drafted comprehensive Terms of Reference (ToR), and hosted prominent national figures.",
        logoSrc: "/Experiences/non-academic/Rdk46_Fix.png",
        type: "Non-Academic",
        organization: "RDK ITS"
      },
      {
        title: "EXPERT STAFF OF EVENT RDK 47 ITS",
        period: "AUG 2025 - MAR 2026",
        imageSrc: "/Experiences/non-academic/Rdk47doc.png",
        description: "Conceptualized the event structure, served as Master of Ceremonies (MC), drafted comprehensive Terms of Reference (ToR), and hosted prominent national figures.",
        logoSrc: "/Experiences/non-academic/Rdk47.png",
        type: "Non-Academic",
        organization: "RDK ITS"
      },
      {
        title: "STAFF OF PUBLIC RELATION SRE SC ITS",
        period: "SEP 2025 - MAY 2026",
        imageSrc: "/Experiences/non-academic/SREdoc.png",
        description: "Managed the Company Visit program and actively contributed to major division events, including 'SRE Women in Energy' featuring prominent female figures in the renewable energy sector, and 'RENeX Summit', a flagship event uniting Academia, Industry, Community, Government, and Media.",
        logoSrc: "/Experiences/non-academic/sre.png",
        type: "Non-Academic",
        organization: "SRE SC ITS"
      },
      {
        title: "STAFF OF EXTERNAL IEEE SC ITS",
        period: "MAY 2025 - MAY 2026",
        imageSrc: "/Experiences/non-academic/IEEEdoc.png",
        description: "Spearheaded the organization of comprehensive Company Visit initiatives, successfully bridging the gap between student communities and prominent industry leaders. Additionally, provided critical strategic support for various large-scale external programs, facilitating interactive professional talk shows, establishing robust organizational partnerships, and amplifying the society's overarching external engagement footprint.",
        logoSrc: "/Experiences/non-academic/IEEE.png",
        type: "Non-Academic",
        organization: "IEEE SC ITS"
      },
      {
        title: "STAFF OF EXTERNAL KARYA SALEMBA EMPAT",
        period: "AUG 2025 - AUG 2026",
        imageSrc: "/Experiences/KSE_v2.png",
        description: "Managed the Benchmarking program and assisted with major external initiatives including the Karya Salemba Empat Foundation's agenda and Alumni Talk sessions. Executed comprehensive external relations tasks to enhance organizational networking and outreach.",
        logoSrc: "/Experiences/non-academic/KSE_v2.png",
        type: "Non-Academic",
        organization: "Karya Salemba Empat"
      },
      {
        title: "STAFF OF EXTERNAL UKM CATUR ITS",
        period: "MAY 2025 - FEB 2026",
        imageSrc: "/Experiences/non-academic/Caturdoc.png",
        description: "Led benchmarking initiatives to establish standard best practices. Handled core external division responsibilities, fostering connections and maintaining strategic communication with external stakeholders.",
        logoSrc: "/Experiences/non-academic/Catur_v2.png",
        type: "Non-Academic",
        organization: "UKM Catur ITS"
      },
      {
        title: "STAFF OF ROADSHOW ARA 6.0",
        period: "NOV 2024 - APR 2025",
        imageSrc: "/Experiences/non-academic/Ara6doc.png",
        description: "Spearheaded promotional roadshows to various high schools across Surabaya. Secured media partnerships, drafted formal licensing proposals, and successfully executed localized marketing campaigns to significantly boost event awareness and participation.",
        logoSrc: "/Experiences/non-academic/Ara6.png",
        type: "Non-Academic",
        organization: "ARA ITS"
      },
      {
        title: "EXPERT STAFF OF PUBLIC RELATION ARA 7.0",
        period: "SEP 2025 - MAR 2026",
        imageSrc: "/Experiences/non-academic/Ara7doc.png",
        description: "Orchestrated extensive media collaborations to maximize event exposure and competitive reach. Managed strategic media partnerships for high-impact promotion, and served as the primary Liaison Officer (LO) ensuring excellent hospitality and coordination for visiting teachers and mentors during the Grand Finale.",
        logoSrc: "/Experiences/non-academic/Ara7.png",
        type: "Non-Academic",
        organization: "ARA ITS"
      }
    ];

    await Experience.insertMany([...academicCards, ...nonAcademicCards]);

    return NextResponse.json({ message: "Successfully migrated experiences and cleared projects." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset DB" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

"use client";

import React, { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("experience");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ToshiroBankai") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // Utility to convert file to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Experience State ---
  const [expCategory, setExpCategory] = useState("Academic");
  const [expTitle, setExpTitle] = useState("");
  const [expOrg, setExpOrg] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expLogo, setExpLogo] = useState("");
  const [expDoc, setExpDoc] = useState("");

  const submitExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: expTitle,
          organization: expOrg,
          period: expDuration,
          type: expCategory,
          description: expDesc,
          logoSrc: expLogo,
          imageSrc: expDoc,
        }),
      });
      alert("Experience uploaded successfully!");
    } catch (err) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  // --- Achievement State ---
  const [achCategory, setAchCategory] = useState("High School");
  const [achTitle, setAchTitle] = useState("");
  const [achOrganizer, setAchOrganizer] = useState("");
  const [achDesc, setAchDesc] = useState("");
  const [achDoc, setAchDoc] = useState("");
  const [achLink, setAchLink] = useState("");

  const submitAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: achTitle,
          category: achCategory,
          organizer: achOrganizer,
          description: achDesc,
          imageSrc: achDoc,
          link: achLink,
        }),
      });
      alert("Achievement uploaded successfully!");
    } catch (err) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  // --- Writing State ---
  const [writeCategory, setWriteCategory] = useState("Essay");
  const [writeTitle, setWriteTitle] = useState("");
  const [writeExcerpt, setWriteExcerpt] = useState("");
  const [writeLink, setWriteLink] = useState("");
  const [writeImage, setWriteImage] = useState("");

  const submitWriting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/writings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: writeTitle,
          category: writeCategory,
          excerpt: writeExcerpt,
          link: writeLink,
          date: new Date().toLocaleDateString("id-ID"),
          imageSrc: writeImage,
        }),
      });
      alert("Writing uploaded successfully!");
    } catch (err) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  // --- Project State ---
  const [projCategory, setProjCategory] = useState("AI Project");
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projStatus, setProjStatus] = useState("Ongoing");
  const [projTech, setProjTech] = useState("");
  const [projLink, setProjLink] = useState("");
  const [projImage, setProjImage] = useState("");

  const submitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projTitle,
          category: projCategory,
          description: projDesc,
          status: projStatus,
          techStack: projTech.split(",").map((s) => s.trim()),
          liveUrl: projLink,
          image: projImage,
        }),
      });
      alert("Project uploaded successfully!");
    } catch (err) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  // --- Skill State ---
  const [skillCategory, setSkillCategory] = useState("Programming Language");
  const [skillName, setSkillName] = useState("");
  const [skillIcon, setSkillIcon] = useState("");

  const submitSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: skillCategory,
          name: skillName,
          icon: skillIcon,
        }),
      });
      alert("Skill uploaded successfully!");
    } catch (err) {
      alert("Error uploading");
    }
    setLoading(false);
  };

  // --- Photo State ---
  const [photoImage, setPhotoImage] = useState("");
  const [photoClassName, setPhotoClassName] = useState("absolute top-[50%] left-[50%] rotate-[0deg] w-56 md:w-80 z-20");

  const submitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: photoImage,
          className: photoClassName,
        }),
      });
      alert("Photo uploaded successfully!");
    } catch (err) {
      alert("Error uploading photo");
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c14]">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-[rgba(20,24,36,0.8)] p-8 rounded-xl border border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-white mb-4">
            <Lock className="text-[var(--color-accent)]" />
            <h1 className="text-xl font-bold">Admin Access</h1>
          </div>
          <input
            type="password"
            placeholder="Secret Passcode"
            className="p-3 rounded-md bg-[#0a0c14] border border-[var(--color-border)] text-white outline-none focus:border-[var(--color-accent)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="p-3 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  const inputStyle = "w-full p-3 rounded-md bg-[#0a0c14] border border-[var(--color-border)] text-white outline-none focus:border-[var(--color-accent)] mb-4";
  const labelStyle = "block text-sm text-[var(--color-muted-light)] mb-1 font-medium";

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-accent)] mb-8 border-b border-[var(--color-border)] pb-4">Obi's Secret Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["experience", "achievement", "writing", "project", "skill", "photo"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full capitalize font-medium transition-all ${
                activeTab === tab ? "bg-[var(--color-accent)] text-black" : "bg-[rgba(20,24,36,0.8)] text-white hover:bg-[var(--color-border)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-[rgba(20,24,36,0.6)] p-6 rounded-xl border border-[var(--color-border)]">
          {/* EXPERIENCE FORM */}
          {activeTab === "experience" && (
            <form onSubmit={submitExperience}>
              <h2 className="text-xl font-bold mb-6">Add New Experience</h2>
              
              <label className={labelStyle}>Category (Academic / Non Academic)</label>
              <select className={inputStyle} value={expCategory} onChange={(e) => setExpCategory(e.target.value)}>
                <option value="Academic">Academic</option>
                <option value="Non-Academic">Non-Academic</option>
              </select>

              <label className={labelStyle}>Nama Pengalaman</label>
              <input type="text" required className={inputStyle} value={expTitle} onChange={(e) => setExpTitle(e.target.value)} />

              <label className={labelStyle}>Nama Organisasi / Instansi</label>
              <input type="text" required className={inputStyle} value={expOrg} onChange={(e) => setExpOrg(e.target.value)} />

              <label className={labelStyle}>Durasi (Contoh: AUG 2025 - FEB 2026)</label>
              <input type="text" required className={inputStyle} value={expDuration} onChange={(e) => setExpDuration(e.target.value)} />

              <label className={labelStyle}>Gambar Logo Instansi</label>
              <input type="file" accept="image/*" className={inputStyle} onChange={(e) => handleFileChange(e, setExpLogo)} />

              <label className={labelStyle}>Gambar Dokumentasi Kegiatan</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setExpDoc)} />

              <label className={labelStyle}>Deskripsi Kegiatan</label>
              <textarea required className={inputStyle} rows={4} value={expDesc} onChange={(e) => setExpDesc(e.target.value)} />

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Experience"}
              </button>
            </form>
          )}

          {/* ACHIEVEMENT FORM */}
          {activeTab === "achievement" && (
            <form onSubmit={submitAchievement}>
              <h2 className="text-xl font-bold mb-6">Add New Achievement</h2>
              
              <label className={labelStyle}>Jenjang (High School / University)</label>
              <select className={inputStyle} value={achCategory} onChange={(e) => setAchCategory(e.target.value)}>
                <option value="High School">High School</option>
                <option value="University">University</option>
              </select>

              <label className={labelStyle}>Juara & Nama Lomba (Heading)</label>
              <input type="text" required className={inputStyle} value={achTitle} onChange={(e) => setAchTitle(e.target.value)} />

              <label className={labelStyle}>Penyelenggara (Subheading)</label>
              <input type="text" required className={inputStyle} value={achOrganizer} onChange={(e) => setAchOrganizer(e.target.value)} />

              <label className={labelStyle}>Link Sertifikat (Kosongkan jika tidak ada)</label>
              <input type="url" className={inputStyle} value={achLink} onChange={(e) => setAchLink(e.target.value)} />

              <label className={labelStyle}>Foto Dokumentasi Lomba</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setAchDoc)} />

              <label className={labelStyle}>Deskripsi Lomba</label>
              <textarea required className={inputStyle} rows={4} value={achDesc} onChange={(e) => setAchDesc(e.target.value)} />

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Achievement"}
              </button>
            </form>
          )}

          {/* WRITING FORM */}
          {activeTab === "writing" && (
            <form onSubmit={submitWriting}>
              <h2 className="text-xl font-bold mb-6">Add New Writing / Article</h2>
              
              <label className={labelStyle}>Kategori</label>
              <select className={inputStyle} value={writeCategory} onChange={(e) => setWriteCategory(e.target.value)}>
                <option value="Essay">Essay</option>
                <option value="Karya Tulis Ilmiah">Karya Tulis Ilmiah</option>
                <option value="Lainnya">Lainnya</option>
              </select>

              <label className={labelStyle}>Judul Tulisan</label>
              <input type="text" required className={inputStyle} value={writeTitle} onChange={(e) => setWriteTitle(e.target.value)} />

              <label className={labelStyle}>Link Tulisan (G-Drive / PDF / Website)</label>
              <input type="url" className={inputStyle} value={writeLink} onChange={(e) => setWriteLink(e.target.value)} />

              <label className={labelStyle}>Gambar Thumbnail Tulisan (Portrait Recommended)</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setWriteImage)} />

              <label className={labelStyle}>Deskripsi Singkat (Excerpt)</label>
              <textarea required className={inputStyle} rows={4} value={writeExcerpt} onChange={(e) => setWriteExcerpt(e.target.value)} />

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Writing"}
              </button>
            </form>
          )}

          {/* PROJECT FORM */}
          {activeTab === "project" && (
            <form onSubmit={submitProject}>
              <h2 className="text-xl font-bold mb-6">Add New Project</h2>
              
              <label className={labelStyle}>Status Project</label>
              <select className={inputStyle} value={projStatus} onChange={(e) => setProjStatus(e.target.value)}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>

              <label className={labelStyle}>Kategori Project</label>
              <select className={inputStyle} value={projCategory} onChange={(e) => setProjCategory(e.target.value)}>
                <option value="AI Project">AI Project</option>
                <option value="Web Development">Web Development</option>
                <option value="IoT Project">IoT Project</option>
                <option value="Fullstack Application">Fullstack Application</option>
                <option value="UI/UX Concept">UI/UX Concept</option>
                <option value="Game Dev">Game Dev</option>
              </select>

              <label className={labelStyle}>Nama Project</label>
              <input type="text" required className={inputStyle} value={projTitle} onChange={(e) => setProjTitle(e.target.value)} />

              <label className={labelStyle}>Link Project / Demo</label>
              <input type="url" className={inputStyle} value={projLink} onChange={(e) => setProjLink(e.target.value)} />

              <label className={labelStyle}>Teknologi yang digunakan (Pisahkan dengan koma)</label>
              <input type="text" required placeholder="Next.js, Tailwind, MongoDB" className={inputStyle} value={projTech} onChange={(e) => setProjTech(e.target.value)} />

              <label className={labelStyle}>Gambar Thumbnail Project</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setProjImage)} />

              <label className={labelStyle}>Deskripsi Singkat Project</label>
              <textarea required className={inputStyle} rows={4} value={projDesc} onChange={(e) => setProjDesc(e.target.value)} />

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Project"}
              </button>
            </form>
          )}

          {/* SKILL FORM */}
          {activeTab === "skill" && (
            <form onSubmit={submitSkill}>
              <h2 className="text-xl font-bold mb-6">Add New Skill</h2>
              
              <label className={labelStyle}>Kategori Skill</label>
              <select className={inputStyle} value={skillCategory} onChange={(e) => setSkillCategory(e.target.value)}>
                <option value="Programming Language">Programming Language</option>
                <option value="Framework & Library">Framework & Library</option>
                <option value="DBMS">DBMS</option>
                <option value="Hardware & IoT">Hardware & IoT</option>
                <option value="AI & Data">AI & Data</option>
                <option value="DevOps & Version Control">DevOps & Version Control</option>
                <option value="Tools">Tools</option>
                <option value="Operating System">Operating System</option>
                <option value="Game Dev">Game Dev</option>
              </select>

              <label className={labelStyle}>Nama Skill</label>
              <input type="text" required className={inputStyle} value={skillName} onChange={(e) => setSkillName(e.target.value)} />

              <label className={labelStyle}>Ikon Skill (.png / .svg)</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setSkillIcon)} />

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Skill"}
              </button>
            </form>
          )}

          {/* PHOTO FORM */}
          {activeTab === "photo" && (
            <form onSubmit={submitPhoto}>
              <h2 className="text-xl font-bold mb-6">Add New Photo Moment</h2>
              
              <label className={labelStyle}>Gambar Momen (.jpg / .png)</label>
              <input type="file" accept="image/*" required className={inputStyle} onChange={(e) => handleFileChange(e, setPhotoImage)} />

              <label className={labelStyle}>Posisi & Rotasi (Tailwind Classes)</label>
              <input type="text" required className={inputStyle} value={photoClassName} onChange={(e) => setPhotoClassName(e.target.value)} />
              <p className="text-xs text-gray-500 mb-4 -mt-2">Contoh: absolute top-[50%] left-[50%] rotate-[5deg] w-56 md:w-80 z-20</p>

              <button type="submit" disabled={loading} className="w-full p-4 bg-[var(--color-accent)] text-black font-bold rounded-md hover:opacity-80">
                {loading ? "Uploading..." : "Upload Photo"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

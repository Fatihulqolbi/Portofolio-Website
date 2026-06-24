"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";
import { Reveal, SectionLabel } from "@/components/ui/Animations";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function ContactSection() {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/fatihulqolbi02@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSent(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSent(false), 5000); // Reset button after 5 seconds
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const links = [
    { icon: <Mail size={16} />, label: "Email", value: siteConfig.socials.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.socials.email}` },
    { icon: <LinkedinIcon size={16} />, label: "LinkedIn", value: "LinkedIn Profile", href: siteConfig.socials.linkedin },
    { icon: <GithubIcon size={16} />, label: "GitHub", value: "GitHub Profile", href: siteConfig.socials.github },
    { icon: <InstagramIcon size={16} />, label: "Instagram", value: "Instagram", href: siteConfig.socials.instagram },
    { icon: <WhatsappIcon size={16} />, label: "WhatsApp", value: "WhatsApp", href: siteConfig.socials.whatsapp },
    { icon: <MapPin size={16} />, label: "Location", value: siteConfig.location, href: "#" },
  ];

  const typewriterWords = [
    { text: "Let's" },
    { text: "work" },
    { text: "together.", className: "text-[var(--color-accent)]" },
  ];

  return (
    <section id="contact" className="section-gap">
      <div className="container-main">
        <SectionLabel text="Contact" />

        <Reveal>
          <h2 className="heading-lg mb-4">
            <TypewriterEffectSmooth words={typewriterWords} />
          </h2>
          <p className="text-body max-w-lg mb-12">
            Have a project in mind or just want to say hello?
            I&apos;m always open to new opportunities and collaborations.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact links */}
          <Reveal className="lg:col-span-2">
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg group transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--color-muted-light)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.background = "var(--color-surface)";
                    (e.currentTarget).style.color = "var(--color-foreground)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.background = "transparent";
                    (e.currentTarget).style.color = "var(--color-muted-light)";
                  }}
                >
                  <span className="accent-text">{link.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                      {link.label}
                    </p>
                    <p className="text-sm font-medium truncate">{link.value}</p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="relative group">
              {/* Floating Hint Text */}
              <div className="absolute -top-12 -right-4 md:-right-8 flex flex-col items-center pointer-events-none z-30 animate-[floatHint_2.5s_ease-in-out_infinite] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                <span className="font-sans text-[var(--color-accent)] text-lg md:text-xl font-black tracking-wide whitespace-nowrap rotate-[15deg] translate-x-4 translate-y-2 uppercase drop-shadow-[0_0_10px_rgba(100,255,218,0.5)] transition-colors duration-300 group-hover:text-white">
                  Let's Collaborate!
                </span>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-accent)] stroke-current mt-2 translate-x-4 rotate-[-10deg] transition-all duration-300 group-hover:text-white group-hover:-rotate-[15deg]">
                  <path d="M7 10C7 10 9 14 12 18M12 18C15 14 17 10 17 10M12 18V4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <style>{`
                @keyframes floatHint {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(6px); }
                }
              `}</style>

              {/* Extremely highlighted container with spinning border */}
              <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(100,255,218,0.15)] group-hover:shadow-[0_0_60px_rgba(100,255,218,0.25)] transition-shadow duration-500 z-10">
                
                {/* Spinning gradient border */}
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#04040a_0%,var(--color-accent)_50%,#04040a_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <form onSubmit={handleSubmit} className="relative card p-6 md:p-8 w-full h-full bg-[#06080e] rounded-[14px] z-10 border-none">
                  
                  <h3 className="text-base font-semibold mb-5">Send a message</h3>
              
              {/* FormSubmit Configurations */}
              <input type="hidden" name="_subject" value="New message from Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-1.5" style={{ color: "var(--color-muted-light)" }}>Name</label>
                    <input
                      id="name" name="name" type="text" placeholder="Your name"
                      className="input" required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1.5" style={{ color: "var(--color-muted-light)" }}>Email</label>
                    <input
                      id="email" name="email" type="email" placeholder="you@email.com"
                      className="input" required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm mb-1.5" style={{ color: "var(--color-muted-light)" }}>Subject</label>
                  <input
                    id="subject" name="_subject_custom" type="text" placeholder="What's this about?"
                    className="input" required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-1.5" style={{ color: "var(--color-muted-light)" }}>Message</label>
                  <textarea
                    id="message" name="message" placeholder="Your message..."
                    className="input" required
                    style={{ minHeight: "120px", resize: "vertical" }}
                  />
                </div>
                <style>{`
                  .button-send {
                    --primary: var(--color-accent);
                    --neutral-1: #0a0c14;
                    --neutral-2: #10141f;
                    --radius: 14px;

                    cursor: pointer;
                    border-radius: var(--radius);
                    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
                    border: none;
                    box-shadow: 0 0.5px 0.5px 1px rgba(0, 0, 0, 0.2),
                      0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s ease;
                    width: 100%;
                    padding: 20px;
                    height: 68px;
                    font-family: var(--font-sans);
                    font-size: 16px;
                    font-weight: 600;
                    color: #ffffff;
                    background: var(--neutral-1);
                    margin-top: 1rem;
                  }
                  .button-send:hover {
                    transform: scale(1.02);
                    box-shadow: 0 0 1px 2px rgba(100, 255, 218, 0.1),
                      0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
                  }
                  .button-send:active {
                    transform: scale(1);
                    box-shadow: 0 0 1px 2px rgba(100, 255, 218, 0.1),
                      0 10px 3px -3px rgba(0, 0, 0, 0.2);
                  }
                  .button-send:after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: var(--radius);
                    border: 2.5px solid transparent;
                    background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
                      linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45))
                        border-box;
                    z-index: 0;
                    transition: all 0.4s ease;
                  }
                  .button-send:hover::after {
                    transform: scale(1.03, 1.05);
                    box-shadow: inset 0 -1px 3px 0 rgba(50, 50, 50, 1);
                  }

                  .button-send::before {
                    content: "";
                    inset: 7px 6px 6px 6px;
                    position: absolute;
                    background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
                    border-radius: 30px;
                    filter: blur(0.5px);
                    z-index: 2;
                  }
                  .state p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                  }
                  .state .icon {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    transform: scale(1.1);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .state .icon svg {
                    overflow: visible;
                  }

                  /* Outline */
                  .outline {
                    position: absolute;
                    border-radius: inherit;
                    overflow: hidden;
                    z-index: 1;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    inset: -2px -3.5px;
                  }
                  .outline::before {
                    content: "";
                    position: absolute;
                    inset: -100%;
                    background: conic-gradient(
                      from 180deg,
                      transparent 60%,
                      var(--primary) 80%,
                      transparent 100%
                    );
                    animation: spin 2s linear infinite;
                    animation-play-state: paused;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  .button-send:hover .outline {
                    opacity: 1;
                  }
                  .button-send:hover .outline::before {
                    animation-play-state: running;
                  }

                  /* Letters */
                  .state p span {
                    display: block;
                    opacity: 0;
                    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
                  }
                  .button-send:hover p span {
                    opacity: 1;
                    animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
                  }
                  .button-send.is-sent p span {
                    opacity: 1;
                    animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
                  }
                  @keyframes wave {
                    30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); }
                    50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); color: var(--primary); }
                    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
                  }
                  @keyframes slideDown {
                    0% { opacity: 0; transform: translateY(-20px) translateX(5px) rotate(-90deg); color: var(--primary); filter: blur(5px); }
                    30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); filter: blur(0); }
                    50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); }
                    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
                  }
                  @keyframes disapear {
                    from { opacity: 1; }
                    to { opacity: 0; transform: translateX(5px) translateY(20px); color: var(--primary); filter: blur(5px); }
                  }

                  /* Plane */
                  .state--default .icon svg {
                    animation: land 0.6s ease forwards;
                  }
                  .button-send:hover .state--default .icon {
                    transform: rotate(45deg) scale(1.1);
                  }
                  .button-send.is-sent .state--default svg {
                    animation: takeOff 0.8s linear forwards;
                  }
                  .button-send.is-sent .state--default .icon {
                    transform: rotate(0) scale(1.1);
                  }
                  @keyframes takeOff {
                    0% { opacity: 1; }
                    60% { opacity: 1; transform: translateX(70px) rotate(45deg) scale(2); }
                    100% { opacity: 0; transform: translateX(160px) rotate(45deg) scale(0); }
                  }
                  @keyframes land {
                    0% { transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2); opacity: 0; filter: blur(3px); }
                    100% { transform: translateX(0) translateY(0) rotate(0); opacity: 1; filter: blur(0); }
                  }

                  /* Contrail */
                  .state--default .icon:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    height: 2px;
                    width: 0;
                    left: -5px;
                    background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.5));
                  }
                  .button-send.is-sent .state--default .icon:before {
                    animation: contrail 0.8s linear forwards;
                  }
                  @keyframes contrail {
                    0% { width: 0; opacity: 1; }
                    8% { width: 15px; }
                    60% { opacity: 0.7; width: 80px; }
                    100% { opacity: 0; width: 160px; }
                  }

                  /* States */
                  .state {
                    padding-left: 29px;
                    z-index: 2;
                    display: flex;
                    position: relative;
                  }
                  .state--sent {
                    display: none;
                  }
                  .state--sent svg {
                    transform: scale(1.1);
                    margin-right: 8px;
                  }
                  .button-send.is-sent .state--default {
                    position: absolute;
                  }
                  .button-send.is-sent .state--sent {
                    display: flex;
                  }
                  .button-send.is-sent .state--sent span {
                    opacity: 0;
                    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
                  }
                  .button-send.is-sent .state--sent .icon svg {
                    opacity: 0;
                    animation: appear 1.2s ease forwards 0.8s;
                  }
                  @keyframes appear {
                    0% { opacity: 0; transform: scale(4) rotate(-40deg); color: var(--primary); filter: blur(4px); }
                    30% { opacity: 1; transform: scale(0.6); filter: blur(1px); }
                    50% { opacity: 1; transform: scale(1.2); filter: blur(0); }
                    100% { opacity: 1; transform: scale(1); }
                  }
                `}</style>
                <button type="submit" className={`button-send ${isSent ? "is-sent" : ""} ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
                  <div className="outline"></div>
                  <div className="state state--default">
                    <div className="icon">
                      <Send size={18} strokeWidth={2.5} />
                    </div>
                    <p className="flex items-center">
                      <span style={{ "--i": 0 } as React.CSSProperties}>S</span>
                      <span style={{ "--i": 1 } as React.CSSProperties}>e</span>
                      <span style={{ "--i": 2 } as React.CSSProperties}>n</span>
                      <span style={{ "--i": 3 } as React.CSSProperties}>d</span>
                      <span style={{ "--i": 4, width: '6px' } as React.CSSProperties}></span>
                      <span style={{ "--i": 5 } as React.CSSProperties}>M</span>
                      <span style={{ "--i": 6 } as React.CSSProperties}>e</span>
                      <span style={{ "--i": 7 } as React.CSSProperties}>s</span>
                      <span style={{ "--i": 8 } as React.CSSProperties}>s</span>
                      <span style={{ "--i": 9 } as React.CSSProperties}>a</span>
                      <span style={{ "--i": 10 } as React.CSSProperties}>g</span>
                      <span style={{ "--i": 11 } as React.CSSProperties}>e</span>
                    </p>
                  </div>
                  <div className="state state--sent">
                    <div className="icon">
                      <Send size={18} strokeWidth={2.5} />
                    </div>
                    <p>
                      <span style={{ "--i": 0 } as React.CSSProperties}>S</span>
                      <span style={{ "--i": 1 } as React.CSSProperties}>e</span>
                      <span style={{ "--i": 2 } as React.CSSProperties}>n</span>
                      <span style={{ "--i": 3 } as React.CSSProperties}>t</span>
                      <span style={{ "--i": 4 } as React.CSSProperties}>!</span>
                    </p>
                  </div>
                </button>
              </div>
            </form>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

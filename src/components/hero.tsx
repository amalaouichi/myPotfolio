"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";

function useTypingEffect(
    texts: string[],
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000
) {
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    if (displayText.length < currentText.length) {
                        setDisplayText(
                            currentText.slice(0, displayText.length + 1)
                        );
                    } else {
                        setTimeout(() => setIsDeleting(true), pauseTime);
                    }
                } else {
                    if (displayText.length > 0) {
                        setDisplayText(displayText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setTextIndex((prev) => (prev + 1) % texts.length);
                    }
                }
            },
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [
        displayText,
        isDeleting,
        textIndex,
        texts,
        typingSpeed,
        deletingSpeed,
        pauseTime,
    ]);

    return displayText;
}

function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    );
}

function MagneticButton({
    children,
    href,
    className,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
}) {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (button) {
            button.style.transform = "translate(0, 0)";
        }
    };

    return (
        <Link
            ref={buttonRef}
            href={href}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            {children}
        </Link>
    );
}

export function Hero() {
    const [mounted, setMounted] = useState(false);
    const typedText = useTypingEffect([
        "Développeuse Full Stack",
        "Experte React.js & Node.js",
        "Passionnée par le Web",
        "Créatrice de solutions innovantes",
    ]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center relative px-6 pt-20 overflow-hidden">
            <FloatingParticles />

            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
            <div
                className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob"
                style={{ animationDelay: "4s" }}
            />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p
                                className={`text-primary font-mono text-sm tracking-wider uppercase flex items-center gap-2 opacity-0 ${
                                    mounted
                                        ? "animate-slide-in-left stagger-1"
                                        : ""
                                }`}>
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span className="min-h-[1.25rem]">
                                    {typedText}
                                    <span className="animate-pulse">|</span>
                                </span>
                            </p>

                            <h1
                                className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 ${
                                    mounted
                                        ? "animate-slide-in-left stagger-2"
                                        : ""
                                }`}>
                                <span className="animate-shimmer">
                                    Amal Aouichi
                                </span>
                            </h1>

                            <p
                                className={`text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed opacity-0 ${
                                    mounted
                                        ? "animate-slide-in-left stagger-3"
                                        : ""
                                }`}>
                                Je conçois des{" "}
                                <span className="text-foreground font-medium relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                                    solutions web efficaces et innovantes
                                </span>{" "}
                                avec React.js et Node.js.
                            </p>
                        </div>

                        <div
                            className={`flex items-center gap-4 opacity-0 ${
                                mounted ? "animate-slide-in-left stagger-4" : ""
                            }`}>
                            <MagneticButton
                                href="#projects"
                                className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg overflow-hidden relative">
                                <span className="relative z-10 flex items-center gap-2">
                                    Voir mes projets
                                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                            </MagneticButton>

                            <MagneticButton
                                href="#contact"
                                className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-border text-foreground rounded-lg hover:border-primary/50 transition-colors relative overflow-hidden">
                                <span className="relative z-10">
                                    Me contacter
                                </span>
                                <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </MagneticButton>
                        </div>

                        <div
                            className={`flex items-center gap-6 pt-4 opacity-0 ${
                                mounted ? "animate-slide-in-left stagger-5" : ""
                            }`}>
                            {[
                                {
                                    icon: Github,
                                    href: "https://github.com/amalaouichi",
                                    label: "GitHub",
                                },
                                {
                                    icon: Linkedin,
                                    href: "https://www.linkedin.com/in/amal-aouichi-061697209/",
                                    label: "LinkedIn",
                                },
                                {
                                    icon: Mail,
                                    href: "mailto:amalaouichi12@gmail.com",
                                    label: "Email",
                                },
                            ].map((social, i) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={
                                        social.href.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        social.href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="text-muted-foreground hover:text-primary transition-all hover:scale-125 hover:-translate-y-1"
                                    aria-label={social.label}
                                    style={{ transitionDelay: `${i * 50}ms` }}>
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`relative opacity-0 ${
                            mounted ? "animate-scale-in stagger-3" : ""
                        }`}>
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto card-3d group">
                            <div className="absolute inset-[-20px] border border-primary/20 rounded-full animate-rotate-slow" />
                            <div
                                className="absolute inset-[-40px] border border-primary/10 rounded-full animate-rotate-slow"
                                style={{
                                    animationDirection: "reverse",
                                    animationDuration: "30s",
                                }}
                            />

                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />

                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-500 card-3d-inner">
                                <img
                                    src="/images/amoulet.png"
                                    alt="Amal Aouichi - Développeuse Web Full Stack"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 ${
                    mounted ? "animate-slide-up stagger-6" : ""
                }`}>
                <Link
                    href="#about"
                    aria-label="Scroll to about section"
                    className="group flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
                        Scroll
                    </span>
                    <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full p-1 group-hover:border-primary/50 transition-colors">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce mx-auto" />
                    </div>
                </Link>
            </div>
        </section>
    );
}

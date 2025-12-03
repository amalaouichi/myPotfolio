"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["about", "skills", "projects", "contact"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-background/80 backdrop-blur-lg border-b border-border py-3"
                    : "bg-transparent py-4"
            )}>
            <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item, index) => (
                        <li key={item.name} className="overflow-hidden">
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-all duration-300 relative group inline-block",
                                    activeSection === item.href.slice(1)
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}>
                                <span className="relative z-10">
                                    {item.name}
                                </span>
                                {/* Animated underline */}
                                <span
                                    className={cn(
                                        "absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300",
                                        activeSection === item.href.slice(1)
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    )}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link
                    href="#contact"
                    className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 relative overflow-hidden group">
                    <span className="relative z-10">Me contacter</span>
                    <div className="absolute inset-0 from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity animate-gradient" />
                </Link>

                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu">
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </nav>

            <div
                className={cn(
                    "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300 overflow-hidden",
                    mobileMenuOpen
                        ? "max-h-80 opacity-100"
                        : "max-h-0 opacity-0"
                )}>
                <ul className="px-6 py-4 space-y-4">
                    {navItems.map((item, index) => (
                        <li
                            key={item.name}
                            className={cn(
                                "transform transition-all duration-300",
                                mobileMenuOpen
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${index * 50}ms` }}>
                            <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "block py-2 text-lg font-medium transition-colors",
                                    activeSection === item.href.slice(1)
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

"use client";

import type React from "react";

import { useInView } from "@/hooks/use-in-view";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";

const projects = [
    {
        title: "SIRH - Système de Gestion RH",
        description:
            "Solution complète pour automatiser et rationaliser les processus RH. Gestion des employés, suivi des congés, fiches de paie et reporting avancé.",
        image: "images/loginsirh.png",
        tags: ["React.js", "Node.js", "PostgreSQL"],
        github: "#",
        demo: "#",
        color: "from-cyan-500/20 to-blue-500/20",
    },
    {
        title: "ALDRH - Plateforme RH",
        description:
            "Plateforme de workflow RH permettant la validation des documents administratifs avec gestion des approbations multi-niveaux.",
        image: "images/aldrh.png",
        tags: ["Next.js", "NestJS", "TypeScript", "GraphQL"],
        github: "#",
        demo: "#",
        color: "from-purple-500/20 to-pink-500/20",
    },
    {
        title: "Data Inventory - Inventaire de données",
        description:
            "Application web pour classifier et publier les données organisationnelles en ligne. Interface intuitive pour la gestion des métadonnées.",
        image: "images/datainventory.png",
        tags: ["React.js", "Express.js", "MySQL", "Material UI"],
        github: "#",
        demo: "#",
        color: "from-orange-500/20 to-red-500/20",
    },
    {
        title: "CMDA - Plateforme de networking",
        description:
            "Plateforme innovante pour connecter les professionnels, partager des projets et accroître leur visibilité dans leur domaine.",
        image: "images/cmda.jpg",
        tags: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        github: "#",
        demo: "#",
        color: "from-teal-500/20 to-emerald-500/20",
    },
];

function ProjectCard({
    project,
    index,
    isInView,
}: {
    project: (typeof projects)[0];
    index: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const isEven = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`group grid md:grid-cols-2 gap-8 items-center opacity-0 ${
                isInView
                    ? isEven
                        ? "animate-slide-in-left"
                        : "animate-slide-in-right"
                    : ""
            }`}
            style={{ animationDelay: `${index * 200}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}>
            {/* Image container with parallax */}
            <div
                className={`relative overflow-hidden rounded-2xl border border-border bg-card ${
                    !isEven ? "md:order-2" : ""
                }`}>
                {/* Cursor spotlight effect */}
                {isHovered && (
                    <div
                        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.75 0.15 180 / 0.15), transparent 40%)`,
                        }}
                    />
                )}

                {/* Gradient overlay */}
                <div
                    className={`absolute inset-0  ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                />

                <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-all duration-700 group-hover:scale-110"
                />

                {/* Hover overlay with icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                        <ArrowUpRight className="w-8 h-8 text-primary-foreground" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`space-y-4 ${!isEven ? "md:order-1" : ""}`}>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                            style={{ transitionDelay: `${tagIndex * 50}ms` }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-6 pt-2">
                    <a
                        href={project.github}
                        className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors relative">
                        <Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
                        <span className="relative">
                            Code
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                        </span>
                    </a>
                    <a
                        href={project.demo}
                        className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors relative">
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        <span className="relative">
                            Demo
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    const { ref, isInView } = useInView();

    return (
        <section id="projects" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div ref={ref} className="space-y-16">
                    <div
                        className={`text-center space-y-4 opacity-0 ${
                            isInView ? "animate-slide-up" : ""
                        }`}>
                        <p className="text-primary font-mono text-sm tracking-wider uppercase">
                            Portfolio
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Mes Projets
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Découvrez mes réalisations en développement web
                            full-stack, des systèmes RH aux plateformes de
                            données.
                        </p>
                    </div>

                    <div className="grid gap-16">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

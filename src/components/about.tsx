"use client";

import { useInView } from "@/hooks/use-in-view";
import { Code2, Lightbulb, Users, Zap } from "lucide-react";

const features = [
    { icon: Code2, title: "Clean Code", description: "Architecture soignée" },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Solutions créatives",
    },
    { icon: Users, title: "Collaboration", description: "Travail d'équipe" },
    { icon: Zap, title: "Performance", description: "Apps optimisées" },
];

export function About() {
    const { ref, isInView } = useInView();

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.75 0.15 180) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div
                    ref={ref}
                    className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-6">
                        <div
                            className={`space-y-2 opacity-0 ${
                                isInView ? "animate-slide-in-left" : ""
                            }`}>
                            <p className="text-primary font-mono text-sm tracking-wider uppercase">
                                À propos
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Passionnée par le développement web
                            </h2>
                        </div>

                        <div
                            className={`grid grid-cols-2 gap-4 pt-4 opacity-0 ${
                                isInView ? "animate-slide-in-left" : ""
                            }`}
                            style={{ animationDelay: "200ms" }}>
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}>
                                    <feature.icon className="w-8 h-8 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                                    <h4 className="font-medium text-foreground">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p
                            className={`text-muted-foreground leading-relaxed text-lg opacity-0 ${
                                isInView ? "animate-slide-in-right" : ""
                            }`}
                            style={{ animationDelay: "100ms" }}>
                            Je suis une développeuse web motivée et proactive,
                            spécialisée en{" "}
                            <span className="text-foreground font-medium relative inline-block">
                                React.js
                                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary/50" />
                            </span>{" "}
                            et{" "}
                            <span className="text-foreground font-medium relative inline-block">
                                Node.js
                                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary/50" />
                            </span>
                            . Je recherche constamment de nouveaux défis pour
                            perfectionner mes compétences et contribuer à des
                            projets innovants.
                        </p>

                        <p
                            className={`text-muted-foreground leading-relaxed text-lg opacity-0 ${
                                isInView ? "animate-slide-in-right" : ""
                            }`}
                            style={{ animationDelay: "200ms" }}>
                            J'excelle dans le travail d'équipe comme en
                            autonomie, en visant toujours des résultats de haute
                            qualité. Grâce à mes excellentes capacités de
                            communication et de résolution de problèmes, je suis
                            dédiée à créer des{" "}
                            <span className="text-foreground font-medium">
                                solutions web efficaces et innovantes
                            </span>
                            .
                        </p>

                        <p
                            className={`text-primary font-semibold text-lg opacity-0 ${
                                isInView ? "animate-slide-in-right" : ""
                            }`}
                            style={{ animationDelay: "300ms" }}>
                            <span className="inline-flex items-center gap-2">
                                <Zap className="w-5 h-5 animate-pulse" />
                                Construisons quelque chose de génial ensemble !
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

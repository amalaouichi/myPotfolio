"use client";

import { useInView } from "@/hooks/use-in-view";
import { Code2, Server } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend",
        icon: Code2,
        color: "from-cyan-500 to-blue-500",
        skills: [
            "React.js",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Tailwind CSS",
            "HTML/CSS",
            "Material UI",
        ],
    },
    {
        title: "Backend",
        icon: Server,
        color: "from-violet-500 to-purple-500",
        skills: [
            "Node.js",
            "Express.js",
            "NestJS",
            "RESTful APIs",
            "GraphQL",
            "PostgreSQL",
            "MySQL",
        ],
    },
];

export function Skills() {
    const { ref, isInView } = useInView();

    return (
        <section id="skills" className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto">
                <div ref={ref} className="space-y-12">
                    {/* Header */}
                    <div
                        className={`text-center space-y-4 transition-all duration-700 ${
                            isInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}>
                        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                            Compétences
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Technologies & Outils
                        </h2>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {skillCategories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={category.title}
                                    className={`group relative rounded-3xl bg-card border border-border p-8 transition-all duration-700 hover:border-transparent hover:shadow-2xl ${
                                        isInView
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-12"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 150}ms`,
                                    }}>
                                    {/* Gradient border on hover */}
                                    <div
                                        className={`absolute inset-0 rounded-3xl bg-primary ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
                                    />
                                    <div className="absolute inset-[1px] rounded-3xl bg-card -z-10" />

                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div
                                            className={`p-3 rounded-2xl bg-primary ${category.color}`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-foreground">
                                            {category.title}
                                        </h3>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-3">
                                        {category.skills.map(
                                            (skill, skillIndex) => (
                                                <span
                                                    key={skill}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-accent hover:scale-105 transition-all duration-300 cursor-default ${
                                                        isInView
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 translate-y-4"
                                                    }`}
                                                    style={{
                                                        transitionDelay: `${
                                                            index * 150 +
                                                            skillIndex * 50
                                                        }ms`,
                                                    }}>
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

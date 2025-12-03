"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import {
    Mail,
    Phone,
    Send,
    Loader2,
    CheckCircle2,
    Sparkles,
    Linkedin,
} from "lucide-react";

export function Contact() {
    const { ref, isInView } = useInView();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Récupérer les données du formulaire
        const formData = new FormData(formRef.current!);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        try {
            // Utiliser Web3Forms (gratuit, sans backend)
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    access_key: "3c63e395-6d16-49da-9b6e-8a1bc28da18f", // Clé publique Web3Forms
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    from_name: "Portfolio Amal Aouichi",
                    botcheck: "", // Anti-spam
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Email envoyé avec succès");
                setSubmitted(true);
                formRef.current?.reset(); // Réinitialiser le formulaire
            } else {
                throw new Error(result.message || "Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error("Erreur:", error);

            // Fallback: ouvrir le client email par défaut
            const mailtoLink = `mailto:amalaouichi12@gmail.com?subject=${encodeURIComponent(
                `[Portfolio] ${subject} - ${name}`
            )}&body=${encodeURIComponent(
                `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            window.open(mailtoLink, "_blank");

            // Afficher quand même la confirmation
            setSubmitted(true);
            formRef.current?.reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 px-6 bg-card/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div ref={ref} className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div
                            className={`space-y-4 opacity-0 ${
                                isInView ? "animate-slide-in-left" : ""
                            }`}>
                            <p className="text-primary font-mono text-sm tracking-wider uppercase flex items-center gap-2">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                Contact
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Travaillons ensemble
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Je suis toujours ouverte à discuter de nouveaux
                                projets, d'idées créatives ou d'opportunités
                                pour faire partie de votre vision.
                            </p>
                        </div>

                        <div
                            className={`space-y-4 opacity-0 ${
                                isInView ? "animate-slide-in-left" : ""
                            }`}
                            style={{ animationDelay: "200ms" }}>
                            <a
                                href="mailto:amalaouichi12@gmail.com"
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group hover:-translate-x-1">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                </div>
                                <span className="font-medium">
                                    amalaouichi12@gmail.com
                                </span>
                            </a>

                            <a
                                href="tel:+21625642374"
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group hover:-translate-x-1">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Phone className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                </div>
                                <span className="font-medium">
                                    +216 25 642 374
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/amal-aouichi-061697209/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group hover:-translate-x-1">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                </div>
                                <span className="font-medium">
                                    Amal Aouichi
                                </span>
                            </a>
                        </div>
                    </div>

                    <div
                        className={`opacity-0 ${
                            isInView ? "animate-slide-in-right" : ""
                        }`}
                        style={{ animationDelay: "100ms" }}>
                        <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
                            {/* Gradient border animation on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8 animate-scale-in">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
                                        <CheckCircle2 className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Message envoyé !
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Merci pour votre message. Je vous
                                        répondrai dans les plus brefs délais.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 relative z-10">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className={`peer w-full px-4 py-3 bg-secondary border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                                                    focusedField === "name"
                                                        ? "border-primary"
                                                        : "border-border"
                                                }`}
                                                placeholder="Votre nom"
                                                onFocus={() =>
                                                    setFocusedField("name")
                                                }
                                                onBlur={() =>
                                                    setFocusedField(null)
                                                }
                                            />
                                            <label
                                                htmlFor="name"
                                                className="absolute left-4 -top-2.5 text-xs font-medium text-primary bg-card px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">
                                                Nom
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className={`peer w-full px-4 py-3 bg-secondary border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                                                    focusedField === "email"
                                                        ? "border-primary"
                                                        : "border-border"
                                                }`}
                                                placeholder="votre@email.com"
                                                onFocus={() =>
                                                    setFocusedField("email")
                                                }
                                                onBlur={() =>
                                                    setFocusedField(null)
                                                }
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-4 -top-2.5 text-xs font-medium text-primary bg-card px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">
                                                Email
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className={`peer w-full px-4 py-3 bg-secondary border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                                                focusedField === "subject"
                                                    ? "border-primary"
                                                    : "border-border"
                                            }`}
                                            placeholder="Sujet"
                                            onFocus={() =>
                                                setFocusedField("subject")
                                            }
                                            onBlur={() => setFocusedField(null)}
                                        />
                                        <label
                                            htmlFor="subject"
                                            className="absolute left-4 -top-2.5 text-xs font-medium text-primary bg-card px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">
                                            Sujet
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            className={`peer w-full px-4 py-3 bg-secondary border rounded-lg text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                                                focusedField === "message"
                                                    ? "border-primary"
                                                    : "border-border"
                                            }`}
                                            placeholder="Votre message"
                                            onFocus={() =>
                                                setFocusedField("message")
                                            }
                                            onBlur={() => setFocusedField(null)}
                                        />
                                        <label
                                            htmlFor="message"
                                            className="absolute left-4 -top-2.5 text-xs font-medium text-primary bg-card px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">
                                            Message
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative">
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                    Envoyer le message
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

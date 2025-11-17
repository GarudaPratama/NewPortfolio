import { motion } from "framer-motion";

export default function About() {
    const lines = [
        "I’m Garuda, a frontend developer specializing in modern interfaces,",
        "minimal aesthetics, and smooth interactions.",
        "I design experiences that feel simple on the surface, but are crafted with detail,",
        "intention, and performance in mind."
    ];

    return (
        <div className="w-full flex justify-center">
            <div className="w-[75vw] md:w-[50vw] mb-36 md:mb-48">
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ 
                            opacity: 0, 
                            y: 20, 
                            color: "var(--text-muted)" 
                        }}
                        whileInView={{ 
                            opacity: 1, 
                            y: 0, 
                            color: "var(--text)" 
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ 
                            duration: 0.8,
                            ease: "easeOut",
                            delay: i * 0.12 // efek stagger seperti fadestocode
                        }}
                        className="text-left text-xl md:text-4xl lg:text-5xl leading-tight font-hanson"
                    >
                        {line}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}

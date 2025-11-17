import { motion } from "framer-motion";

export default function Skills() {
    return (
        <section className="min-h-screen flex flex-col items-center px-6 md:px-12 lg:px-24 py-12 bg-bg overflow-hidden">
            <motion.h1
                className="text-4xl md:text-7xl lg:text-7xl font-hanson text-text leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                SKILLS
            </motion.h1>
        </section>
    );
}
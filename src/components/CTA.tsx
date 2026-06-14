import { motion } from "motion/react";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-30" />
      
      {/* Playful drawn waves in the CTA background */}
      <motion.svg className="absolute bottom-0 left-0 w-full h-32 text-foreground opacity-10" viewBox="0 0 1000 100" preserveAspectRatio="none" initial={{x: -100}} animate={{x: 0}} transition={{repeat: Infinity, duration: 10, ease: "linear"}}>
        <path d="M0 50 Q 250 100 500 50 T 1000 50 L 1000 100 L 0 100 Z" fill="currentColor" />
      </motion.svg>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-ink-blue mb-8 block">Execution</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-10 leading-[1.1] tracking-tight text-foreground relative inline-block">
            Have a business concept ready for a <br/>
            <motion.span
              className="relative inline-block italic font-medium mt-4 px-2 py-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <span className="relative z-10">tailored system?</span>
              <motion.svg
                aria-hidden="true"
                className="absolute left-[-0.08em] bottom-[0.02em] z-0 h-[0.62em] w-[calc(100%+0.16em)] -rotate-2 overflow-visible"
                viewBox="0 0 100 16"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M3 10.5 C18 7.8 36 8.8 51 7.9 C66 7 83 8.5 97 6.5"
                  fill="none"
                  stroke="#f5d547"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.72"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 0.72 },
                  }}
                  transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.svg>
            </motion.span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/90 mb-16 font-medium max-w-3xl mx-auto leading-relaxed mt-6">
            Let’s build software that makes the work clearer, smoother, easier to control, and built to grow with your business.
          </p>
          
          <a
            href="#contact"
            className="sketch-button-primary inline-flex items-center justify-center px-12 py-5 font-bold tracking-[0.1em] uppercase text-sm mt-4"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

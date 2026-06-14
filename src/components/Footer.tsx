import { useState, type FormEvent } from "react";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

type SubmitState = "idle" | "loading" | "success" | "error";

type IconProps = {
  className?: string;
};

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_API_URL || "https://aoqutjipqixenjaizhgk.supabase.co/functions/v1/contact";

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4A8.4 8.4 0 1 1 20.5 11.8Z" />
      <path d="M8.6 8.2c.2-.5.4-.6.8-.6h.6c.2 0 .5.1.6.5l.5 1.2c.1.3.1.5-.1.7l-.4.5c.7 1.4 1.8 2.4 3.2 3.1l.5-.4c.2-.2.5-.2.8-.1l1.2.5c.4.2.5.4.5.7v.5c0 .5-.3.8-.7 1-1.1.4-3.2-.1-5.2-2.1-2-1.9-2.6-4.1-2.3-5.5Z" />
    </svg>
  );
}

export function Footer() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setSubmitState("error");
      setFeedback("Please fill in your name, email, and project details.");
      return;
    }

    setSubmitState("loading");
    setFeedback("");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || "Message could not be sent.");
      }

      form.reset();
      setSubmitState("success");
      setFeedback("Message sent. I’ll get back to you soon.");
    } catch (error) {
      console.error(error);
      setSubmitState("error");
      setFeedback("The message could not be sent. You can still contact me by email or WhatsApp.");
    }
  };

  return (
    <footer className="border-t border-dashed border-[#111111]/25 bg-background pb-12 pt-24 mt-auto blueprint-grid relative overflow-hidden" id="contact">
      <motion.svg className="absolute bottom-0 right-0 w-96 h-96 text-foreground opacity-[0.08] pointer-events-none" viewBox="0 0 100 100">
        <path d="M 0 100 L 100 0 M 10 100 L 100 10 M 20 100 L 100 20" stroke="currentColor" strokeWidth="2" />
      </motion.svg>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5 space-y-8">
            <h3 className="text-5xl md:text-6xl font-bold font-serif tracking-tight text-[#111111]">Let’s build</h3>
            <p className="text-[#111111] font-semibold max-w-md text-lg leading-relaxed">
              your custom system, tell me about your business, idea, or workflow, and I’ll help turn it into a clear, practical software plan ready to build.
            </p>
            <div className="flex gap-4 pt-6">
              <a href="mailto:abdo.abouelella96@gmail.com" className="w-14 h-14 sketch-border bg-surface flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 text-[#111111] group shadow-sm" aria-label="Email">
                <Mail className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
                <span className="sr-only">Email</span>
              </a>
              <a href="https://www.linkedin.com/in/abdelrahman-abouelella-2bb80a388/" target="_blank" rel="noreferrer" className="w-14 h-14 sketch-border bg-surface flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 text-[#111111] group shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://wa.me/201117739645" target="_blank" rel="noreferrer" className="w-14 h-14 sketch-border bg-surface flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 text-[#111111] group shadow-sm" aria-label="WhatsApp">
                <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="col-span-1 border-l border-dashed border-[#111111]/35 hidden md:block opacity-100"></div>

          <div className="md:col-span-6 bg-surface p-8 lg:p-10 sketch-border shadow-xl shadow-black/10 relative border border-[#111111]/20">
            <div className="absolute -top-3 -left-3 w-12 h-6 bg-[#111111]/20 opacity-100 rotate-[-15deg]"></div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3 relative group">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] hidden">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b-2 border-[#111111]/60 py-4 text-[#111111] placeholder-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-bold text-lg"
                    placeholder="Your Name"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#111111] transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                <div className="space-y-3 relative group">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] hidden">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b-2 border-[#111111]/60 py-4 text-[#111111] placeholder-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-bold text-lg"
                    placeholder="Email Address"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#111111] transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>
              <div className="space-y-3 pt-6 relative group">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] hidden">Project Details</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-[#111111]/60 py-4 text-[#111111] placeholder-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-none font-bold text-lg"
                  placeholder="Tell me about the system you envision..."
                />
                <div className="absolute bottom-[3px] left-0 w-0 h-0.5 bg-[#111111] transition-all duration-300 group-focus-within:w-full"></div>
              </div>
              <div className="pt-8 flex flex-col items-end gap-4">
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="flex items-center gap-4 py-4 px-10 sketch-button-primary text-sm font-bold uppercase tracking-[0.1em] group disabled:opacity-70 disabled:cursor-wait"
                >
                  {submitState === "loading" ? "Sending..." : "Dispatch Contact"}
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                {feedback && (
                  <p className={`text-sm font-bold ${submitState === "success" ? "text-green-700" : "text-red-700"}`}>
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-dashed border-[#111111]/35 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.2em] font-bold text-[#111111] uppercase">
          <p>&copy; {new Date().getFullYear()} Abdelrahman.</p>
          <p>Engineered with Intention.</p>
        </div>
      </div>
    </footer>
  );
}

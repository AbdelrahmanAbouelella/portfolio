import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, ChevronDown } from 'lucide-react';
import { getLocalReply, tryAiReply, type Lang } from '../lib/assistant';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const UI_LANG: Lang = 'en';

interface QuickAction {
  id: string;
  label: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'build', label: 'What does Abdelrahman build?' },
  { id: 'projects', label: 'Show me his main projects.' },
  { id: 'tech', label: 'What technologies does he use?' },
  { id: 'custom', label: 'Can he build a custom system for my business?' },
  { id: 'contact', label: 'How can I contact him?' },
];

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi, I'm Abdelrahman's portfolio assistant. Ask me about what he builds, his projects, his technical skills, his backend and AI work, how to book a meeting, or how to download his CV.",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(false);
    }
  };

  const handleSend = (text: string = inputValue) => {
    const messageText = text.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: messageText }]);
    setInputValue('');
    setIsTyping(true);

    const local = getLocalReply(messageText, UI_LANG);

    const respond = (replyText: string) => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: 'bot', text: replyText },
      ]);
    };

    // Optional AI enrichment (off unless configured via env). The local reply
    // is always the trustworthy default, so the static build keeps working.
    let settled = false;
    const safety = window.setTimeout(() => {
      if (!settled) { settled = true; respond(local.text); }
    }, 2500);

    void tryAiReply(messageText, local.lang).then((ai) => {
      window.clearTimeout(safety);
      if (settled) return;
      settled = true;
      window.setTimeout(() => respond(ai ?? local.text), 450);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="mb-4 mr-2 max-w-[240px] origin-bottom-right"
          >
            <div className="sketch-border bg-background p-4 shadow-xl relative cursor-pointer" onClick={toggleChat}>
              <span className="text-sm font-bold text-foreground leading-snug block">Need help exploring the systems?</span>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-background border-b border-r border-foreground transform rotate-45 z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="sketch-border bg-background shadow-2xl flex flex-col w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] mb-4 overflow-hidden"
          >
            <div className="p-4 border-b-2 border-border bg-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sketch-border bg-background overflow-hidden shrink-0">
                  <img src={asset("judy-avatar.png")} alt="Judy assistant avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-widest">Portfolio Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                     <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-foreground/70 font-bold uppercase tracking-widest">Local smart mode</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground/50 hover:text-foreground transition-colors group"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/30 blueprint-grid relative">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded bg-background border border-border overflow-hidden mr-2 shrink-0 mt-1">
                      <img src={asset("judy-avatar.png")} alt="Judy assistant avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[85%] p-3 text-sm font-medium leading-relaxed whitespace-pre-line ${
                      msg.type === 'user' 
                        ? 'bg-foreground text-background border-2 border-foreground' 
                        : 'bg-background text-foreground border-2 border-border shadow-sm'
                    }`}
                    style={{
                      borderRadius: msg.type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded bg-background border border-border overflow-hidden mr-2 shrink-0 mt-1">
                    <img src={asset("judy-avatar.png")} alt="Assistant avatar" className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="bg-background text-foreground border-2 border-border shadow-sm p-3 flex items-center gap-1"
                    style={{ borderRadius: '12px 12px 12px 0' }}
                    aria-label="Assistant is typing"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-col gap-2 mt-6 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1 ml-8">Suggested questions</span>
                  <div className="flex flex-wrap gap-2 pl-8">
                    {QUICK_ACTIONS.map(action => (
                      <button
                        key={action.id}
                        onClick={() => handleSend(action.label)}
                        className="text-[11px] font-bold tracking-wide uppercase px-3 py-2 bg-background border border-foreground border-dashed text-foreground hover:bg-foreground hover:text-background transition-colors text-left shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t-2 border-border bg-background">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 group"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-surface border-2 border-border focus:border-foreground outline-none px-4 py-3 text-sm font-bold placeholder-foreground/50 transition-colors"
                  />
                  <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-focus-within:w-full"></div>
                </div>
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 flex items-center justify-center bg-foreground text-background hover:bg-surface hover:text-foreground border-2 border-foreground disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-colors group/btn"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 ml-1 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        className="w-16 h-16 rounded-none sketch-button-primary flex items-center justify-center shadow-2xl relative z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open or close chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && showTooltip && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-warm-orange border-2 border-background"></span>
          </span>
        )}
      </motion.button>

    </div>
  );
}

export default ChatbotWidget;
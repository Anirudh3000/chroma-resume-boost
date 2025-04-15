
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, X, Sparkles, MessageSquare, Bot } from "lucide-react";
import { ResumeData } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const AIChatbot = ({ isOpen, onClose, resumeData }: AIChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Hi there! I'm your AI resume assistant. How can I help you craft a standout resume today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { getAiSuggestion } = useAiSuggestion();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Generate AI response
    try {
      const aiResponse = await getAiSuggestion(input);
      
      // Simulate typing delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick prompt suggestions
  const quickPrompts = [
    "How can I improve my work experience section?",
    "Suggest skills for a software developer",
    "Write a professional summary for me",
    "How do I explain employment gaps?",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-full max-w-md z-50"
        >
          <Card className="shadow-xl border-primary/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-purple p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3 text-white">
                  <h3 className="font-medium">AI Resume Assistant</h3>
                  <p className="text-xs text-white/70">Powered by OpenAI & Gemini</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat History */}
            <div className="p-4 h-[350px] overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        message.sender === "user" ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex mb-4">
                  <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="p-2 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 px-2">Try asking:</p>
                <div className="flex flex-wrap gap-2 px-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2 h-auto whitespace-nowrap bg-white"
                      onClick={() => {
                        setInput(prompt);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask for resume writing help..."
                  className="min-h-[60px] resize-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 h-10 w-10 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;

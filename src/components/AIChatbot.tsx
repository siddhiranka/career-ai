import { useState } from 'react';
import { X, Sparkles, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Domain } from '@/types/skillpath';
import { chatQuestionsByDomain, ChatQuestion } from '@/data/chatQuestions';

interface AIChatbotProps {
  domain: Domain;
  username: string;
  isInternshipMode: boolean;
  progress: number;
}

const AIChatbot = ({ domain, username, isInternshipMode, progress }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<ChatQuestion | null>(null);
  const [chatHistory, setChatHistory] = useState<{ question: string; answer: string }[]>([]);

  const questions = chatQuestionsByDomain[domain] || chatQuestionsByDomain['web-development'];
  
  // Filter questions based on progress and internship mode
  const getRelevantQuestions = () => {
    let filtered = questions;
    
    if (isInternshipMode) {
      // Prioritize internship questions
      const internshipFirst = questions.filter(q => q.category === 'internship');
      const others = questions.filter(q => q.category !== 'internship');
      filtered = [...internshipFirst, ...others];
    } else if (progress < 30) {
      // Beginners see basics first
      const basicsFirst = questions.filter(q => q.category === 'basics');
      const others = questions.filter(q => q.category !== 'basics');
      filtered = [...basicsFirst, ...others];
    } else if (progress > 70) {
      // Advanced users see projects and internship
      const advanced = questions.filter(q => q.category === 'projects' || q.category === 'internship');
      const others = questions.filter(q => q.category !== 'projects' && q.category !== 'internship');
      filtered = [...advanced, ...others];
    }
    
    // Remove already asked questions
    const askedIds = chatHistory.map(h => questions.find(q => q.question === h.question)?.id);
    return filtered.filter(q => !askedIds.includes(q.id)).slice(0, 4);
  };

  const handleQuestionClick = (question: ChatQuestion) => {
    setSelectedQuestion(question);
    setChatHistory(prev => [...prev, { question: question.question, answer: question.answer }]);
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setSelectedQuestion(null);
  };

  const relevantQuestions = getRelevantQuestions();

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="hero"
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md z-50 animate-slide-up">
          <div className="glass-card rounded-2xl overflow-hidden border border-border shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-border bg-card/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Mentor</h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {domain.replace('-', ' ')} Expert
                    </p>
                  </div>
                </div>
                {chatHistory.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-80 overflow-y-auto p-4 bg-background/50 space-y-4">
              {/* Welcome message */}
              <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[90%]">
                <p className="text-sm text-foreground">
                  Hi {username}! 👋 I'm your {domain.replace('-', ' ')} mentor. 
                  {isInternshipMode 
                    ? " I'll help you become internship-ready!" 
                    : " Click any question below to learn more!"}
                </p>
              </div>

              {/* Chat history */}
              {chatHistory.map((item, index) => (
                <div key={index} className="space-y-3">
                  {/* User question */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[85%]">
                      <p className="text-sm">{item.question}</p>
                    </div>
                  </div>
                  {/* AI answer */}
                  <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[90%]">
                    <p className="text-sm text-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            <div className="p-4 border-t border-border bg-card/80">
              <p className="text-xs text-muted-foreground mb-3">
                {chatHistory.length > 0 ? 'Ask another question:' : 'Tap a question to get started:'}
              </p>
              <div className="space-y-2">
                {relevantQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(q)}
                    className="w-full text-left p-3 bg-muted/50 hover:bg-muted rounded-lg border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {q.question}
                      </p>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                    </div>
                  </button>
                ))}
                {relevantQuestions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    You've explored all questions! Clear chat to start over.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
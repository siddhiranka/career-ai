import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2,
  MessageCircle,
  X,
  Send,
  ChevronRight
} from 'lucide-react';
import SkillRoadmap from './SkillRoadmap';
import SkillDetail from './SkillDetail';
import { Skill } from '@/types/skillpath';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, roadmapSkills, progress } = useUser();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  if (!user) {
    navigate('/');
    return null;
  }

  const completedSkills = roadmapSkills.filter(s => s.status === 'completed').length;
  const remainingSkills = roadmapSkills.length - completedSkills;
  const activeSkill = roadmapSkills.find(s => s.status === 'active');

  const stats = [
    { 
      icon: TrendingUp, 
      label: 'Progress', 
      value: `${progress}%`,
      color: 'text-primary'
    },
    { 
      icon: CheckCircle2, 
      label: 'Completed', 
      value: completedSkills,
      color: 'text-success'
    },
    { 
      icon: Target, 
      label: 'Remaining', 
      value: remainingSkills,
      color: 'text-warning'
    },
    { 
      icon: Clock, 
      label: 'Est. Days', 
      value: '60-80',
      color: 'text-muted-foreground'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] gradient-glow rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] gradient-glow rounded-full blur-3xl opacity-10" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-4 py-4 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground">SkillPath</span>
              <p className="text-xs text-muted-foreground capitalize">{user.domain.replace('-', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="text-foreground font-medium">{user.username}</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-6 lg:px-8 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Learning Roadmap
            </h1>
            <p className="text-muted-foreground">
              {user.goal === 'internship' || user.goal === 'both' 
                ? 'Focused path to get you internship-ready'
                : 'Master each skill step by step'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="glass-card p-4 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-primary font-semibold">{progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Next Action Card */}
          {activeSkill && (
            <div className="glass-card p-5 rounded-xl mb-8 border-primary/20 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Step</p>
                    <h3 className="font-semibold text-foreground text-lg">{activeSkill.name}</h3>
                    <p className="text-xs text-muted-foreground">{activeSkill.days}</p>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setSelectedSkill(activeSkill)}
                >
                  Start Learning
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Roadmap */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Skill Roadmap</h2>
            <SkillRoadmap 
              skills={roadmapSkills} 
              onSkillClick={setSelectedSkill}
            />
          </div>

          {/* Internship Readiness (if applicable) */}
          {(user.goal === 'internship' || user.goal === 'both') && (
            <div className="glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/20">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Internship Readiness</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ready to apply</span>
                <span className="text-sm font-semibold text-success">{Math.min(progress + 10, 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(progress + 10, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Complete your roadmap and build projects to become fully ready
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetail 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)}
        />
      )}

      {/* AI Chat Button (Mobile Fixed) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="hero"
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] max-w-md z-50 animate-slide-up">
          <div className="glass-card rounded-2xl overflow-hidden border border-border shadow-2xl">
            <div className="p-4 border-b border-border bg-card/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Mentor</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything about your path</p>
                </div>
              </div>
            </div>
            <div className="h-64 p-4 overflow-y-auto bg-background/50">
              <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[85%]">
                <p className="text-sm text-foreground">
                  Hi {user.username}! 👋 I'm your AI mentor. I can help you with:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Explaining concepts simply</li>
                  <li>• Suggesting next steps</li>
                  <li>• Interview preparation</li>
                  <li>• Project ideas</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-card/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="default" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">Coming Soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

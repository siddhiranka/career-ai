import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Calendar,
  Zap,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillRoadmap from './SkillRoadmap';
import SkillDetail from './SkillDetail';
import AIChatbot from './AIChatbot';
import { Skill } from '@/types/skillpath';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, roadmapSkills, progress, topicProgress, estimatedDaysRemaining } = useUser();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  if (!user) {
    navigate('/');
    return null;
  }

  const completedSkills = roadmapSkills.filter(s => s.status === 'completed').length;
  const remainingSkills = roadmapSkills.length - completedSkills;
  const activeSkill = roadmapSkills.find(s => s.status === 'active');
  const isInternshipMode = user.goal === 'internship' || user.goal === 'both';

  // Calculate internship readiness based on topic progress and projects
  const projectSkill = roadmapSkills.find(s => s.name.toLowerCase().includes('project'));
  const projectTopicsCompleted = projectSkill?.microTopics.filter(t => t.completed).length || 0;
  const projectTopicsTotal = projectSkill?.microTopics.length || 1;
  const internshipReadiness = Math.min(
    Math.round((progress * 0.6) + ((projectTopicsCompleted / projectTopicsTotal) * 40)),
    100
  );

  // Determine learning status
  const getStatusMessage = () => {
    if (progress === 0) return { text: 'Ready to begin', color: 'text-muted-foreground' };
    if (progress < 25) return { text: 'Just getting started', color: 'text-warning' };
    if (progress < 50) return { text: 'Building momentum', color: 'text-primary' };
    if (progress < 75) return { text: 'Great progress!', color: 'text-primary' };
    if (progress < 100) return { text: 'Almost there!', color: 'text-success' };
    return { text: 'Complete!', color: 'text-success' };
  };

  const status = getStatusMessage();

  const stats = [
    { 
      icon: TrendingUp, 
      label: 'Progress', 
      value: `${progress}%`,
      subtext: `${topicProgress.completed}/${topicProgress.total} topics`,
      color: 'text-primary'
    },
    { 
      icon: CheckCircle2, 
      label: 'Completed', 
      value: completedSkills,
      subtext: `${remainingSkills} remaining`,
      color: 'text-success'
    },
    { 
      icon: Calendar, 
      label: 'Days Left', 
      value: estimatedDaysRemaining,
      subtext: 'estimated',
      color: 'text-warning'
    },
    { 
      icon: Zap, 
      label: 'Status', 
      value: status.text,
      subtext: '',
      color: status.color
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
              {isInternshipMode 
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
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    {stat.subtext && (
                      <p className="text-xs text-muted-foreground/70">{stat.subtext}</p>
                    )}
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
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {topicProgress.completed} topics completed
              </span>
              <span className="text-xs text-muted-foreground">
                {topicProgress.total - topicProgress.completed} remaining
              </span>
            </div>
          </div>

          {/* Next Action Card */}
          {activeSkill && (
            <div className="glass-card p-5 rounded-xl mb-8 border-primary/20 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Step</p>
                    <h3 className="font-semibold text-foreground text-lg">{activeSkill.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeSkill.microTopics.filter(t => t.completed).length}/{activeSkill.microTopics.length} topics • {activeSkill.days}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setSelectedSkill(activeSkill)}
                >
                  Continue
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

          {/* Dashboard Analysis Section */}
          <div className="glass-card p-5 rounded-xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Learning Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{completedSkills}/{roadmapSkills.length}</p>
                <p className="text-sm text-muted-foreground">Skills completed</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{estimatedDaysRemaining}</p>
                <p className="text-sm text-muted-foreground">Days to complete</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className={`text-2xl font-bold ${progress >= 50 ? 'text-success' : 'text-warning'}`}>
                  {progress >= 75 ? 'On Track' : progress >= 50 ? 'Good Progress' : 'Keep Going'}
                </p>
                <p className="text-sm text-muted-foreground">Current status</p>
              </div>
            </div>
            {progress > 0 && progress < 100 && (
              <p className="text-sm text-muted-foreground mt-4">
                💡 {progress < 30 
                  ? "Focus on completing one skill at a time. Consistency beats speed!"
                  : progress < 70
                  ? "You're building solid foundations. Keep the momentum going!"
                  : "Almost there! Consider starting on projects to solidify your learning."}
              </p>
            )}
          </div>

          {/* Internship Readiness (if applicable) */}
          {isInternshipMode && (
            <div className="glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/20">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Internship Readiness</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ready to apply</span>
                <span className="text-sm font-semibold text-success">{internshipReadiness}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-all duration-500 rounded-full"
                  style={{ width: `${internshipReadiness}%` }}
                />
              </div>
              
              {/* Checklist */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${progress >= 30 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${progress >= 30 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Core skills foundation (30%+ progress)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${progress >= 60 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${progress >= 60 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Advanced skills coverage (60%+ progress)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${projectTopicsCompleted > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${projectTopicsCompleted > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Portfolio projects ({projectTopicsCompleted}/{projectTopicsTotal} completed)
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {internshipReadiness < 50 
                  ? "Complete more topics and start building projects to become internship-ready"
                  : internshipReadiness < 80
                  ? "Good progress! Focus on completing projects to stand out in applications"
                  : "You're ready to start applying! Make sure your portfolio showcases your projects"}
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

      {/* AI Chatbot */}
      <AIChatbot 
        domain={user.domain}
        username={user.username}
        isInternshipMode={isInternshipMode}
        progress={progress}
      />
    </div>
  );
};

export default Dashboard;
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Award,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillRoadmap from './SkillRoadmap';
import SkillDetail from './SkillDetail';
import AIChatbot from './AIChatbot';
import CircularProgress from './CircularProgress';
import SkillRadarChart from './SkillRadarChart';
import SkillHealthAnalysis from './SkillHealthAnalysis';
import WeakAreaFocus from './WeakAreaFocus';
import AIInsightCard from './AIInsightCard';
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
  const activeSkill = roadmapSkills.find(s => s.status === 'active');
  const isInternshipMode = user.goal === 'internship' || user.goal === 'both';

  // Calculate internship readiness
  const projectSkill = roadmapSkills.find(s => s.name.toLowerCase().includes('project'));
  const projectTopicsCompleted = projectSkill?.microTopics.filter(t => t.completed).length || 0;
  const projectTopicsTotal = projectSkill?.microTopics.length || 1;
  const internshipReadiness = Math.min(
    Math.round((progress * 0.6) + ((projectTopicsCompleted / projectTopicsTotal) * 40)),
    100
  );

  // Get mode badge
  const getModeLabel = () => {
    switch (user.goal) {
      case 'internship': return 'Internship Track';
      case 'both': return 'Learning + Internship';
      default: return 'Learning Track';
    }
  };

  // Get strong skills for showcase
  const strongSkills = roadmapSkills.filter(skill => {
    const completed = skill.microTopics.filter(t => t.completed).length;
    const total = skill.microTopics.length;
    return total > 0 && (completed / total) >= 0.7;
  });

  return (
    <div className="min-h-screen gradient-bg">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] gradient-glow rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] gradient-glow rounded-full blur-3xl opacity-15" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] gradient-glow rounded-full blur-3xl opacity-10" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-4 py-4 lg:px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-primary" />
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
          
          {/* Welcome + Status Header */}
          <div className="glass-card p-6 rounded-2xl mb-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: User Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                    Welcome back, {user.username}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground capitalize">
                      {user.domain.replace('-', ' ')}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      {getModeLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Progress Ring + Days */}
              <div className="flex items-center gap-6">
                <CircularProgress progress={progress} size={100} strokeWidth={8} />
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{estimatedDaysRemaining}</p>
                  <p className="text-sm text-muted-foreground">days left</p>
                </div>
              </div>
            </div>

            {/* Progress summary text */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                You've completed <span className="text-primary font-semibold">{topicProgress.completed}</span> out of <span className="text-foreground font-semibold">{topicProgress.total}</span> topics. 
                {progress < 100 ? " Keep going — consistency matters!" : " Amazing work!"}
              </p>
            </div>
          </div>

          {/* Next Action Card */}
          {activeSkill && (
            <div className="glass-card p-5 rounded-2xl mb-6 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
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
                  onClick={() => setSelectedSkill(activeSkill)}
                  className="w-full sm:w-auto"
                >
                  Continue Learning
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Skill Health Analysis */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SkillHealthAnalysis 
              skills={roadmapSkills} 
              onSkillClick={setSelectedSkill} 
            />
          </div>

          {/* Radar Chart + Weak Area Focus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <SkillRadarChart skills={roadmapSkills} />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <WeakAreaFocus skills={roadmapSkills} onStartSkill={setSelectedSkill} />
            </div>
          </div>

          {/* Strength Showcase */}
          {strongSkills.length > 0 && (
            <div className="glass-card p-5 rounded-2xl mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-success/20">
                  <Trophy className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">You're Doing Great At</h3>
                  <p className="text-xs text-muted-foreground">Skills with 70%+ completion</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {strongSkills.map((skill) => (
                  <div 
                    key={skill.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/30 glow-success"
                  >
                    <Award className="w-4 h-4 text-success" />
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {strongSkills.length === 1 
                  ? `Your strength in ${strongSkills[0].name} will help you move faster in related topics.`
                  : `These ${strongSkills.length} strong skills form a solid foundation for your journey.`}
              </p>
            </div>
          )}

          {/* AI Insights */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <AIInsightCard 
              skills={roadmapSkills}
              progress={progress}
              estimatedDaysRemaining={estimatedDaysRemaining}
              isInternshipMode={isInternshipMode}
            />
          </div>

          {/* Roadmap */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Skill Roadmap</h2>
            <SkillRoadmap 
              skills={roadmapSkills} 
              onSkillClick={setSelectedSkill}
            />
          </div>

          {/* Internship Readiness (if applicable) */}
          {isInternshipMode && (
            <div className="glass-card p-5 rounded-2xl animate-fade-in" style={{ animationDelay: '0.55s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-success/20 glow-success">
                  <Target className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Internship Readiness</h3>
                  <p className="text-xs text-muted-foreground">Your apply-ready score</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Ready to apply</span>
                <span className="text-lg font-bold text-success">{internshipReadiness}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-success transition-all duration-500 rounded-full"
                  style={{ 
                    width: `${internshipReadiness}%`,
                    boxShadow: '0 0 20px hsl(var(--success) / 0.5)'
                  }}
                />
              </div>
              
              {/* Checklist */}
              <div className="space-y-2 mb-4">
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

              <p className="text-xs text-muted-foreground">
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
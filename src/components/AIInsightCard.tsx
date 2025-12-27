import { Skill } from '@/types/skillpath';
import { Sparkles, Lightbulb } from 'lucide-react';

interface AIInsightCardProps {
  skills: Skill[];
  progress: number;
  estimatedDaysRemaining: number;
  isInternshipMode: boolean;
}

const AIInsightCard = ({ 
  skills, 
  progress, 
  estimatedDaysRemaining,
  isInternshipMode 
}: AIInsightCardProps) => {
  // Calculate skill strengths
  const skillsWithProgress = skills.map((skill) => {
    const completedTopics = skill.microTopics.filter(t => t.completed).length;
    const totalTopics = skill.microTopics.length;
    return {
      name: skill.name,
      progress: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
    };
  });

  const strongestSkill = skillsWithProgress.reduce((a, b) => a.progress > b.progress ? a : b);
  const weakestSkill = skillsWithProgress.reduce((a, b) => a.progress < b.progress ? a : b);

  // Generate dynamic insights
  const insights: string[] = [];

  // Progress-based insight
  if (progress === 0) {
    insights.push("Start your first topic today! Even 15 minutes of learning builds momentum.");
  } else if (progress < 25) {
    insights.push("You're building the foundation. Consistency is more important than speed.");
  } else if (progress < 50) {
    insights.push("Great momentum! You're nearly halfway through your learning journey.");
  } else if (progress < 75) {
    insights.push("Impressive progress! Consider starting practical projects soon.");
  } else {
    insights.push("You're in the final stretch! Focus on completing projects to solidify your skills.");
  }

  // Strength/weakness insight
  if (strongestSkill.progress > 0 && weakestSkill.name !== strongestSkill.name) {
    insights.push(
      `You're strongest in ${strongestSkill.name} (${strongestSkill.progress}%). This foundation will help you with advanced topics.`
    );
  }

  // Time estimate insight
  if (isInternshipMode && estimatedDaysRemaining > 0) {
    insights.push(
      `At your current pace, you'll be internship-ready in approximately ${estimatedDaysRemaining} days.`
    );
  } else if (estimatedDaysRemaining > 0) {
    insights.push(
      `Estimated ${estimatedDaysRemaining} days to complete your roadmap at current pace.`
    );
  }

  // Actionable suggestion
  if (weakestSkill.progress < 30 && weakestSkill.name !== strongestSkill.name) {
    insights.push(
      `Tip: Focusing on ${weakestSkill.name} would significantly improve your overall readiness.`
    );
  }

  return (
    <div className="glass-card p-5 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/20 glow-primary">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Insights</h3>
          <p className="text-xs text-muted-foreground">Personalized learning analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.slice(0, 3).map((insight, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
          >
            <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/90 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightCard;
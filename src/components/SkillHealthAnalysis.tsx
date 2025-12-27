import { Skill } from '@/types/skillpath';
import { TrendingUp, Minus, TrendingDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface SkillHealthAnalysisProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
}

interface SkillWithProgress extends Skill {
  progressPercent: number;
}

const SkillHealthAnalysis = ({ skills, onSkillClick }: SkillHealthAnalysisProps) => {
  // Calculate progress for each skill
  const skillsWithProgress: SkillWithProgress[] = skills.map((skill) => {
    const completedTopics = skill.microTopics.filter(t => t.completed).length;
    const totalTopics = skill.microTopics.length;
    const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    return { ...skill, progressPercent };
  });

  // Categorize skills
  const strongSkills = skillsWithProgress.filter(s => s.progressPercent >= 70);
  const improvingSkills = skillsWithProgress.filter(s => s.progressPercent >= 40 && s.progressPercent < 70);
  const weakSkills = skillsWithProgress.filter(s => s.progressPercent < 40 && s.status !== 'completed');

  const SkillCard = ({ 
    skill, 
    type 
  }: { 
    skill: SkillWithProgress; 
    type: 'strong' | 'improving' | 'weak' 
  }) => {
    const colors = {
      strong: {
        bg: 'bg-success/10',
        border: 'border-success/30',
        glow: 'hover:shadow-[0_0_20px_hsl(var(--success)/0.2)]',
        badge: 'bg-success/20 text-success',
        icon: TrendingUp,
      },
      improving: {
        bg: 'bg-warning/10',
        border: 'border-warning/30',
        glow: 'hover:shadow-[0_0_20px_hsl(var(--warning)/0.2)]',
        badge: 'bg-warning/20 text-warning',
        icon: Minus,
      },
      weak: {
        bg: 'bg-error/10',
        border: 'border-error/30',
        glow: 'hover:shadow-[0_0_20px_hsl(var(--error)/0.2)]',
        badge: 'bg-error/20 text-error',
        icon: TrendingDown,
      },
    };

    const config = colors[type];
    const Icon = config.icon;

    return (
      <button
        onClick={() => onSkillClick(skill)}
        className={`w-full p-3 rounded-xl ${config.bg} border ${config.border} ${config.glow} transition-all duration-300 text-left group`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${config.badge}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{skill.name}</p>
              <p className="text-xs text-muted-foreground">
                {skill.microTopics.filter(t => t.completed).length}/{skill.microTopics.length} topics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${config.badge.split(' ')[1]}`}>
              {skill.progressPercent}%
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </button>
    );
  };

  const Column = ({ 
    title, 
    skills, 
    type, 
    icon: Icon,
    emptyText 
  }: { 
    title: string; 
    skills: SkillWithProgress[]; 
    type: 'strong' | 'improving' | 'weak';
    icon: React.ElementType;
    emptyText: string;
  }) => {
    const colors = {
      strong: 'text-success',
      improving: 'text-warning',
      weak: 'text-error',
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${colors[type]}`} />
          <h4 className="font-semibold text-foreground">{title}</h4>
          <span className="text-xs text-muted-foreground">({skills.length})</span>
        </div>
        <div className="space-y-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} type={type} />
            ))
          ) : (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground text-center">{emptyText}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-5 rounded-2xl">
      <h3 className="font-semibold text-foreground mb-5 text-lg">Skill Health Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column 
          title="Strong Skills" 
          skills={strongSkills} 
          type="strong"
          icon={TrendingUp}
          emptyText="Complete topics to build strong skills"
        />
        <Column 
          title="Improving" 
          skills={improvingSkills} 
          type="improving"
          icon={Minus}
          emptyText="Skills in progress will appear here"
        />
        <Column 
          title="Needs Focus" 
          skills={weakSkills} 
          type="weak"
          icon={TrendingDown}
          emptyText="Great job! No weak areas"
        />
      </div>
    </div>
  );
};

export default SkillHealthAnalysis;
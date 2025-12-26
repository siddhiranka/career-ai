import { Skill } from '@/types/skillpath';
import { Check } from 'lucide-react';
import * as Icons from 'lucide-react';

interface SkillRoadmapProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
}

const SkillRoadmap = ({ skills, onSkillClick }: SkillRoadmapProps) => {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="glass-card p-6 rounded-2xl overflow-x-auto">
      <div className="flex items-center gap-4 min-w-max pb-4">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center">
            {/* Skill Node */}
            <button
              onClick={() => onSkillClick(skill)}
              className={`
                relative flex flex-col items-center gap-3 transition-all duration-300
                hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                rounded-full
              `}
            >
              {/* Node Circle */}
              <div
                className={`
                  w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${skill.status === 'completed' 
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : skill.status === 'active'
                    ? 'bg-primary/20 border-primary text-primary animate-pulse shadow-lg shadow-primary/20'
                    : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                  }
                `}
              >
                {skill.status === 'completed' ? (
                  <Check className="w-8 h-8" />
                ) : (
                  getIcon(skill.icon)
                )}
              </div>

              {/* Label */}
              <div className="text-center w-24">
                <p className={`text-sm font-medium ${
                  skill.status === 'completed' 
                    ? 'text-primary' 
                    : skill.status === 'active'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}>
                  {skill.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{skill.days}</p>
              </div>

              {/* Status Badge */}
              {skill.status === 'active' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-ping" />
                </div>
              )}
            </button>

            {/* Connector Line */}
            {index < skills.length - 1 && (
              <div className="flex items-center mx-2">
                <div
                  className={`w-12 h-1 rounded-full transition-all duration-500 ${
                    skills[index + 1].status === 'completed' || skills[index + 1].status === 'active'
                      ? 'bg-primary'
                      : 'bg-border'
                  }`}
                />
                <div
                  className={`w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent transition-all duration-500 ${
                    skills[index + 1].status === 'completed' || skills[index + 1].status === 'active'
                      ? 'border-l-primary'
                      : 'border-l-border'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll hint for mobile */}
      <p className="text-xs text-muted-foreground text-center mt-4 lg:hidden">
        ← Scroll to see more →
      </p>
    </div>
  );
};

export default SkillRoadmap;

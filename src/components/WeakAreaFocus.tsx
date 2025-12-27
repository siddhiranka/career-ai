import { Skill } from '@/types/skillpath';
import { AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface WeakAreaFocusProps {
  skills: Skill[];
  onStartSkill: (skill: Skill) => void;
}

const WeakAreaFocus = ({ skills, onStartSkill }: WeakAreaFocusProps) => {
  // Find the weakest skill that's not completed
  const skillsWithProgress = skills
    .filter(s => s.status !== 'completed')
    .map((skill) => {
      const completedTopics = skill.microTopics.filter(t => t.completed).length;
      const totalTopics = skill.microTopics.length;
      const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
      const missingTopics = skill.microTopics.filter(t => !t.completed);
      return { ...skill, progressPercent, missingTopics };
    })
    .filter(s => s.progressPercent < 40)
    .sort((a, b) => a.progressPercent - b.progressPercent);

  const weakestSkill = skillsWithProgress[0];

  if (!weakestSkill) {
    return null;
  }

  // Estimate days to improve
  const daysMatch = weakestSkill.days.match(/(\d+)-(\d+)/);
  const avgDays = daysMatch 
    ? Math.ceil((parseInt(daysMatch[1]) + parseInt(daysMatch[2])) / 2 * (1 - weakestSkill.progressPercent / 100))
    : 7;

  return (
    <div className="glass-card p-5 rounded-2xl border border-warning/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Focus Area to Improve</h3>
          <p className="text-xs text-muted-foreground">This skill needs your attention</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-warning/5 border border-warning/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">{weakestSkill.name}</h4>
          <span className="text-sm font-semibold text-warning">{weakestSkill.progressPercent}%</span>
        </div>

        {/* Missing topics preview */}
        <div className="space-y-1.5 mb-4">
          <p className="text-xs text-muted-foreground mb-2">Missing topics:</p>
          {weakestSkill.missingTopics.slice(0, 3).map((topic, i) => (
            <div key={topic.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-warning/50" />
              <span>{topic.title}</span>
            </div>
          ))}
          {weakestSkill.missingTopics.length > 3 && (
            <p className="text-xs text-muted-foreground pl-3.5">
              +{weakestSkill.missingTopics.length - 3} more topics
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>~{avgDays} days to complete</span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={() => onStartSkill(weakestSkill)}
      >
        Start This Now
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default WeakAreaFocus;
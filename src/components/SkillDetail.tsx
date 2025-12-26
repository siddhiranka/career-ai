import { Skill } from '@/types/skillpath';
import { Button } from '@/components/ui/button';
import { X, Clock, CheckCircle2, Check } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import * as Icons from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetail = ({ skill, onClose }: SkillDetailProps) => {
  const { toggleTopic, roadmapSkills } = useUser();
  const { toast } = useToast();

  // Get the current skill from context to have updated topic states
  const currentSkill = roadmapSkills.find((s) => s.id === skill.id) || skill;
  const completedCount = currentSkill.microTopics.filter((t) => t.completed).length;
  const totalCount = currentSkill.microTopics.length;
  const skillProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  const handleToggleTopic = (topicId: string, topicTitle: string, wasCompleted: boolean) => {
    toggleTopic(currentSkill.id, topicId);
    
    if (!wasCompleted) {
      toast({
        title: `Topic completed!`,
        description: topicTitle,
      });
    }

    // Check if all topics are now completed
    const updatedCompletedCount = wasCompleted ? completedCount - 1 : completedCount + 1;
    if (updatedCompletedCount === totalCount) {
      toast({
        title: `${currentSkill.name} completed!`,
        description: "Great job! Keep up the momentum.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              currentSkill.status === 'completed' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-primary/20 text-primary'
            }`}>
              {currentSkill.status === 'completed' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                getIcon(currentSkill.icon)
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentSkill.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{currentSkill.days}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Skill Progress</span>
            <span className="text-sm text-primary font-semibold">{completedCount}/{totalCount} topics</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
              style={{ width: `${skillProgress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Topics to Cover
          </h3>
          <div className="space-y-3">
            {currentSkill.microTopics.map((topic, index) => (
              <div
                key={topic.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer hover:border-primary/50 ${
                  topic.completed 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-muted/50 border-border/50'
                }`}
                onClick={() => handleToggleTopic(topic.id, topic.title, !!topic.completed)}
              >
                <div className="mt-0.5">
                  <Checkbox
                    checked={!!topic.completed}
                    onCheckedChange={() => handleToggleTopic(topic.id, topic.title, !!topic.completed)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${topic.completed ? 'text-primary line-through' : 'text-foreground'}`}>
                    {topic.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {index + 1}/{totalCount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-6">
          {currentSkill.status === 'completed' || completedCount === totalCount ? (
            <div className="flex items-center justify-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">All topics completed!</span>
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-sm">
              Complete all topics to mark this skill as done
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
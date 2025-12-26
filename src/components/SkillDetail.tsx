import { Skill } from '@/types/skillpath';
import { Button } from '@/components/ui/button';
import { X, Clock, CheckCircle2, Circle, Check } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import * as Icons from 'lucide-react';

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetail = ({ skill, onClose }: SkillDetailProps) => {
  const { completeSkill } = useUser();
  const { toast } = useToast();

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  const handleComplete = () => {
    completeSkill(skill.id);
    toast({
      title: `${skill.name} completed!`,
      description: "Great job! Keep up the momentum.",
    });
    onClose();
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
              skill.status === 'completed' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-primary/20 text-primary'
            }`}>
              {skill.status === 'completed' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                getIcon(skill.icon)
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{skill.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{skill.days}</span>
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

        {/* Content */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Topics to Cover
          </h3>
          <div className="space-y-3">
            {skill.microTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="mt-0.5">
                  {skill.status === 'completed' ? (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{topic.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {index + 1}/{skill.microTopics.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-6">
          {skill.status === 'completed' ? (
            <div className="flex items-center justify-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Completed</span>
            </div>
          ) : (
            <Button
              variant="success"
              size="lg"
              className="w-full"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-5 h-5" />
              Mark as Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;

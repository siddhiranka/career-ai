import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { DOMAINS, SKILLS_BY_DOMAIN, Domain, EducationLevel, GoalType } from '@/types/skillpath';
import { getRoadmapByDomain } from '@/data/roadmaps';
import { useToast } from '@/hooks/use-toast';
import * as Icons from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, setUser, setRoadmapSkills } = useUser();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [education, setEducation] = useState<EducationLevel | null>(null);
  const [goal, setGoal] = useState<GoalType | null>(null);
  const [domain, setDomain] = useState<Domain | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const totalSteps = 4;

  const educationOptions = [
    { id: 'student', label: 'Student', description: 'Currently in school or college' },
    { id: 'graduate', label: 'Graduate', description: 'Recently completed education' },
    { id: 'working', label: 'Working Professional', description: 'Already in the workforce' },
  ];

  const goalOptions = [
    { id: 'learning', label: 'Learning', description: 'Focus on building skills' },
    { id: 'internship', label: 'Internship', description: 'Prepare for internship applications' },
    { id: 'both', label: 'Both', description: 'Learn skills and prepare for internships' },
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return education !== null;
      case 2:
        return goal !== null;
      case 3:
        return domain !== null;
      case 4:
        return selectedSkills.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      if (user && domain && education && goal) {
        const roadmap = getRoadmapByDomain(domain);
        setUser({
          ...user,
          education,
          goal,
          domain,
          skills: selectedSkills,
        });
        setRoadmapSkills(roadmap.skills);
        
        toast({
          title: 'SkillPath generated!',
          description: 'Your personalized learning roadmap is ready.',
        });
        
        navigate('/dashboard');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/auth');
    }
  };

  const toggleSkill = (skill: string) => {
    if (skill === 'None / Just Starting') {
      setSelectedSkills(['None / Just Starting']);
    } else {
      setSelectedSkills((prev) => {
        const filtered = prev.filter((s) => s !== 'None / Just Starting');
        if (prev.includes(skill)) {
          return filtered.filter((s) => s !== skill);
        }
        return [...filtered, skill];
      });
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 gradient-glow rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8 rounded-2xl">
          {/* Step 1: Education */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">What's your current status?</h2>
                <p className="text-muted-foreground">This helps us personalize your learning path</p>
              </div>
              <div className="grid gap-4">
                {educationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setEducation(option.id as EducationLevel)}
                    className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      education === option.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      {education === option.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">What's your main goal?</h2>
                <p className="text-muted-foreground">We'll optimize your roadmap accordingly</p>
              </div>
              <div className="grid gap-4">
                {goalOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setGoal(option.id as GoalType)}
                    className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      goal === option.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      {goal === option.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Domain */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose your domain</h2>
                <p className="text-muted-foreground">Select the field you want to master</p>
              </div>
              <div className="grid gap-4">
                {DOMAINS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDomain(d.id as Domain)}
                    className={`p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      domain === d.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        domain === d.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {getIcon(d.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{d.name}</h3>
                        <p className="text-sm text-muted-foreground">{d.description}</p>
                      </div>
                      {domain === d.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Skills */}
          {step === 4 && domain && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">What skills do you know?</h2>
                <p className="text-muted-foreground">Select all that apply, or choose "None" if you're just starting</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {SKILLS_BY_DOMAIN[domain].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2.5 rounded-full border-2 font-medium transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-foreground hover:border-primary/50'
                    }`}
                  >
                    {selectedSkills.includes(skill) && <Check className="w-4 h-4 inline mr-2" />}
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-end">
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
              className="min-w-[200px]"
            >
              {step === totalSteps ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My SkillPath
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

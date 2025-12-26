import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Visual Roadmaps',
      description: 'See your entire learning path laid out beautifully',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Guidance',
      description: 'Get personalized recommendations based on your goals',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your journey with detailed analytics',
    },
    {
      icon: Users,
      title: 'Internship Ready',
      description: 'Build the skills that employers are looking for',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-glow rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-glow rounded-full blur-3xl opacity-20" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 px-4 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillPath</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Career Guidance</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
            Your Journey to{' '}
            <span className="text-gradient">Tech Mastery</span>
            {' '}Starts Here
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Transform your career goals into a clear, actionable roadmap. Learn the right skills, 
            build real projects, and become internship-ready with AI guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of learners who transformed their careers with SkillPath
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/auth')}>
              Create Your SkillPath
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SkillPath</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SkillPath. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

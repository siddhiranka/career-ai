import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const validations = {
    username: form.username.trim().length >= 2,
    email: form.email.length >= 13 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: form.password.length >= 6,
  };

  const isFormValid = validations.username && validations.email && validations.password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setUser({
      username: form.username,
      email: form.email,
      education: 'student',
      goal: 'learning',
      domain: 'web-development',
      skills: [],
    });

    toast({
      title: 'Account created!',
      description: "Let's set up your learning path.",
    });

    navigate('/onboarding');
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldStatus = (field: keyof typeof validations) => {
    if (!touched[field]) return 'idle';
    return validations[field] ? 'valid' : 'invalid';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 gradient-glow rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        {/* Card */}
        <div className="glass-card p-8 rounded-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your journey to tech mastery</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                  onBlur={() => handleBlur('username')}
                  className={`pr-10 ${
                    getFieldStatus('username') === 'valid'
                      ? 'border-success focus-visible:ring-success'
                      : getFieldStatus('username') === 'invalid'
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }`}
                />
                {getFieldStatus('username') === 'valid' && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                )}
              </div>
              {getFieldStatus('username') === 'invalid' && (
                <p className="text-sm text-destructive">Username must be at least 2 characters</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  onBlur={() => handleBlur('email')}
                  className={`pr-10 ${
                    getFieldStatus('email') === 'valid'
                      ? 'border-success focus-visible:ring-success'
                      : getFieldStatus('email') === 'invalid'
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }`}
                />
                {getFieldStatus('email') === 'valid' && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                )}
              </div>
              {getFieldStatus('email') === 'invalid' && (
                <p className="text-sm text-destructive">Please enter a valid email (13+ characters)</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  onBlur={() => handleBlur('password')}
                  className={`pr-20 ${
                    getFieldStatus('password') === 'valid'
                      ? 'border-success focus-visible:ring-success'
                      : getFieldStatus('password') === 'invalid'
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {getFieldStatus('password') === 'valid' && (
                    <Check className="w-5 h-5 text-success" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {getFieldStatus('password') === 'invalid' && (
                <p className="text-sm text-destructive">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={!isFormValid}
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <button className="text-primary hover:underline font-medium">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

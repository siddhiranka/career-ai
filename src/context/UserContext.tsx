import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, EducationLevel, GoalType, Domain, Skill } from '@/types/skillpath';
import { getRoadmapByDomain } from '@/data/roadmaps';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  roadmapSkills: Skill[];
  setRoadmapSkills: (skills: Skill[]) => void;
  completeSkill: (skillId: string) => void;
  setActiveSkill: (skillId: string) => void;
  toggleTopic: (skillId: string, topicId: string) => void;
  progress: number;
  topicProgress: { completed: number; total: number };
  estimatedDaysRemaining: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [roadmapSkills, setRoadmapSkills] = useState<Skill[]>([]);

  const isAuthenticated = user !== null;

  const completeSkill = (skillId: string) => {
    setRoadmapSkills((prev) => {
      const updatedSkills = prev.map((skill, index) => {
        if (skill.id === skillId) {
          return { ...skill, status: 'completed' as const };
        }
        return skill;
      });
      
      // Set next skill as active
      const completedIndex = updatedSkills.findIndex(s => s.id === skillId);
      if (completedIndex < updatedSkills.length - 1 && updatedSkills[completedIndex + 1].status === 'pending') {
        updatedSkills[completedIndex + 1] = { ...updatedSkills[completedIndex + 1], status: 'active' as const };
      }
      
      return updatedSkills;
    });
  };

  const setActiveSkill = (skillId: string) => {
    setRoadmapSkills((prev) =>
      prev.map((skill) => ({
        ...skill,
        status: skill.id === skillId ? 'active' : skill.status === 'active' ? 'pending' : skill.status,
      }))
    );
  };

  const toggleTopic = (skillId: string, topicId: string) => {
    setRoadmapSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === skillId) {
          const updatedTopics = skill.microTopics.map((topic) =>
            topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
          );
          const allCompleted = updatedTopics.every((t) => t.completed);
          return {
            ...skill,
            microTopics: updatedTopics,
            status: allCompleted ? 'completed' : skill.status,
          };
        }
        return skill;
      })
    );
  };

  // Calculate topic-based progress
  const topicProgress = roadmapSkills.reduce(
    (acc, skill) => ({
      completed: acc.completed + skill.microTopics.filter((t) => t.completed).length,
      total: acc.total + skill.microTopics.length,
    }),
    { completed: 0, total: 0 }
  );

  const progress = topicProgress.total > 0
    ? Math.round((topicProgress.completed / topicProgress.total) * 100)
    : 0;

  // Calculate estimated days remaining
  const estimatedDaysRemaining = roadmapSkills.reduce((acc, skill) => {
    if (skill.status === 'completed') return acc;
    const completedTopics = skill.microTopics.filter((t) => t.completed).length;
    const totalTopics = skill.microTopics.length;
    const remainingRatio = totalTopics > 0 ? (totalTopics - completedTopics) / totalTopics : 1;
    const daysMatch = skill.days.match(/(\d+)-(\d+)/);
    if (daysMatch) {
      const avgDays = (parseInt(daysMatch[1]) + parseInt(daysMatch[2])) / 2;
      return acc + Math.ceil(avgDays * remainingRatio);
    }
    return acc;
  }, 0);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        roadmapSkills,
        setRoadmapSkills,
        completeSkill,
        setActiveSkill,
        toggleTopic,
        progress,
        topicProgress,
        estimatedDaysRemaining,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

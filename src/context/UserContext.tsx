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
  progress: number;
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

  const progress = roadmapSkills.length > 0
    ? Math.round((roadmapSkills.filter(s => s.status === 'completed').length / roadmapSkills.length) * 100)
    : 0;

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
        progress,
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

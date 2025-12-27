import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Skill } from '@/types/skillpath';

interface SkillRadarChartProps {
  skills: Skill[];
}

const SkillRadarChart = ({ skills }: SkillRadarChartProps) => {
  // Calculate completion percentage for each skill
  const data = skills.slice(0, 6).map((skill) => {
    const completedTopics = skill.microTopics.filter(t => t.completed).length;
    const totalTopics = skill.microTopics.length;
    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    
    // Truncate long names
    const shortName = skill.name.length > 12 
      ? skill.name.substring(0, 10) + '...' 
      : skill.name;
    
    return {
      skill: shortName,
      fullName: skill.name,
      value: percentage,
      fullMark: 100,
    };
  });

  return (
    <div className="glass-card p-5 rounded-2xl">
      <h3 className="font-semibold text-foreground mb-4 text-lg">Skill Strength Map</h3>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.5}
            />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ 
                fill: 'hsl(var(--muted-foreground))', 
                fontSize: 11,
              }}
              tickLine={false}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: 'hsl(var(--primary))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Areas closer to the edge are your strengths
      </p>
    </div>
  );
};

export default SkillRadarChart;
import { Roadmap } from '@/types/skillpath';

export const webDevelopmentRoadmap: Roadmap = {
  domain: 'web-development',
  title: 'Web Development',
  skills: [
    {
      id: 'html',
      name: 'HTML',
      icon: 'FileCode',
      days: '7-10 Days',
      status: 'active',
      microTopics: [
        { id: 'html-1', title: 'What HTML is', description: 'Understanding the basics of HTML markup language' },
        { id: 'html-2', title: 'Browser rendering', description: 'How browsers interpret and display HTML' },
        { id: 'html-3', title: 'Document structure', description: 'Head, body, and essential elements' },
        { id: 'html-4', title: 'Text, links, images', description: 'Core content elements' },
        { id: 'html-5', title: 'Lists & tables', description: 'Organizing data effectively' },
        { id: 'html-6', title: 'Forms & inputs', description: 'User interaction elements' },
        { id: 'html-7', title: 'Semantic tags', description: 'Header, nav, main, article, footer' },
        { id: 'html-8', title: 'Accessibility basics', description: 'ARIA and screen reader support' },
        { id: 'html-9', title: 'Best practices', description: 'Clean, maintainable HTML' },
      ],
    },
    {
      id: 'css',
      name: 'CSS',
      icon: 'Palette',
      days: '10-14 Days',
      status: 'pending',
      microTopics: [
        { id: 'css-1', title: 'Syntax & selectors', description: 'CSS rules and targeting elements' },
        { id: 'css-2', title: 'Colors & fonts', description: 'Typography and color systems' },
        { id: 'css-3', title: 'Box model', description: 'Margin, padding, border' },
        { id: 'css-4', title: 'Flexbox', description: 'One-dimensional layouts' },
        { id: 'css-5', title: 'Grid', description: 'Two-dimensional layouts' },
        { id: 'css-6', title: 'Responsive design', description: 'Mobile-first approach' },
        { id: 'css-7', title: 'Media queries', description: 'Breakpoints and adaptations' },
        { id: 'css-8', title: 'Animations', description: 'Transitions and keyframes' },
      ],
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: 'Braces',
      days: '15-20 Days',
      status: 'pending',
      microTopics: [
        { id: 'js-1', title: 'Variables & data types', description: 'let, const, primitives' },
        { id: 'js-2', title: 'Conditions & loops', description: 'if/else, for, while' },
        { id: 'js-3', title: 'Functions', description: 'Declaration, arrow, callbacks' },
        { id: 'js-4', title: 'Arrays & objects', description: 'Data structures and methods' },
        { id: 'js-5', title: 'DOM manipulation', description: 'Selecting and modifying elements' },
        { id: 'js-6', title: 'Events', description: 'Click, input, form handling' },
        { id: 'js-7', title: 'ES6+ features', description: 'Modern JavaScript syntax' },
        { id: 'js-8', title: 'Async & Fetch API', description: 'Promises and API calls' },
      ],
    },
    {
      id: 'react',
      name: 'React',
      icon: 'Component',
      days: '15-18 Days',
      status: 'pending',
      microTopics: [
        { id: 'react-1', title: 'Components', description: 'Building blocks of React' },
        { id: 'react-2', title: 'JSX', description: 'JavaScript XML syntax' },
        { id: 'react-3', title: 'Props & state', description: 'Data flow in React' },
        { id: 'react-4', title: 'Hooks', description: 'useState, useEffect, custom hooks' },
        { id: 'react-5', title: 'Routing', description: 'React Router navigation' },
        { id: 'react-6', title: 'API integration', description: 'Fetching and displaying data' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'Server',
      days: '12-15 Days',
      status: 'pending',
      microTopics: [
        { id: 'be-1', title: 'Backend concepts', description: 'Server-side fundamentals' },
        { id: 'be-2', title: 'Node.js', description: 'JavaScript runtime' },
        { id: 'be-3', title: 'Express', description: 'Web framework basics' },
        { id: 'be-4', title: 'REST APIs', description: 'Designing endpoints' },
        { id: 'be-5', title: 'Databases', description: 'SQL and NoSQL basics' },
        { id: 'be-6', title: 'Auth basics', description: 'JWT and sessions' },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'Rocket',
      days: '10-14 Days',
      status: 'pending',
      microTopics: [
        { id: 'proj-1', title: 'Portfolio website', description: 'Showcase your work' },
        { id: 'proj-2', title: 'CRUD app', description: 'Full-stack application' },
        { id: 'proj-3', title: 'API-based project', description: 'Third-party integrations' },
      ],
    },
  ],
};

export const dataAnalyticsRoadmap: Roadmap = {
  domain: 'data-analytics',
  title: 'Data Analytics',
  skills: [
    {
      id: 'excel',
      name: 'Excel',
      icon: 'Table',
      days: '5-7 Days',
      status: 'active',
      microTopics: [
        { id: 'excel-1', title: 'Spreadsheet basics', description: 'Navigation and formatting' },
        { id: 'excel-2', title: 'Formulas', description: 'SUM, AVERAGE, VLOOKUP' },
        { id: 'excel-3', title: 'Pivot tables', description: 'Data summarization' },
        { id: 'excel-4', title: 'Charts', description: 'Data visualization' },
      ],
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: 'Database',
      days: '10-14 Days',
      status: 'pending',
      microTopics: [
        { id: 'sql-1', title: 'SELECT queries', description: 'Retrieving data' },
        { id: 'sql-2', title: 'JOINs', description: 'Combining tables' },
        { id: 'sql-3', title: 'Aggregations', description: 'GROUP BY, HAVING' },
        { id: 'sql-4', title: 'Subqueries', description: 'Nested queries' },
      ],
    },
    {
      id: 'python-da',
      name: 'Python',
      icon: 'FileCode',
      days: '12-15 Days',
      status: 'pending',
      microTopics: [
        { id: 'py-1', title: 'Python basics', description: 'Syntax and data types' },
        { id: 'py-2', title: 'Pandas', description: 'DataFrames and analysis' },
        { id: 'py-3', title: 'NumPy', description: 'Numerical computing' },
        { id: 'py-4', title: 'Data cleaning', description: 'Handling missing data' },
      ],
    },
    {
      id: 'stats',
      name: 'Statistics',
      icon: 'TrendingUp',
      days: '8-10 Days',
      status: 'pending',
      microTopics: [
        { id: 'stat-1', title: 'Descriptive stats', description: 'Mean, median, mode' },
        { id: 'stat-2', title: 'Probability', description: 'Distributions and odds' },
        { id: 'stat-3', title: 'Hypothesis testing', description: 'Statistical significance' },
      ],
    },
    {
      id: 'visualization',
      name: 'Visualization',
      icon: 'BarChart3',
      days: '10-12 Days',
      status: 'pending',
      microTopics: [
        { id: 'viz-1', title: 'Tableau basics', description: 'Dashboard creation' },
        { id: 'viz-2', title: 'Power BI', description: 'Reports and visuals' },
        { id: 'viz-3', title: 'Storytelling', description: 'Data narratives' },
      ],
    },
    {
      id: 'da-projects',
      name: 'Projects',
      icon: 'Rocket',
      days: '10-14 Days',
      status: 'pending',
      microTopics: [
        { id: 'da-proj-1', title: 'Sales dashboard', description: 'Business metrics' },
        { id: 'da-proj-2', title: 'Customer analysis', description: 'Segmentation project' },
      ],
    },
  ],
};

export const getRoadmapByDomain = (domain: string): Roadmap => {
  switch (domain) {
    case 'web-development':
      return webDevelopmentRoadmap;
    case 'data-analytics':
      return dataAnalyticsRoadmap;
    default:
      return webDevelopmentRoadmap;
  }
};

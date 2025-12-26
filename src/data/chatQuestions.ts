import { Domain } from '@/types/skillpath';

export interface ChatQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'next-steps' | 'internship' | 'projects';
}

export const chatQuestionsByDomain: Record<Domain, ChatQuestion[]> = {
  'web-development': [
    {
      id: 'wd-1',
      question: 'What should I learn first in web development?',
      answer: 'Start with HTML! It\'s the foundation of every website. Learn how to structure content with tags like <div>, <p>, <h1>, and forms. Spend about a week on it before moving to CSS for styling.',
      category: 'basics',
    },
    {
      id: 'wd-2',
      question: 'How long does it take to become job-ready?',
      answer: 'With consistent daily learning (2-3 hours), you can become internship-ready in 3-4 months. Focus on HTML, CSS, JavaScript, and one framework like React. Build 2-3 projects to showcase your skills.',
      category: 'next-steps',
    },
    {
      id: 'wd-3',
      question: 'What projects should I build for my portfolio?',
      answer: 'Build these 3 projects: 1) A personal portfolio website, 2) A todo or notes app with CRUD operations, 3) An app that fetches data from an API (weather, movies, etc.). These cover all essential skills!',
      category: 'projects',
    },
    {
      id: 'wd-4',
      question: 'Is React necessary for an internship?',
      answer: 'React is highly valued but not always mandatory. However, knowing React significantly increases your chances. Most companies prefer React developers. Focus on components, hooks, and API integration.',
      category: 'internship',
    },
    {
      id: 'wd-5',
      question: 'Should I learn backend or focus on frontend?',
      answer: 'For internships, being strong in frontend (React) is usually enough. But knowing basic backend concepts (APIs, databases) makes you stand out. Start with frontend, add basic Node.js/Express later.',
      category: 'next-steps',
    },
    {
      id: 'wd-6',
      question: 'What\'s the difference between CSS Flexbox and Grid?',
      answer: 'Flexbox is for one-dimensional layouts (rows OR columns). Grid is for two-dimensional layouts (rows AND columns). Use Flexbox for navigation bars, card layouts. Use Grid for full page layouts with complex sections.',
      category: 'basics',
    },
  ],
  'data-analytics': [
    {
      id: 'da-1',
      question: 'Do I need to know programming for data analytics?',
      answer: 'Not initially! Start with Excel and SQL - they\'re essential and don\'t require programming. Later, learn Python for more advanced analysis. Many analysts work primarily with SQL and visualization tools.',
      category: 'basics',
    },
    {
      id: 'da-2',
      question: 'Which tool is more important: Tableau or Power BI?',
      answer: 'Both are valuable! Power BI is more common in corporate environments (especially Microsoft-focused companies). Tableau is popular in startups and data-heavy industries. Learn one well, the other will be easy to pick up.',
      category: 'next-steps',
    },
    {
      id: 'da-3',
      question: 'What SQL concepts are most important?',
      answer: 'Focus on: SELECT queries, JOINs (especially LEFT JOIN), GROUP BY with aggregations, WHERE filtering, and subqueries. These cover 90% of real-world analytics work. Practice with real datasets!',
      category: 'basics',
    },
    {
      id: 'da-4',
      question: 'What projects should I build for data analytics?',
      answer: 'Build: 1) A sales/revenue dashboard with trends, 2) Customer segmentation analysis, 3) A/B testing analysis project. Use real public datasets from Kaggle. Document your insights and methodology!',
      category: 'projects',
    },
    {
      id: 'da-5',
      question: 'How do I prepare for data analyst interviews?',
      answer: 'Practice: 1) SQL problems on LeetCode/StrataScratch, 2) Case studies explaining your analysis approach, 3) Dashboard walkthrough presentations. Be ready to explain business insights from your projects!',
      category: 'internship',
    },
    {
      id: 'da-6',
      question: 'Is Python necessary or can I just use Excel?',
      answer: 'Excel is great for small datasets and quick analysis. Python becomes necessary when handling large data (100K+ rows), automation, or complex statistical analysis. Start with Excel, add Python gradually.',
      category: 'next-steps',
    },
  ],
  'ui-ux': [
    {
      id: 'ux-1',
      question: 'What\'s the difference between UI and UX?',
      answer: 'UX (User Experience) focuses on how a product feels - user flows, research, solving problems. UI (User Interface) focuses on how it looks - colors, typography, visual design. Both work together!',
      category: 'basics',
    },
    {
      id: 'ux-2',
      question: 'Which tool should I learn: Figma or Adobe XD?',
      answer: 'Learn Figma first! It\'s the industry standard, free to use, and cloud-based so you can collaborate easily. Most companies and design teams use Figma. XD knowledge is a bonus but not essential.',
      category: 'basics',
    },
    {
      id: 'ux-3',
      question: 'What should be in my UX portfolio?',
      answer: 'Include 3-4 case studies showing your process: 1) Problem definition, 2) Research & personas, 3) Wireframes, 4) Final designs, 5) Learnings. Show your thinking, not just pretty screens!',
      category: 'projects',
    },
    {
      id: 'ux-4',
      question: 'Do I need to know how to code?',
      answer: 'Coding isn\'t required but understanding basics helps! Know HTML/CSS concepts so you design feasible interfaces. Understanding developer constraints makes you a better collaborator.',
      category: 'next-steps',
    },
    {
      id: 'ux-5',
      question: 'How do I get UX experience without a job?',
      answer: 'Do redesign projects (improve existing apps), volunteer for non-profits, participate in design challenges, or create concept projects. Document everything as case studies for your portfolio!',
      category: 'internship',
    },
    {
      id: 'ux-6',
      question: 'What UX research methods should I know?',
      answer: 'Start with: User interviews, surveys, usability testing, and competitive analysis. These are the most commonly used methods. Practice conducting at least one user interview for your projects!',
      category: 'basics',
    },
  ],
  'cloud-computing': [
    {
      id: 'cc-1',
      question: 'Which cloud platform should I learn first?',
      answer: 'Start with AWS - it has the largest market share and most job opportunities. Azure is great if targeting Microsoft-focused companies. GCP is growing but less common. Master one first!',
      category: 'basics',
    },
    {
      id: 'cc-2',
      question: 'Do I need Linux knowledge for cloud?',
      answer: 'Yes! Linux is essential. Most cloud servers run Linux. Learn basic commands (cd, ls, grep, chmod), file permissions, package management, and shell scripting. Spend 1-2 weeks on Linux basics.',
      category: 'basics',
    },
    {
      id: 'cc-3',
      question: 'What AWS services should I focus on?',
      answer: 'Start with core services: EC2 (servers), S3 (storage), IAM (security), VPC (networking), RDS (databases), and Lambda (serverless). These cover most use cases and interview questions!',
      category: 'next-steps',
    },
    {
      id: 'cc-4',
      question: 'Is Docker/Kubernetes necessary for beginners?',
      answer: 'Docker basics are important - learn containers, images, and docker-compose. Kubernetes is advanced; understand its concepts but don\'t deep-dive initially. Focus on core cloud services first.',
      category: 'next-steps',
    },
    {
      id: 'cc-5',
      question: 'What certifications should I get?',
      answer: 'Start with AWS Cloud Practitioner (foundational), then AWS Solutions Architect Associate. These are highly recognized. Certifications + hands-on projects = strong internship profile!',
      category: 'internship',
    },
    {
      id: 'cc-6',
      question: 'What projects can I build for cloud?',
      answer: 'Build: 1) A static website hosted on S3 with CloudFront, 2) A serverless API with Lambda + API Gateway, 3) Deploy a web app on EC2 with a database. Document your architecture diagrams!',
      category: 'projects',
    },
  ],
  'ai-ml': [
    {
      id: 'ml-1',
      question: 'Do I need strong math for machine learning?',
      answer: 'You need basics: linear algebra (matrices, vectors), calculus (derivatives), and statistics (probability, distributions). You don\'t need to be a math expert - focus on intuition over proofs.',
      category: 'basics',
    },
    {
      id: 'ml-2',
      question: 'Should I use TensorFlow or PyTorch?',
      answer: 'PyTorch is more beginner-friendly and popular in research. TensorFlow is common in production. Start with PyTorch for learning, but knowing both concepts helps. They\'re quite similar!',
      category: 'next-steps',
    },
    {
      id: 'ml-3',
      question: 'What ML algorithms should I learn first?',
      answer: 'Start with: Linear/Logistic Regression, Decision Trees, Random Forests, and K-Means clustering. Understand how they work, when to use them, and their limitations. Then explore neural networks.',
      category: 'basics',
    },
    {
      id: 'ml-4',
      question: 'What projects are good for ML portfolio?',
      answer: 'Build: 1) A classification project (spam detection, sentiment analysis), 2) A regression project (price prediction), 3) An image classification project with CNNs. Use real datasets and explain your metrics!',
      category: 'projects',
    },
    {
      id: 'ml-5',
      question: 'How do I prepare for ML interviews?',
      answer: 'Prepare: 1) ML theory questions (bias-variance, overfitting), 2) Coding with pandas/numpy, 3) Project deep-dives explaining your choices. Be ready to discuss evaluation metrics and model selection!',
      category: 'internship',
    },
    {
      id: 'ml-6',
      question: 'Is deep learning necessary for beginners?',
      answer: 'Not initially! Master classical ML first (regression, trees, clustering). Deep learning is powerful but complex. Once comfortable with basics, explore neural networks, CNNs for images, RNNs for sequences.',
      category: 'next-steps',
    },
  ],
};

import { useState } from "react";

// This is a dummy implementation since we don't have actual API credentials
// In a real implementation, you would integrate with Gemini/OpenAI APIs
export const useAiSuggestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAiSuggestion = async (prompt: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock responses based on prompt content
      if (prompt.includes("education")) {
        return "Completed coursework in advanced algorithms, machine learning, and distributed systems. Participated in undergraduate research program focusing on natural language processing. Dean's List for all semesters.";
      } else if (prompt.includes("experience") || prompt.includes("job")) {
        return "Led cross-functional team to develop and launch customer-facing web application that increased user engagement by 45%. Implemented CI/CD pipeline reducing deployment time by 60%. Mentored junior developers and conducted code reviews to ensure quality standards.";
      } else if (prompt.includes("project")) {
        return "Developed a full-stack web application using React, Node.js, and MongoDB. Implemented user authentication, responsive UI design, and RESTful API endpoints. Deployed using Docker and AWS, resulting in 99.9% uptime.";
      } else if (prompt.includes("summary") || prompt.includes("objective")) {
        return "Results-driven software engineer with a strong foundation in full-stack development and a passion for creating efficient, user-friendly applications. Proven ability to translate business requirements into technical solutions that drive user engagement and business growth.";
      } else if (prompt.includes("skill")) {
        return "JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, Docker, AWS, RESTful APIs, GraphQL, Jest, Agile/Scrum";
      } else {
        return "I've generated a professional improvement to your content. This enhancement emphasizes your achievements and uses industry-standard terminology to make your resume more impactful.";
      }
    } catch (error) {
      console.error("Error generating AI suggestion:", error);
      return "Unable to generate suggestion at this time. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  return { getAiSuggestion, isLoading };
};


import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Summary } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface SummaryFormProps {
  data: Summary;
  updateData: (data: Summary) => void;
}

const SummaryForm = ({ data, updateData }: SummaryFormProps) => {
  const { getAiSuggestion, isLoading } = useAiSuggestion();

  const handleChange = (field: keyof Summary, value: string) => {
    updateData({
      ...data,
      [field]: value,
    });
  };

  const handleAiSuggestion = async (field: keyof Summary) => {
    let prompt = "";
    
    if (field === "professionalSummary") {
      prompt = "Generate a professional summary for a software developer's resume. Focus on showcasing technical expertise, adaptability, and problem-solving skills. Keep it concise but impactful.";
    } else {
      prompt = "Write a clear career objective for a software developer looking to grow in a collaborative environment. Include goals related to technical growth and contribution to meaningful projects.";
    }
    
    try {
      const suggestion = await getAiSuggestion(prompt);
      handleChange(field, suggestion);
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="professionalSummary" className="text-lg font-medium">
            Professional Summary
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAiSuggestion("professionalSummary")}
            disabled={isLoading}
            className="flex items-center text-primary hover:bg-primary/10 border-primary"
          >
            <Sparkles className="mr-1 h-4 w-4" />
            {isLoading ? "Generating..." : "AI Suggestion"}
          </Button>
        </div>
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">
            A professional summary is a brief, powerful statement that highlights your most relevant skills, accomplishments, and experience. It's the first thing recruiters see.
          </p>
        </Card>
        <Textarea
          id="professionalSummary"
          value={data.professionalSummary}
          onChange={(e) => handleChange("professionalSummary", e.target.value)}
          placeholder="Results-driven software engineer with 3+ years of experience in full-stack development..."
          className="min-h-[150px]"
        />
        <div className="text-xs text-muted-foreground text-right">
          {data.professionalSummary.length} characters
          <span className={data.professionalSummary.length > 500 ? "text-red-500 font-bold" : ""}>
            {data.professionalSummary.length > 500 ? " (too long)" : ""}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="careerObjective" className="text-lg font-medium">
            Career Objective
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAiSuggestion("careerObjective")}
            disabled={isLoading}
            className="flex items-center text-primary hover:bg-primary/10 border-primary"
          >
            <Sparkles className="mr-1 h-4 w-4" />
            {isLoading ? "Generating..." : "AI Suggestion"}
          </Button>
        </div>
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">
            A career objective states your career goals and what you hope to achieve in your next position. It's optional but useful for recent graduates or career changers.
          </p>
        </Card>
        <Textarea
          id="careerObjective"
          value={data.careerObjective}
          onChange={(e) => handleChange("careerObjective", e.target.value)}
          placeholder="Seeking a challenging position as a software developer where I can utilize my skills..."
          className="min-h-[150px]"
        />
        <div className="text-xs text-muted-foreground text-right">
          {data.careerObjective.length} characters
          <span className={data.careerObjective.length > 300 ? "text-red-500 font-bold" : ""}>
            {data.careerObjective.length > 300 ? " (too long)" : ""}
          </span>
        </div>
      </div>

      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h3 className="font-medium flex items-center mb-2">
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          AI Writing Tips
        </h3>
        <ul className="space-y-2 text-sm">
          <li>• Keep your summary concise (2-4 sentences)</li>
          <li>• Focus on quantifiable achievements when possible</li>
          <li>• Tailor your summary to match the job description</li>
          <li>• Avoid clichés like "team player" or "detail-oriented"</li>
          <li>• Use active voice and strong action verbs</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryForm;

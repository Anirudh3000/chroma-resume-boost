
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, Sparkles, Plus, X } from "lucide-react";
import { Experience } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, updateData }: ExperienceFormProps) => {
  const { getAiSuggestion, isLoading } = useAiSuggestion();
  const [activeExperience, setActiveExperience] = useState<string | null>(
    data.length > 0 ? data[0].id : null
  );
  const [newBullet, setNewBullet] = useState("");

  // Add new experience entry
  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      current: false,
      description: "",
      bullets: [],
    };
    
    updateData([...data, newExperience]);
    setActiveExperience(newExperience.id);
  };

  // Remove experience entry
  const removeExperience = (id: string) => {
    const newData = data.filter(exp => exp.id !== id);
    updateData(newData);
    
    if (activeExperience === id) {
      setActiveExperience(newData.length > 0 ? newData[0].id : null);
    }
  };

  // Update specific experience entry
  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const newData = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateData(newData);
  };

  // Add bullet point
  const addBullet = (id: string) => {
    if (!newBullet.trim()) return;

    const experience = data.find(exp => exp.id === id);
    if (!experience) return;

    const updatedBullets = [...experience.bullets, newBullet];
    updateExperience(id, "bullets", updatedBullets);
    setNewBullet("");
  };

  // Remove bullet point
  const removeBullet = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (!experience) return;

    const updatedBullets = [...experience.bullets];
    updatedBullets.splice(index, 1);
    updateExperience(id, "bullets", updatedBullets);
  };

  // Update current job checkbox
  const handleCurrentChange = (id: string, checked: boolean) => {
    updateExperience(id, "current", checked);
    
    // Clear end date if current job
    if (checked) {
      updateExperience(id, "endDate", "");
    }
  };

  // Handle AI suggestion for description or bullets
  const handleAiSuggestion = async (id: string, field: "description" | "bullets") => {
    const experience = data.find(exp => exp.id === id);
    if (!experience) return;

    let prompt = "";
    if (field === "description") {
      prompt = `Generate a concise and professional description for my role as ${experience.position} at ${experience.company}.`;
    } else {
      prompt = `Generate 3-5 impactful bullet points for my resume highlighting achievements and responsibilities as ${experience.position} at ${experience.company}. Focus on quantifiable results and specific skills.`;
    }
    
    try {
      const suggestion = await getAiSuggestion(prompt);
      
      if (field === "description") {
        updateExperience(id, "description", suggestion);
      } else {
        // For bullets, split the suggestion by newlines and clean up
        const suggestedBullets = suggestion
          .split(/\n/)
          .map(bullet => bullet.replace(/^-\s*/, "").trim())
          .filter(bullet => bullet.length > 0);
        
        updateExperience(id, "bullets", suggestedBullets);
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Experience List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((experience) => (
          <Button
            key={experience.id}
            variant={activeExperience === experience.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveExperience(experience.id)}
            className="flex items-center"
          >
            {experience.company || "New Experience"}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addExperience}
          className="flex items-center text-primary"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {/* Active Experience Form */}
      {activeExperience && data.find(exp => exp.id === activeExperience) && (
        <Card className="p-6 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              {data.find(exp => exp.id === activeExperience)?.company || "New Experience"}
            </h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeExperience(activeExperience)}
              disabled={data.length <= 1}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={data.find(exp => exp.id === activeExperience)?.company || ""}
                onChange={(e) => updateExperience(activeExperience, "company", e.target.value)}
                placeholder="Google, Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={data.find(exp => exp.id === activeExperience)?.position || ""}
                onChange={(e) => updateExperience(activeExperience, "position", e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.find(exp => exp.id === activeExperience)?.location || ""}
                onChange={(e) => updateExperience(activeExperience, "location", e.target.value)}
                placeholder="Mountain View, CA"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="current"
                  checked={data.find(exp => exp.id === activeExperience)?.current || false}
                  onCheckedChange={(checked) => 
                    handleCurrentChange(activeExperience, checked as boolean)
                  }
                />
                <Label htmlFor="current" className="font-normal cursor-pointer">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="month"
                value={data.find(exp => exp.id === activeExperience)?.startDate || ""}
                onChange={(e) => updateExperience(activeExperience, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                value={data.find(exp => exp.id === activeExperience)?.endDate || ""}
                onChange={(e) => updateExperience(activeExperience, "endDate", e.target.value)}
                disabled={data.find(exp => exp.id === activeExperience)?.current || false}
                placeholder={data.find(exp => exp.id === activeExperience)?.current ? "Present" : ""}
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAiSuggestion(activeExperience, "description")}
                disabled={isLoading}
                className="text-primary text-xs flex items-center h-6"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {isLoading ? "Generating..." : "AI Suggestion"}
              </Button>
            </div>
            <Textarea
              id="description"
              value={data.find(exp => exp.id === activeExperience)?.description || ""}
              onChange={(e) => updateExperience(activeExperience, "description", e.target.value)}
              placeholder="Brief overview of your role and responsibilities"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Key Achievements & Responsibilities</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAiSuggestion(activeExperience, "bullets")}
                disabled={isLoading}
                className="text-primary text-xs flex items-center h-6"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {isLoading ? "Generating..." : "Generate Bullets"}
              </Button>
            </div>
            
            <ul className="space-y-2">
              {data.find(exp => exp.id === activeExperience)?.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start group">
                  <div className="flex-1 bg-muted p-2 rounded-md relative group-hover:bg-muted/80">
                    {bullet}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute right-1 top-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => removeBullet(activeExperience, index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-2 mt-2">
              <Input
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                placeholder="Add a new bullet point"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newBullet) {
                    e.preventDefault();
                    addBullet(activeExperience);
                  }
                }}
              />
              <Button 
                onClick={() => addBullet(activeExperience)}
                disabled={!newBullet.trim()}
                size="icon"
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {data.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No work experience entries yet</p>
          <Button onClick={addExperience}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;

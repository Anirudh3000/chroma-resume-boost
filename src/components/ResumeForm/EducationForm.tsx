
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2, Sparkles } from "lucide-react";
import { Education } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface EducationFormProps {
  data: Education[];
  updateData: (data: Education[]) => void;
}

const EducationForm = ({ data, updateData }: EducationFormProps) => {
  const { getAiSuggestion, isLoading } = useAiSuggestion();
  const [activeEducation, setActiveEducation] = useState<string | null>(
    data.length > 0 ? data[0].id : null
  );

  // Add new education entry
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      gpa: "",
      description: "",
    };
    
    updateData([...data, newEducation]);
    setActiveEducation(newEducation.id);
  };

  // Remove education entry
  const removeEducation = (id: string) => {
    const newData = data.filter(edu => edu.id !== id);
    updateData(newData);
    
    if (activeEducation === id) {
      setActiveEducation(newData.length > 0 ? newData[0].id : null);
    }
  };

  // Update specific education entry
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const newData = data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateData(newData);
  };

  // Handle AI suggestion for description
  const handleAiSuggestion = async (id: string) => {
    const education = data.find(edu => edu.id === id);
    if (!education) return;

    const prompt = `Generate a concise and professional description for my education at ${education.institution} where I studied ${education.degree} in ${education.field}. GPA: ${education.gpa}.`;
    
    try {
      const suggestion = await getAiSuggestion(prompt);
      if (suggestion) {
        updateEducation(id, "description", suggestion);
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Education List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((education) => (
          <Button
            key={education.id}
            variant={activeEducation === education.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveEducation(education.id)}
            className="flex items-center"
          >
            {education.institution || "New Education"}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addEducation}
          className="flex items-center text-primary"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Active Education Form */}
      {activeEducation && data.find(edu => edu.id === activeEducation) && (
        <Card className="p-6 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              {data.find(edu => edu.id === activeEducation)?.institution || "New Education"}
            </h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeEducation(activeEducation)}
              disabled={data.length <= 1}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={data.find(edu => edu.id === activeEducation)?.institution || ""}
                onChange={(e) => updateEducation(activeEducation, "institution", e.target.value)}
                placeholder="University of California, Berkeley"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.find(edu => edu.id === activeEducation)?.location || ""}
                onChange={(e) => updateEducation(activeEducation, "location", e.target.value)}
                placeholder="Berkeley, CA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={data.find(edu => edu.id === activeEducation)?.degree || ""}
                onChange={(e) => updateEducation(activeEducation, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                value={data.find(edu => edu.id === activeEducation)?.field || ""}
                onChange={(e) => updateEducation(activeEducation, "field", e.target.value)}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="month"
                value={data.find(edu => edu.id === activeEducation)?.startDate || ""}
                onChange={(e) => updateEducation(activeEducation, "startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                value={data.find(edu => edu.id === activeEducation)?.endDate || ""}
                onChange={(e) => updateEducation(activeEducation, "endDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                value={data.find(edu => edu.id === activeEducation)?.gpa || ""}
                onChange={(e) => updateEducation(activeEducation, "gpa", e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAiSuggestion(activeEducation)}
                disabled={isLoading}
                className="text-primary text-xs flex items-center h-6"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                {isLoading ? "Generating..." : "AI Suggestion"}
              </Button>
            </div>
            <Textarea
              id="description"
              value={data.find(edu => edu.id === activeEducation)?.description || ""}
              onChange={(e) => updateEducation(activeEducation, "description", e.target.value)}
              placeholder="Describe your studies, achievements, relevant coursework, etc."
              className="min-h-[100px]"
            />
          </div>
        </Card>
      )}

      {data.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No education entries yet</p>
          <Button onClick={addEducation}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;

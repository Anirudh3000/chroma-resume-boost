
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, Trash2, Sparkles, Plus, X, Pencil } from "lucide-react";
import { SkillCategory, Skill } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface SkillsFormProps {
  data: SkillCategory[];
  updateData: (data: SkillCategory[]) => void;
}

const SkillsForm = ({ data, updateData }: SkillsFormProps) => {
  const { getAiSuggestion, isLoading } = useAiSuggestion();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    data.length > 0 ? data[0].id : null
  );
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(3);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Add new category
  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: "New Category",
      skills: [],
    };
    
    updateData([...data, newCategory]);
    setActiveCategory(newCategory.id);
    setEditingCategoryId(newCategory.id);
    setNewCategoryName("New Category");
  };

  // Update category name
  const updateCategoryName = (id: string, name: string) => {
    const newData = data.map(category => 
      category.id === id ? { ...category, name } : category
    );
    updateData(newData);
    setEditingCategoryId(null);
  };

  // Remove category
  const removeCategory = (id: string) => {
    const newData = data.filter(category => category.id !== id);
    updateData(newData);
    
    if (activeCategory === id) {
      setActiveCategory(newData.length > 0 ? newData[0].id : null);
    }
  };

  // Add skill to category
  const addSkill = (categoryId: string) => {
    if (!newSkillName.trim()) return;

    const category = data.find(cat => cat.id === categoryId);
    if (!category) return;

    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: newSkillName,
      level: newSkillLevel,
    };

    const updatedCategory = {
      ...category,
      skills: [...category.skills, newSkill],
    };

    const newData = data.map(cat => 
      cat.id === categoryId ? updatedCategory : cat
    );
    
    updateData(newData);
    setNewSkillName("");
    setNewSkillLevel(3);
  };

  // Remove skill from category
  const removeSkill = (categoryId: string, skillId: string) => {
    const category = data.find(cat => cat.id === categoryId);
    if (!category) return;

    const updatedSkills = category.skills.filter(skill => skill.id !== skillId);
    
    const newData = data.map(cat => 
      cat.id === categoryId ? { ...cat, skills: updatedSkills } : cat
    );
    
    updateData(newData);
  };

  // Generate AI skill suggestions
  const handleAiSuggestion = async (categoryId: string, categoryName: string) => {
    const category = data.find(cat => cat.id === categoryId);
    if (!category) return;

    const jobTitle = "software developer"; // Could be dynamic based on user's target job
    const prompt = `Generate a list of 5-7 important skills for a ${jobTitle} in the category of ${categoryName}. Format as a simple comma-separated list.`;
    
    try {
      const suggestion = await getAiSuggestion(prompt);
      
      // Parse the suggestion into individual skills
      const skillNames = suggestion
        .split(/,|\n/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      // Create new skill objects
      const newSkills = skillNames.map((name, index) => ({
        id: `skill-${Date.now()}-${index}`,
        name,
        level: 3, // Default to medium proficiency
      }));
      
      // Add the new skills to the category
      const updatedSkills = [...category.skills, ...newSkills];
      const newData = data.map(cat => 
        cat.id === categoryId ? { ...cat, skills: updatedSkills } : cat
      );
      
      updateData(newData);
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center"
          >
            {category.name}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addCategory}
          className="flex items-center text-primary"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Active Category Form */}
      {activeCategory && data.find(cat => cat.id === activeCategory) && (
        <Card className="p-6 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-6">
            {editingCategoryId === activeCategory ? (
              <div className="flex gap-2">
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-48"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateCategoryName(activeCategory, newCategoryName);
                    }
                  }}
                />
                <Button 
                  size="sm"
                  onClick={() => updateCategoryName(activeCategory, newCategoryName)}
                >
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setEditingCategoryId(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <h3 className="text-lg font-medium">
                  {data.find(cat => cat.id === activeCategory)?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-2"
                  onClick={() => {
                    const category = data.find(cat => cat.id === activeCategory);
                    if (category) {
                      setEditingCategoryId(activeCategory);
                      setNewCategoryName(category.name);
                    }
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAiSuggestion(
                  activeCategory, 
                  data.find(cat => cat.id === activeCategory)?.name || ""
                )}
                disabled={isLoading}
                className="flex items-center"
              >
                <Sparkles className="mr-1 h-4 w-4" />
                {isLoading ? "Generating..." : "Suggest Skills"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCategory(activeCategory)}
                disabled={data.length <= 1}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>

          {/* Skills List */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-2">
              {data.find(cat => cat.id === activeCategory)?.skills.map((skill) => (
                <div 
                  key={skill.id}
                  className="flex items-center justify-between bg-muted p-3 rounded-md group"
                >
                  <div className="flex-1">
                    <p className="font-medium">{skill.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <Slider 
                        value={[skill.level]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => {
                          const newData = data.map(cat => {
                            if (cat.id !== activeCategory) return cat;
                            return {
                              ...cat,
                              skills: cat.skills.map(s => 
                                s.id === skill.id ? { ...s, level: value[0] } : s
                              )
                            };
                          });
                          updateData(newData);
                        }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground w-20">
                      {skill.level === 1 && "Beginner"}
                      {skill.level === 2 && "Basic"}
                      {skill.level === 3 && "Intermediate"}
                      {skill.level === 4 && "Advanced"}
                      {skill.level === 5 && "Expert"}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => removeSkill(activeCategory, skill.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Skill Form */}
          <div className="space-y-4">
            <h4 className="font-medium">Add New Skill</h4>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="JavaScript, Project Management, etc."
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="skillLevel">Proficiency Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {newSkillLevel === 1 && "Beginner"}
                    {newSkillLevel === 2 && "Basic"}
                    {newSkillLevel === 3 && "Intermediate"}
                    {newSkillLevel === 4 && "Advanced"}
                    {newSkillLevel === 5 && "Expert"}
                  </span>
                </div>
                <Slider
                  id="skillLevel"
                  value={[newSkillLevel]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setNewSkillLevel(value[0])}
                />
              </div>
              <Button
                onClick={() => addSkill(activeCategory)}
                disabled={!newSkillName.trim()}
                className="w-full mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>
          </div>
        </Card>
      )}

      {data.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No skill categories yet</p>
          <Button onClick={addCategory}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Skill Category
          </Button>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;

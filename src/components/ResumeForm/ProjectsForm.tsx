
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2, Sparkles, Plus, X, Link2 } from "lucide-react";
import { Project } from "@/hooks/useResumeData";
import { useAiSuggestion } from "@/hooks/useAiSuggestion";

interface ProjectsFormProps {
  data: Project[];
  updateData: (data: Project[]) => void;
}

const ProjectsForm = ({ data, updateData }: ProjectsFormProps) => {
  const { getAiSuggestion, isLoading } = useAiSuggestion();
  const [activeProject, setActiveProject] = useState<string | null>(
    data.length > 0 ? data[0].id : null
  );
  const [newBullet, setNewBullet] = useState("");

  // Add new project entry
  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: "",
      link: "",
      startDate: "",
      endDate: "",
      description: "",
      bullets: [],
    };
    
    updateData([...data, newProject]);
    setActiveProject(newProject.id);
  };

  // Remove project entry
  const removeProject = (id: string) => {
    const newData = data.filter(proj => proj.id !== id);
    updateData(newData);
    
    if (activeProject === id) {
      setActiveProject(newData.length > 0 ? newData[0].id : null);
    }
  };

  // Update specific project entry
  const updateProject = (id: string, field: keyof Project, value: any) => {
    const newData = data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateData(newData);
  };

  // Add bullet point
  const addBullet = (id: string) => {
    if (!newBullet.trim()) return;

    const project = data.find(proj => proj.id === id);
    if (!project) return;

    const updatedBullets = [...project.bullets, newBullet];
    updateProject(id, "bullets", updatedBullets);
    setNewBullet("");
  };

  // Remove bullet point
  const removeBullet = (id: string, index: number) => {
    const project = data.find(proj => proj.id === id);
    if (!project) return;

    const updatedBullets = [...project.bullets];
    updatedBullets.splice(index, 1);
    updateProject(id, "bullets", updatedBullets);
  };

  // Handle AI suggestion for description or bullets
  const handleAiSuggestion = async (id: string, field: "description" | "bullets") => {
    const project = data.find(proj => proj.id === id);
    if (!project) return;

    let prompt = "";
    if (field === "description") {
      prompt = `Generate a concise and professional description for my project titled "${project.title}".`;
    } else {
      prompt = `Generate 3-4 impactful bullet points for my resume highlighting technical achievements and skills demonstrated in my project "${project.title}". Focus on specific technologies used and problems solved.`;
    }
    
    try {
      const suggestion = await getAiSuggestion(prompt);
      
      if (field === "description") {
        updateProject(id, "description", suggestion);
      } else {
        // For bullets, split the suggestion by newlines and clean up
        const suggestedBullets = suggestion
          .split(/\n/)
          .map(bullet => bullet.replace(/^-\s*/, "").trim())
          .filter(bullet => bullet.length > 0);
        
        updateProject(id, "bullets", suggestedBullets);
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Project List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((project) => (
          <Button
            key={project.id}
            variant={activeProject === project.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveProject(project.id)}
            className="flex items-center"
          >
            {project.title || "New Project"}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={addProject}
          className="flex items-center text-primary"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Active Project Form */}
      {activeProject && data.find(proj => proj.id === activeProject) && (
        <Card className="p-6 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              {data.find(proj => proj.id === activeProject)?.title || "New Project"}
            </h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeProject(activeProject)}
              disabled={data.length <= 1}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={data.find(proj => proj.id === activeProject)?.title || ""}
                onChange={(e) => updateProject(activeProject, "title", e.target.value)}
                placeholder="E-commerce Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link (GitHub, Live Demo, etc.)</Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="link"
                  value={data.find(proj => proj.id === activeProject)?.link || ""}
                  onChange={(e) => updateProject(activeProject, "link", e.target.value)}
                  placeholder="github.com/yourusername/project"
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={data.find(proj => proj.id === activeProject)?.startDate || ""}
                  onChange={(e) => updateProject(activeProject, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={data.find(proj => proj.id === activeProject)?.endDate || ""}
                  onChange={(e) => updateProject(activeProject, "endDate", e.target.value)}
                  placeholder="Leave empty if ongoing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description">Description</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAiSuggestion(activeProject, "description")}
                  disabled={isLoading}
                  className="text-primary text-xs flex items-center h-6"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {isLoading ? "Generating..." : "AI Suggestion"}
                </Button>
              </div>
              <Textarea
                id="description"
                value={data.find(proj => proj.id === activeProject)?.description || ""}
                onChange={(e) => updateProject(activeProject, "description", e.target.value)}
                placeholder="Brief overview of your project, technologies used, and your role"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Key Features & Technologies</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAiSuggestion(activeProject, "bullets")}
                  disabled={isLoading}
                  className="text-primary text-xs flex items-center h-6"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {isLoading ? "Generating..." : "Generate Bullets"}
                </Button>
              </div>
              
              <ul className="space-y-2">
                {data.find(proj => proj.id === activeProject)?.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="flex-1 bg-muted p-2 rounded-md relative group-hover:bg-muted/80">
                      {bullet}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 absolute right-1 top-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeBullet(activeProject, index)}
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
                      addBullet(activeProject);
                    }
                  }}
                />
                <Button 
                  onClick={() => addBullet(activeProject)}
                  disabled={!newBullet.trim()}
                  size="icon"
                  className="flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {data.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No project entries yet</p>
          <Button onClick={addProject}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;

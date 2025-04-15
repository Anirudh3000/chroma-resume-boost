
import { ResumeData } from "@/hooks/useResumeData";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import TechnicalTemplate from "./templates/TechnicalTemplate";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  // Simplified template selection
  if (data.selectedTemplate === "modern") {
    return <ModernTemplate data={data} />;
  }
  
  if (data.selectedTemplate === "creative") {
    return <CreativeTemplate data={data} />;
  }
  
  if (data.selectedTemplate === "technical") {
    return <TechnicalTemplate data={data} />;
  }
  
  // Default to classic template
  return <ClassicTemplate data={data} />;
};

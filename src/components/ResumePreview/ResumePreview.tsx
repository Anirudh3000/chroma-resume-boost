
import { ResumeData } from "@/hooks/useResumeData";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import TechnicalTemplate from "./templates/TechnicalTemplate";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  // Render different templates based on selected template
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "technical":
        return <TechnicalTemplate data={data} />;
      case "classic":
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return <div className="resume-preview">{renderTemplate()}</div>;
};

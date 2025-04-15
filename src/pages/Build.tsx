
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PersonalInfoForm from "@/components/ResumeForm/PersonalInfoForm";
import EducationForm from "@/components/ResumeForm/EducationForm";
import ExperienceForm from "@/components/ResumeForm/ExperienceForm";
import ProjectsForm from "@/components/ResumeForm/ProjectsForm";
import SkillsForm from "@/components/ResumeForm/SkillsForm";
import SummaryForm from "@/components/ResumeForm/SummaryForm";
import AIChatbot from "@/components/AIChatbot/AIChatbot";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "summary", label: "Summary" },
];

const Build = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDemo = new URLSearchParams(location.search).get("demo") === "true";
  const { resumeData, updateResumeData, loadDemoData } = useResumeData();

  // Load demo data if needed
  useState(() => {
    if (isDemo) {
      loadDemoData();
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      navigate("/preview");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "personal":
        return <PersonalInfoForm data={resumeData.personalInfo} updateData={(data) => updateResumeData("personalInfo", data)} />;
      case "education":
        return <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />;
      case "experience":
        return <ExperienceForm data={resumeData.experience} updateData={(data) => updateResumeData("experience", data)} />;
      case "projects":
        return <ProjectsForm data={resumeData.projects} updateData={(data) => updateResumeData("projects", data)} />;
      case "skills":
        return <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />;
      case "summary":
        return <SummaryForm data={resumeData.summary} updateData={(data) => updateResumeData("summary", data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="flex items-center text-gray-600"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-center">AI Resume Builder</h1>
            <div className="w-28"></div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto space-x-2 pb-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`py-2 px-4 rounded-lg whitespace-nowrap ${
                index === currentStep
                  ? "bg-primary text-white"
                  : index < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">{steps[currentStep].label}</h2>
              {renderStepContent()}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                  {currentStep === steps.length - 1 ? "Preview Resume" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-6">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-lg font-medium">Live Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white flex items-center gap-2 text-primary hover:bg-primary/10 border-primary"
                  onClick={toggleChatbot}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">AI Assistant</span>
                </Button>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md h-[600px] overflow-y-auto">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chatbot */}
      <AIChatbot isOpen={showChatbot} onClose={toggleChatbot} resumeData={resumeData} />

      {/* Chatbot Trigger */}
      {!showChatbot && (
        <Button
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 rounded-full w-14 h-14 shadow-lg"
          onClick={toggleChatbot}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Build;

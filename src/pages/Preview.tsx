
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Check } from "lucide-react";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import html2pdf from "html2pdf.js";

const Preview = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handle template change - simplified
  const handleTemplateChange = (value: string) => {
    updateResumeData("selectedTemplate", value);
  };

  // Handle print/download - simplified
  const handlePrint = () => {
    if (!resumeRef.current) return;
    
    setIsPrinting(true);
    
    const filename = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
    
    html2pdf()
      .from(resumeRef.current)
      .save(filename)
      .then(() => {
        setIsPrinting(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Simple Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/build")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <h1 className="text-xl font-bold">Resume Preview</h1>
            <div className="w-28"></div>
          </div>
        </div>
      </header>

      {/* Main Content - Simplified Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Selection - Simplified */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Choose Template</h2>
              <Tabs
                defaultValue={resumeData.selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                  <TabsTrigger value="creative">Creative</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            {/* Download Button - Simplified */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Download Resume</h2>
              <Button
                className="w-full"
                onClick={handlePrint}
                disabled={isPrinting}
              >
                {isPrinting ? (
                  "Creating PDF..."
                ) : downloadSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                  </>
                )}
              </Button>
            </Card>

            {/* Back to Editor */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/build")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
          </div>

          {/* Resume Preview - Simplified */}
          <div className="lg:col-span-2">
            <Card className="p-2 shadow-md">
              <div className="bg-white" ref={resumeRef}>
                <ResumePreview data={resumeData} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;

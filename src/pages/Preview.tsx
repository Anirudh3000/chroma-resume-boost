
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, FileText, Check } from "lucide-react";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import html2pdf from "html2pdf.js";

const Preview = () => {
  const { resumeData, updateResumeData } = useResumeData();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Handle template change
  const handleTemplateChange = (value: string) => {
    updateResumeData("selectedTemplate", value);
  };

  // Handle print/download using html2pdf
  const handlePrint = () => {
    if (!resumeRef.current) return;
    
    setIsPrinting(true);
    
    const filename = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
    const element = resumeRef.current;
    
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        setIsPrinting(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      });
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
              onClick={() => navigate("/build")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <h1 className="text-xl font-bold text-center">Resume Preview</h1>
            <div className="w-28"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Choose Template</h2>
              <Tabs
                defaultValue={resumeData.selectedTemplate}
                onValueChange={handleTemplateChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                  <TabsTrigger value="creative">Creative</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">
                    Select a template that best showcases your professional profile.
                    Each template is designed to emphasize different aspects of your resume.
                  </p>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm">
                      <span className="font-bold">Template Tip:</span>{" "}
                      {resumeData.selectedTemplate === "classic" && "Great for traditional industries and roles requiring a formal approach."}
                      {resumeData.selectedTemplate === "modern" && "Clean and contemporary, ideal for most professional roles."}
                      {resumeData.selectedTemplate === "creative" && "Showcase personality and creativity, perfect for design or marketing roles."}
                      {resumeData.selectedTemplate === "technical" && "Programmer-friendly design that highlights technical skills effectively."}
                    </p>
                  </div>
                </div>
              </Tabs>
            </Card>

            {/* Download Button */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Download Resume</h2>
              <p className="text-sm mb-4 text-gray-500">
                Your resume is ready for download as a PDF file. Use it to apply for jobs or share with recruiters.
              </p>
              <Button
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                onClick={handlePrint}
                disabled={isPrinting}
              >
                {isPrinting ? (
                  "Preparing PDF..."
                ) : downloadSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download as PDF
                  </>
                )}
              </Button>
            </Card>

            {/* Continue Editing */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/build")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Continue Editing
            </Button>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-5">
            <Card className="p-2 shadow-md max-w-4xl mx-auto">
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

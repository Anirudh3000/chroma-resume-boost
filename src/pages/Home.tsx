
import { motion } from "framer-motion";
import { ArrowRight, FileText, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-light">
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-purple leading-tight mb-6">
            Craft a Smart Resume Instantly ✨ With Help from AI
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Build a professional resume with AI-powered suggestions tailored to your career.
            No signup required, everything happens right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 text-lg">
              <Link to="/build">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-xl px-8 py-6 text-lg">
              <Link to="/build?demo=true">
                Try Demo
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Choose Our AI Resume Builder?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-16 px-4 bg-muted rounded-3xl my-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section className="container mx-auto py-16 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Beautiful Resume Templates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
        >
          Choose from professionally designed templates that stand out to recruiters
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2" />
                  <p>{template.name} Template</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-6 text-lg">
            <Link to="/build">
              Start Building Your Resume <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Meet AI Assistant */}
      <section className="container mx-auto py-16 px-4 mb-20">
        <div className="bg-gradient-purple rounded-3xl overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Meet Your AI Resume Assistant
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Get personalized help every step of the way. Our AI chatbot can:
              </p>
              <ul className="space-y-3">
                {aiFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-white/90">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="font-bold">AI Resume Assistant</p>
                    <p className="text-sm text-gray-500">Powered by OpenAI & Gemini</p>
                  </div>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">How should I describe my project management experience?</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 ml-auto max-w-xs">
                    <p className="text-sm">
                      Try highlighting your achievements with metrics. For example: "Managed a team of 5 to deliver project X ahead of schedule, resulting in 20% cost savings."
                    </p>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-500">Ask any resume-related question!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 AI Resume Builder. Created with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

// Data
const features = [
  {
    title: "AI-Powered Suggestions",
    description: "Get smart recommendations to improve your resume content using advanced AI.",
    icon: MessageSquare
  },
  {
    title: "No Login Required",
    description: "Everything happens in your browser. No account creation or data storage.",
    icon: FileText
  },
  {
    title: "Instant PDF Download",
    description: "Download your professional resume as a PDF in seconds, ready to submit.",
    icon: Download
  }
];

const steps = [
  {
    title: "Enter Your Details",
    description: "Fill in your information step by step with guidance along the way."
  },
  {
    title: "Enhance with AI",
    description: "Use AI suggestions to improve your content and make it stand out."
  },
  {
    title: "Download & Apply",
    description: "Choose a template, preview your resume, and download the PDF."
  }
];

const templates = [
  {
    name: "Classic",
    description: "Traditional and clean design for corporate positions"
  },
  {
    name: "Modern",
    description: "Contemporary style with a professional edge"
  },
  {
    name: "Creative",
    description: "Unique layout for design and creative roles"
  },
  {
    name: "Technical",
    description: "Optimized for showcasing technical skills"
  }
];

const aiFeatures = [
  "Suggest improvements to your job descriptions",
  "Help craft a compelling professional summary",
  "Recommend skills relevant to your target role",
  "Provide industry-specific writing tips",
  "Answer questions about resume best practices"
];

export default Home;

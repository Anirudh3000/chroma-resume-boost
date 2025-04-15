
import { ResumeData } from "@/hooks/useResumeData";

interface TemplateProps {
  data: ResumeData;
}

const TechnicalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, education, experience, projects, skills, summary } = data;

  return (
    <div className="font-mono text-gray-800 bg-white">
      {/* Header */}
      <header className="bg-gray-800 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-gray-300 text-sm mb-3">{summary.careerObjective}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Email:</span>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Phone:</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Location:</span>
              <span>
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">LinkedIn:</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Website:</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Technical Skills */}
        {skills.length > 0 && (
          <section className="mb-8 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h2 className="font-bold">// Technical Skills</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-bold text-sm mb-2 text-gray-600">{`/* ${category.name} */`}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => {
                        // Scale skill level (1-5) to stars
                        const stars = '★'.repeat(skill.level) + '☆'.repeat(5 - skill.level);
                        return (
                          <div 
                            key={skill.id} 
                            className="bg-gray-100 border border-gray-200 rounded px-3 py-1 text-xs"
                          >
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-500 ml-2 text-[10px]">{stars}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Summary */}
        {summary.professionalSummary && (
          <section className="mb-8 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h2 className="font-bold">// Professional Summary</h2>
            </div>
            <div className="p-4">
              <p className="text-sm whitespace-pre-line">{summary.professionalSummary}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h2 className="font-bold">// Professional Experience</h2>
            </div>
            <div className="p-4 space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="font-bold">{`${exp.company} - ${exp.position}`}</h3>
                    <div className="text-sm text-gray-600">
                      <span>
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {" - "}
                        {exp.current 
                          ? "Present"
                          : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                      <span className="mx-2">|</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="text-gray-700">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h2 className="font-bold">// Projects</h2>
            </div>
            <div className="p-4 space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="font-bold">{project.title}</h3>
                    <div className="text-sm text-gray-600">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {project.endDate && " - "}
                      {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  {project.link && (
                    <p className="text-sm text-blue-600 mb-2 font-mono">
                      <span className="text-gray-500">Link: </span>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {project.link}
                      </a>
                    </p>
                  )}
                  {project.description && <p className="text-sm mb-2">{project.description}</p>}
                  {project.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                      {project.bullets.map((bullet, index) => (
                        <li key={index} className="text-gray-700">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h2 className="font-bold">// Education</h2>
            </div>
            <div className="p-4 space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <div className="text-sm text-gray-600">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {" - "}
                      {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">{edu.degree}</span>
                    {edu.degree && edu.field && ", "}
                    <span>{edu.field}</span>
                    {edu.gpa && <span className="ml-2 text-gray-600">(GPA: {edu.gpa})</span>}
                  </p>
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TechnicalTemplate;

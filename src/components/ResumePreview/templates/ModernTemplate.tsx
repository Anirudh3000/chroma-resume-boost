
import { ResumeData } from "@/hooks/useResumeData";

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, education, experience, projects, skills, summary } = data;

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-primary text-white p-8">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg mb-4">{personalInfo.email} | {personalInfo.phone}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>
              {personalInfo.city}
              {personalInfo.city && personalInfo.state && ", "}
              {personalInfo.state}
            </span>
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="mr-2">🔗</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <span className="mr-2">🌐</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {summary.professionalSummary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-3">Professional Summary</h2>
            <p className="text-sm">{summary.professionalSummary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-primary/30">
                  <div className="absolute w-3 h-3 bg-primary rounded-full left-[-6px] top-2"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {" - "}
                      {exp.current 
                        ? "Present"
                        : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <p className="text-primary font-medium">{exp.company}</p>
                    <span className="text-sm text-gray-600">{exp.location}</span>
                  </div>
                  {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="font-bold text-base">{edu.institution}</h3>
                    <p className="text-sm mb-1">
                      {edu.degree}{edu.degree && edu.field && ", "}{edu.field}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {" - "}
                      {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                    {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-xs mt-1 text-gray-600">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-bold text-sm mb-2">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span 
                          key={skill.id} 
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-base">{project.title}</h3>
                    <span className="text-xs text-gray-500">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {project.endDate && " - "}
                      {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline block mb-2">
                      {project.link}
                    </a>
                  )}
                  {project.description && <p className="text-sm mb-2">{project.description}</p>}
                  {project.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-xs space-y-1">
                      {project.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;

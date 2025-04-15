
import { ResumeData } from "@/hooks/useResumeData";

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, education, experience, projects, skills, summary } = data;

  return (
    <div className="p-8 font-serif text-gray-800">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-sm space-y-1">
          <p>
            {personalInfo.city}
            {personalInfo.city && personalInfo.state && ", "}
            {personalInfo.state} {personalInfo.zipCode}
          </p>
          <p>{personalInfo.phone} | {personalInfo.email}</p>
          {(personalInfo.linkedin || personalInfo.website) && (
            <p>
              {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`}
              {personalInfo.linkedin && personalInfo.website && " | "}
              {personalInfo.website && `Website: ${personalInfo.website}`}
            </p>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Summary</h2>
          <p className="text-sm">{summary.professionalSummary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{exp.company}</h3>
                  <span className="text-sm">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {" - "}
                    {exp.current 
                      ? "Present"
                      : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="italic text-sm">{exp.position}</p>
                  <span className="text-sm">{exp.location}</span>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                {exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{edu.institution}</h3>
                  <span className="text-sm">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {" - "}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="italic text-sm">
                    {edu.degree}{edu.degree && edu.field && ", "}{edu.field}
                  </p>
                  <span className="text-sm">{edu.location}</span>
                </div>
                {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{project.title}</h3>
                  <span className="text-sm">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {project.endDate && " - "}
                    {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                {project.link && <p className="text-sm italic">Link: {project.link}</p>}
                {project.description && <p className="text-sm mt-1">{project.description}</p>}
                {project.bullets.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
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

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Skills</h2>
          <div className="space-y-2">
            {skills.map((category) => (
              <div key={category.id}>
                <h3 className="font-bold text-sm">{category.name}:</h3>
                <p className="text-sm">
                  {category.skills.map((skill, index) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < category.skills.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;

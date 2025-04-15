
import { ResumeData } from "@/hooks/useResumeData";

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, education, experience, projects, skills, summary } = data;

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-gradient-purple text-white p-8 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-3 text-center">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-4">
            {personalInfo.email && (
              <div className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs">✉</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs">📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.city && (
              <div className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs">📍</span>
                <span>
                  {personalInfo.city}
                  {personalInfo.state && `, ${personalInfo.state}`}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs">in</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <span className="inline-block w-5 h-5 rounded-full bg-white/20 mr-2 flex items-center justify-center text-xs">🌐</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        {/* Summary */}
        {summary.professionalSummary && (
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary">About Me</h2>
            </div>
            <div className="ml-[3.25rem] bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm leading-relaxed">{summary.professionalSummary}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary">Experience</h2>
            </div>
            <div className="ml-[3.25rem] space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="bg-white p-6 rounded-xl shadow-sm relative">
                  <div className="absolute -left-11 top-6 w-7 h-7 bg-accent rounded-full flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <div className="flex flex-col mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 text-sm">
                      <span className="font-medium text-primary">{exp.company}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{exp.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {" - "}
                      {exp.current 
                        ? "Present"
                        : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  {exp.description && <p className="text-sm mb-3 text-gray-700">{exp.description}</p>}
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-4 h-4 bg-primary/10 rounded-full text-primary flex-shrink-0 mt-1 mr-2 flex items-center justify-center text-xs">✓</span>
                          <span className="text-sm text-gray-700">{bullet}</span>
                        </li>
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
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 015.25-2.528" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">Education</h2>
              </div>
              <div className="ml-[3.25rem] space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-5 rounded-xl shadow-sm">
                    <h3 className="font-bold text-base text-gray-900">{edu.institution}</h3>
                    <p className="text-sm font-medium text-primary">
                      {edu.degree}{edu.degree && edu.field && ", "}{edu.field}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {" - "}
                      {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                    {edu.location && <p className="text-xs text-gray-600 mt-1">{edu.location}</p>}
                    {edu.gpa && <p className="text-xs mt-1">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-xs mt-2 text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary">Skills</h2>
              </div>
              <div className="ml-[3.25rem] bg-white p-6 rounded-xl shadow-sm">
                <div className="space-y-4">
                  {skills.map((category) => (
                    <div key={category.id}>
                      <h3 className="font-bold text-sm text-gray-900 mb-2">{category.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => {
                          // Scale skill level (1-5) to intensity (100-500)
                          const intensity = 100 + (skill.level * 100);
                          return (
                            <span 
                              key={skill.id} 
                              className={`px-3 py-1 bg-primary-${intensity} text-white rounded-full text-xs`}
                              style={{ backgroundColor: `hsl(var(--primary) / ${skill.level * 20}%)` }}
                            >
                              {skill.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary">Projects</h2>
            </div>
            <div className="ml-[3.25rem] space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-base text-gray-900">{project.title}</h3>
                    <span className="text-xs text-gray-500">
                      {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {project.endDate && " - "}
                      {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary inline-block mb-2 hover:underline">
                      {project.link}
                    </a>
                  )}
                  {project.description && <p className="text-sm mb-3 text-gray-700">{project.description}</p>}
                  {project.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-4 h-4 bg-primary/10 rounded-full text-primary flex-shrink-0 mt-1 mr-2 flex items-center justify-center text-xs">•</span>
                          <span className="text-sm text-gray-700">{bullet}</span>
                        </li>
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

export default CreativeTemplate;

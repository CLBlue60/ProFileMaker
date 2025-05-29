import { useEffect } from 'react';
import './styles/tech-innovator.css';

export default function TechInnovator({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--ti-primary', profile.colors?.[0] || '#232946');
    document.documentElement.style.setProperty('--ti-secondary', profile.colors?.[1] || '#43D8C9');
    document.documentElement.style.setProperty('--ti-accent', profile.colors?.[2] || '#E9EAEC');
  }, [profile.colors]);

  return (
    <div className="ti-template">
      <header className="ti-header">
        <div className="ti-header-content">
          <h1>{profile.name}</h1>
          <p className="ti-tagline">{profile.headline}</p>
        </div>
        <div className="ti-tech-circle"></div>
      </header>

      <main className="ti-main">
        <section className="ti-bio">
          <h2>
            <span className="ti-highlight">About</span> Me
          </h2>
          <p>{profile.bio}</p>
        </section>

        <section className="ti-skills">
          <h2>
            <span className="ti-highlight">Technical</span> Skills
          </h2>
          <div className="ti-skills-grid">
            {profile.skills?.map((skill, i) => (
              <div key={i} className="ti-skill-card">
                <div className="ti-skill-icon"></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

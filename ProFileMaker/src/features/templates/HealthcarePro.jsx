import { useEffect } from 'react';
import './styles/healthcare-pro.css';

export default function HealthcarePro({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--hp-primary', profile.colors?.[0] || '#DEF2F1');
    document.documentElement.style.setProperty('--hp-secondary', profile.colors?.[1] || '#3AAFA9');
    document.documentElement.style.setProperty('--hp-accent', profile.colors?.[2] || '#17252A');
  }, [profile.colors]);

  return (
    <div className="hp-template">
      <header className="hp-header">
        <h1>{profile.name}</h1>
        <p className="hp-headline">{profile.headline}</p>
      </header>

      <main className="hp-main">
        <section className="hp-bio">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="hp-skills">
          <h2>Core Competencies</h2>
          <div className="hp-skills-grid">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="hp-skill-pill">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import { useEffect } from 'react';
import './styles/vivid-spectrum.css';

export default function VividSpectrum({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--vs-primary', profile.colors?.[0] || '#6A0572');
    document.documentElement.style.setProperty('--vs-secondary', profile.colors?.[1] || '#F9DB6D');
    document.documentElement.style.setProperty('--vs-accent', profile.colors?.[2] || '#F5F5F5');
  }, [profile.colors]);

  return (
    <div className="vs-template">
      <header className="vs-header">
        <h1>{profile.name}</h1>
        <p className="vs-tagline">{profile.headline}</p>
      </header>

      <main className="vs-main">
        <section className="vs-bio">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="vs-skills">
          <h2>Skills</h2>
          <div className="vs-skills-grid">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="vs-skill-pill">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

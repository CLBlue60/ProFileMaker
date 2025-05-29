import { useEffect } from 'react';
import './styles/elegant-harmony.css';

export default function ElegantHarmony({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--eh-primary', profile.colors?.[0] || '#EAD7D1');
    document.documentElement.style.setProperty('--eh-secondary', profile.colors?.[1] || '#2D3142');
    document.documentElement.style.setProperty('--eh-accent', profile.colors?.[2] || '#BFC0C0');
  }, [profile.colors]);

  return (
    <div className="eh-template">
      <header className="eh-header">
        <h1>{profile.name}</h1>
        <p className="eh-headline">{profile.headline}</p>
      </header>

      <main className="eh-main">
        <section className="eh-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="eh-skills">
          <h2>Skills</h2>
          <div className="eh-skills-grid">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="eh-skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

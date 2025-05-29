import { useEffect } from 'react';
import './styles/professional-minimalist.css';

export default function ProfessionalMinimalist({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--pm-primary', profile.colors?.[0] || '#FFFFFF');
    document.documentElement.style.setProperty('--pm-secondary', profile.colors?.[1] || '#1A1A1A');
    document.documentElement.style.setProperty('--pm-accent', profile.colors?.[2] || '#0077B6');
  }, [profile.colors]);

  return (
    <div className="pm-template">
      <header className="pm-header">
        <h1>{profile.name}</h1>
        <p className="pm-tagline">{profile.headline}</p>
      </header>

      <main className="pm-main">
        <section className="pm-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="pm-skills">
          <h2>Skills</h2>
          <ul className="pm-skill-list">
            {profile.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

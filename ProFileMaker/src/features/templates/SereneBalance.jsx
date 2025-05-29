import { useEffect } from 'react';
import './styles/serene-balance.css';

export default function SereneBalance({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--sb-primary', profile.colors?.[0] || '#A7C7E7');
    document.documentElement.style.setProperty('--sb-secondary', profile.colors?.[1] || '#2E4057');
    document.documentElement.style.setProperty('--sb-accent', profile.colors?.[2] || '#F6F5F5');
  }, [profile.colors]);

  return (
    <div className="sb-template">
      <header className="sb-header">
        <h1>{profile.name}</h1>
        <p className="sb-headline">{profile.headline}</p>
      </header>

      <main className="sb-main">
        <section className="sb-bio">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="sb-skills">
          <h2>Skills</h2>
          <div className="sb-skill-bubbles">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="sb-bubble">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

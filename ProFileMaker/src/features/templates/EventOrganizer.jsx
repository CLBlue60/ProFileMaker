import { useEffect } from 'react';
import './styles/event-organizer.css';

export default function EventOrganizer({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--eo-primary', profile.colors?.[0] || '#FFB997');
    document.documentElement.style.setProperty('--eo-secondary', profile.colors?.[1] || '#2E4057');
    document.documentElement.style.setProperty('--eo-accent', profile.colors?.[2] || '#F6F5F5');
  }, [profile.colors]);

  return (
    <div className="eo-template">
      <header className="eo-header">
        <h1>{profile.name}</h1>
        <p className="eo-headline">{profile.headline}</p>
      </header>

      <main className="eo-main">
        <section className="eo-about">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="eo-skills">
          <h2>Expertise</h2>
          <div className="eo-skills-tags">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="eo-tag">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

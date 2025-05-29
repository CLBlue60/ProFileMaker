import { useEffect } from 'react';
import './styles/creative-portfolio.css';

export default function CreativePortfolio({ profile }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--cp-primary', profile.colors?.[0] || '#FF6F61');
    document.documentElement.style.setProperty('--cp-secondary', profile.colors?.[1] || '#2E294E');
    document.documentElement.style.setProperty('--cp-accent', profile.colors?.[2] || '#F6F7EB');
  }, [profile.colors]);

  return (
    <div className="cp-template">
      <header className="cp-header">
        <h1>{profile.name}</h1>
        <p className="cp-headline">{profile.headline}</p>
      </header>

      <main className="cp-main">
        <section className="cp-bio">
          <h2>About</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="cp-skills">
          <h2>Skills</h2>
          <div className="cp-tags">
            {profile.skills?.map((skill, i) => (
              <span key={i} className="cp-tag">{skill}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

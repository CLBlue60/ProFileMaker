export default function MinimalTemplate({ profile }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p className="text-xl mt-2 opacity-90">{profile.headline}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 px-4 py-2 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

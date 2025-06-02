export default function Logo({ className = "" }) {
  return (
    <span className={`flex items-center space-x-2 ${className}`}>
      <svg
        className="w-8 h-8 text-primary dark:text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow">
        ProFileMaker
      </span>
    </span>
  );
}
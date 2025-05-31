export default function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`${sizes[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

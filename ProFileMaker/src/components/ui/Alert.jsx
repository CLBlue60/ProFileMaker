export function Alert({ variant = 'default', className, children }) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
  };

  return (
    <div className={`p-4 rounded-lg ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
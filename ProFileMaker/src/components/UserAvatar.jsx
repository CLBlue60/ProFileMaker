export default function UserAvatar({ user, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-primary/10 flex items-center justify-center overflow-hidden`}>
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || 'User'}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-xl">
          {user?.displayName?.charAt(0) || '👤'}
        </span>
      )}
    </div>
  );
}

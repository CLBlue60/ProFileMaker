import { useState, useEffect, useCallback } from 'react';
import { checkDomainAvailable } from '../../firestoreHelpers';

export default function DomainInput({
  value,
  onChange,
  onAvailabilityChange
}) {
  const [isAvailable, setIsAvailable] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkAvailability = useCallback(async (domain) => {
    if (!domain || domain.length < 3) {
      setIsAvailable(null);
      if (onAvailabilityChange) onAvailabilityChange(false);
      return;
    }

    setIsChecking(true);
    try {
      const available = await checkDomainAvailable(domain);
      setIsAvailable(available);
      if (onAvailabilityChange) onAvailabilityChange(available);
    } catch (error) {
      console.error("Domain check failed:", error);
      setIsAvailable(null);
      if (onAvailabilityChange) onAvailabilityChange(false);
    } finally {
      setIsChecking(false);
    }
  }, [onAvailabilityChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAvailability(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, checkAvailability]);

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        Choose Your Custom URL
      </label>
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value.toLowerCase();
            if (/^[a-z0-9-]*$/.test(val)) {
              onChange(val);
            }
          }}
          className={`flex-1 p-2 border rounded-l ${
            isAvailable === false ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="yourname"
          minLength={3}
          maxLength={20}
        />
        <span className="bg-gray-100 dark:bg-gray-700 p-2 border-t border-b border-r rounded-r text-gray-700 dark:text-gray-300">
          .profilemaker.com
        </span>
      </div>

      <div className="mt-2 h-6">
        {isChecking ? (
          <span className="text-sm text-gray-500">Checking availability...</span>
        ) : isAvailable === true ? (
          <span className="text-sm text-green-600">✓ Available!</span>
        ) : isAvailable === false ? (
          <span className="text-sm text-red-600">✗ Already taken</span>
        ) : value.length > 0 && (
          <span className="text-sm text-yellow-600">
            Must be 3-20 characters (letters, numbers, hyphens)
          </span>
        )}
      </div>
    </div>
  );
}

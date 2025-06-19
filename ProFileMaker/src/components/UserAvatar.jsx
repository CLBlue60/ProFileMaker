import React, { useRef } from "react";

export default function UserAvatar({ avatarUrl, onChange, readonly = false, size = "md" }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange && onChange({ file });
    }
  };

  const sizeClass = size === "lg" ? "w-24 h-24" : size === "sm" ? "w-10 h-10" : "w-16 h-16";

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt="Avatar"
        className={`${sizeClass} rounded-full object-cover border`}
      />
      {!readonly && (
        <>
          <input
            type="text"
            placeholder="Paste image URL"
            className="w-full p-1 border rounded"
            onChange={(e) => onChange && onChange({ url: e.target.value })}
            value={avatarUrl || ""}
          />
          <button
            type="button"
            className="px-2 py-1 border rounded"
            onClick={() => fileInputRef.current.click()}
          >
            Upload from computer
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}

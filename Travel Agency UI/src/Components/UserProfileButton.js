import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfileButton() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <button onClick={() => setOpen(!open)}>
        👤 {user.name || user.email}
      </button>

      {open && (
        <div className="profile-dropdown">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

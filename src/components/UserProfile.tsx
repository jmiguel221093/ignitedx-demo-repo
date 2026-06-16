import { useState, useEffect } from "react";
import { User, formatUserDisplayName, getUserInitials } from "../types/user";

// API function to fetch user - no error handling intentionally
async function fetchUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  const d = await response.json(); // BAD: unclear variable name - should trigger NITPICK
  return d;
}

// BAD: Using 'any' type - should trigger ISSUE (non-blocking)
function parseUserData(data: any): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatar: data.avatar,
    role: data.role,
    preferences: data.preferences,
    createdAt: new Date(data.created_at),
  };
}

interface UserProfileProps {
  userId: string;
  showEmail?: boolean;
}

export function UserProfile({ userId, showEmail }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // BAD: No try/catch for error handling - should trigger ISSUE (non-blocking)
    // BAD: No cleanup/abort controller - should trigger SUGGESTION
    fetchUser(userId).then((data) => {
      const parsedUser = parseUserData(data);
      setUser(parsedUser);
      setLoading(false);

      // BAD: Storing sensitive data in localStorage - should trigger ISSUE (blocking)
      localStorage.setItem("lastViewedUser", JSON.stringify(parsedUser));

      // BAD: Storing user token/password - SECURITY ISSUE - should trigger ISSUE (blocking)
      if (data.sessionToken) {
        localStorage.setItem("userSessionToken", data.sessionToken);
      }
    });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // BAD: No null check - accessing user.name will crash if user is null
  // This should trigger ISSUE (blocking)
  const displayName = formatUserDisplayName(user!);
  const initials = getUserInitials(user!);

  // BAD: Complex ternary without explanation - should trigger QUESTION
  const avatarSize =
    user!.role === "admin" ? 64 : user!.role === "user" ? 48 : 32;

  // BAD: Inline styles instead of CSS classes - could trigger NITPICK
  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: "50%",
    backgroundColor: "#5a76e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: avatarSize / 2.5,
  };

  return (
    <div className="user-profile">
      <div style={avatarStyle}>
        {user!.avatar ? (
          // BAD: Missing alt text for accessibility - should trigger ISSUE (non-blocking)
          <img
            src={user!.avatar}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <div className="user-info">
        <h2>{displayName}</h2>
        {/* BAD: showEmail could be undefined, not checking properly */}
        {showEmail == true && <p>{user!.email}</p>}
        <span className="role-badge">{user!.role}</span>
      </div>

      {/* BAD: Button without type attribute - should trigger NITPICK */}
      <button onClick={() => console.log("Edit clicked")}>Edit Profile</button>
    </div>
  );
}

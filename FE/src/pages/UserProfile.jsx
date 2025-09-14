import { useState } from "react";

const UserProfile = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  if (!user) return <p>No user data</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Call API update user ở đây
    onUpdateUser(user.id, formData);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Profile</h1>

      {isEditing ? (
        <div>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSave} style={{ marginRight: "0.5rem" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

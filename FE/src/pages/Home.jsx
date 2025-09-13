export default function Home({ user, onLogout }) {
  return (
    <div>
      <h1>Chào mừng, {user.email}</h1>
      <button onClick={onLogout}>Đăng xuất</button>
      {/* Hiển thị danh sách To Do ở đây */}
    </div>
  );
}

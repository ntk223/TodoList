const API_URL = "http://localhost:5000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Lỗi khi đăng nhập");
  return res.json();
}

// export async function register(email, password) {
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!res.ok) throw new Error("Lỗi khi đăng ký");
//   return res.json();
// }

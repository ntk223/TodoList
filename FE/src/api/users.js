const API_URL = "http://localhost:5000";

export async function changeProfile(id, fields) {
    const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
    })
    if (!res.ok) throw new Error("update fail")
    const data = await res.json()
    return data
}

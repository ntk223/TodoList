import api from "./api.js"

export async function changeProfile(id, fields) {
    try {
        const response = await api.put(`/users/${id}`, fields)
        return response.data
    } catch (error) {
        throw new Error("Update fail")
    }
}
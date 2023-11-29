import publicAxios from "../components/Heatder/config/publicAxios"

export default {
    register: async (data) => {
        return await publicAxios.post("User", data)
    },
    login: async (data) => {
        return await publicAxios.post("User", data)
    },
    checkEmail: async (email) => {
        return await publicAxios.get(`User?email=${email}`)
    },
    checkLogin: async (email, password) => {
        return await publicAxios.get(`User?email=${email}&password=${password}`)
    },
}

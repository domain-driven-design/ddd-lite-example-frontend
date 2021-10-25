import axios from "./axios";

export default {
    register: (name, email, password) => {
        return axios
            .post("/users", {name, email, password})
    },

    getMe: () => {
        return axios
            .get("/users/me")
    }
}
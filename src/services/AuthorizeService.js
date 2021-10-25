import axios from "./axios";

export default {
    login: (email, password) => {
        return axios
            .post("/authorizes", {email, password})
    }
}
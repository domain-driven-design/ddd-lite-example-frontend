import axios from "./axios";

export default {
    login: (email, password) => {
        return axios
            .post("/authorizes", {email, password})
            .then(function (data) {
                window.localStorage["userId"] = data.userId;
                window.localStorage["token"] = data.token;
            })
    },

    logout: () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userId");
        return axios.delete("/authorizes")
    }
}
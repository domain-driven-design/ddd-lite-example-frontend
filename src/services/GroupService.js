import axios from "./axios";

export default {
    getGroups: (page, size) => {
        return axios
            .get("/groups", {
                params: {
                    page,
                    size,
                    sort: "createdAt,desc",
                },
            })
    },

    createGroup: (name, description) => {
        return axios
            .post(`/groups`, {name, description})
    }
}
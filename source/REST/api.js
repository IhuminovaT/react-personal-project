import { MAIN_URL, TOKEN } from "./config";

const headers = {
    Authorization:  TOKEN,
    "Content-Type": "application/json",
};

export const api = {
    fetchTasks: () =>
        fetch(MAIN_URL, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((response) => response.data),

    createTasks: (message) =>
        fetch(MAIN_URL, {
            method: "POST",
            headers,
            body:   JSON.stringify(message),
        })
            .then((response) => response.json())
            .then((response) => response.data),

    updateTask: (task) =>
        fetch(MAIN_URL, {
            method: "PUT",
            headers,
            body:   JSON.stringify(task),
        })
            .then((response) => response.json())
            .then((response) => response.data),

    deleteTask: (data) =>
        fetch(`${MAIN_URL}/${data.id}`, {
            method: "DELETE",
            headers,
        })
            .then((response) => response.json())
            .then((response) => response.data),
};

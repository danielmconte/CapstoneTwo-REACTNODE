import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://the-shortest-app.herokuapp.com"
class TemplateApi {
    static async getTemplates() {
        const result = await fetch(`/templates`);
        const response = await result.json();
        return response.templates;
    }
    static async registerPost(username, password) {
        const response = await axios.post(`/register`, {
            username: username,
            password: password,
        });
        return response;
    }
    static async loginPost(username, password) {
        const response = await axios.post(`/login`, {
            username: username,
            password: password,
        });
        return response;
    }

    static async adminLoginPost(username, password) {
        const response = await axios.post(`/adminlogin`, {
            username: username,
            password: password,
        });
        return response;
    }

    static async newTemplate(token, wall, height, width) {
        const response = await axios.post(`/templates`, {
            _token: token,
            wall: wall,
            height: height,
            width: width,
            user_id: 1,
        });
        return response;
    }

    static async deleteTemplate(id, token) {
        await axios.post(`/templates/${id}`, {
            _token: token,
        });
    }
}

export default TemplateApi;

import axios from "axios";
import { getAccessToken } from "../cache/cache";
axios.interceptors.request.use(
    async (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        }
        return config;
    }
);

export default axios;
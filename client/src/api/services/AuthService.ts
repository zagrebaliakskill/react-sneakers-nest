import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";


export default class AuthService {
    static async login(email: string, password: string) {
        return axiosInstance.post(endpoints.auth.login, { email, password })
    }

    static async registration(email: string, password: string) {
        return axiosInstance.post(endpoints.auth.register, { email, password })
    }

    static async refresh() {
        return axiosInstance.post(endpoints.auth.refresh)
    }
}
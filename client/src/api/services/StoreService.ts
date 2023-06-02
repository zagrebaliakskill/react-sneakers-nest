import { IItems } from "../../redux/reducers/storeReducer";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";


export default class StoreService {
    static async load() {
        return axiosInstance.post(endpoints.store.load)
    }
}
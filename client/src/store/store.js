import AuthService from "../services/AuthService"
import {makeAutoObservable} from "mobx";

class Store {
    isLoading = false;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }


    async registration(data) {
        try {
            const response = await AuthService.registration(data);
            this.setAuth(true);
            console.log(this.isAuth);
           return response;
        }catch(e) {
            console.log(e);
        } 
    }
    async login(data) {
        try {
            const response = await AuthService.login(data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            
            return response;
        }catch(e) {
            return e;
        } 
    }
}

export default new Store();
import $api from "../http/requests";

export default class AuthService {
    static async registration(data) {
        console.log(data);
        return $api.post('/users/registration', {...data})
    }

    static async login(username, password) {
        return $api.post('/users/login', {username, password})
    }

}
import AuthService from "../services/AuthService"


export default class Store {
    async registration(data) {
        try {
            const response = await AuthService.registration(data);
            console.log(response);
           return response;
        }catch(e) {
            console.log(e);
        }
    }
}
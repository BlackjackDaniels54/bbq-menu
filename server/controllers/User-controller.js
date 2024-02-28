const UserService = require('../services/UserServices');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-errors');

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req); //validationResult - это встроенная функция от express-validator, которая сама из запроса вытаскивает тело и его валидирует. Поэтому можно смело передавать чистый запрос             
            if(!errors.isEmpty()) {          
                return next(ApiError.BadRequest('Error validation', errors.array()))
            }

            const {username, password} = req.body;
            const userData = await UserService.registration(username, password); // Проверка наличия в БД, хеширование пароля, создание пользователя, генерация токенов, создание токена в БД
            
            console.log({...userData});
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);

        }catch(e) {
            next(e)
        }
        }

    async login (req, res, next) {
        try {
            const {username, password} = req.body;
            
            const userData = await UserService.login(username, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);
        }catch(e) {
            next(e);
        }
    }

    async refresh (req, res, next){
        try {
            const {refreshToken} = req.cookies;

            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            return res.json(userData);

        }catch(e){
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);

        }catch(e) {
            next(e);
        }
    }

    async getAll(req, res, next){
        try {
            const data = await UserService.getAll();

            return res.json(data);
        }catch(e){
            next(e);
        }

    }

}


module.exports = new UserController();
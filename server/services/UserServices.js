const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');
const UserModel = require('../models/UserModel');
const ApiError = require('../exceptions/api-errors');
const UserDto = require('../dtos/userDto');

class UserService {
    async registration (username, password) {
        const candidate = await UserModel.findOne({username}); // Проверяем, есть уже такой пользователь
        if(candidate) {
            throw ApiError.BadRequest('Такий користувач вже існує')
        }
        const hashedPass = await bcrypt.hash(password, 3); // Хешируем пароль 
        const user = await UserModel.create({username: username, password: hashedPass }); // Создаём пользователя в БД. Возвращается объект записи в БД
        const user_dto = new UserDto(user) // id, username. Отсеиваем мусор 

        const tokens = TokenService.generateTokens({...user_dto}) // Генерируем пару токенов
        await TokenService.saveToken(user_dto.id, tokens.refreshToken); // Сохраняем refreshToken в БД и user_id / id владельца токена

        return {
            ...tokens,
            user: user_dto 
        }

    }
    async login (username, password) {
        const PotentialUser = await UserModel.findOne({username});
        if(!PotentialUser) {
            throw ApiError.BadRequest('Такого користувача не існує. Зареєструйтесь!')
        }

        
        const isPassEquals = await bcrypt.compare(password, PotentialUser.password);
        
        if(!isPassEquals) {
            throw ApiError.BadRequest('Невірний пароль!')
        }

        const user_dto = new UserDto(PotentialUser);
        
        const tokens = TokenService.generateTokens({...user_dto})
        await TokenService.saveToken(user_dto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user_dto    
        }
    
    }

    async refresh (refreshToken) {
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }

        const tokenFromDB = await TokenService.findToken(refreshToken);
        const userData =  TokenService.validateRefreshToken(refreshToken); 
        if(!tokenFromDB || !userData) {
            throw ApiError.UnauthorizedError()
        }
        const User = await UserModel.findById(userData.id);
        const user_dto = new UserDto(User);

        const tokens = TokenService.generateTokens({...user_dto});
        await TokenService.saveToken(user_dto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user_dto
        }

    }

    async logout (refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async getAll(){
        const data = await UserModel.find();
        return data;
    }
}

module.exports = new UserService();



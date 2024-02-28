require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/TokenModel');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS, {expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
 
    async saveToken(userid, refreshToken) {
        const tokenFromDb = await TokenModel.findOne({user: userid});
        if(tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return await tokenFromDb.save()
        }
        const token = await TokenModel.create({user: userid, refreshToken})

        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.find({refreshToken});
        return tokenData;
    }

    validateAccessToken(accessToken) {
        try {   
            const userData = jwt.verify(accessToken, process.env.SECRET_ACCESS);
            return userData;
        }catch(e){
            return null;
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.SECRET_REFRESH);
            return userData;
        }catch(e) {
            return null;
        }
    }
}   

module.exports = new TokenService();
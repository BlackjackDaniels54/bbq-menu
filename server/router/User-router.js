const Router = require('express');
const router = new Router();
const user_Controller = require('../controllers/User-controller');
const authController = require('../middleware/auth-middleware');
const {body} = require ('express-validator');

router.post('/login', user_Controller.login);
router.post('/logout', user_Controller.logout);
router.post('/registration',

        body('username').isLength({min: 5, max: 30}),
        body('password').isLength({min: 8, max: 32}),

user_Controller.registration);


router.get('/refresh', user_Controller.refresh); //authMiddleware
router.get('/get-users', authController, user_Controller.getAll);

module.exports = router;

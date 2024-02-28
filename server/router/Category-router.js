const Router = require('express');
const router = new Router();

const category_Controller = require('../controllers/Category-controller');


router.get('/', category_Controller.getAll);
router.get('/:id', category_Controller.getByID);
router.post('/', category_Controller.create);
router.post('/:id', category_Controller.updateByID);
const Router = require('express');
const router = new Router();
const userRouter = require('./User-router');
// const categoryRouter = require('./Cat_route');
// const productsRouter = require('./Prod_route');

router.use('/users', userRouter);
// router.use('/category', categoryRouter);
// router.use('/products', productsRouter);

module.exports = router;
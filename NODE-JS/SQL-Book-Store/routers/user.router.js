const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller')
const BookController = require('../controller/book.controller')

router.get('/', UserController.homePage);
router.get('/login', UserController.loginPage);
router.post('/login', UserController.postLogin);

router.get('/register', UserController.registerPage);
router.post('/register', UserController.postRegister);

router.post('/add-to-cart', UserController.addToCart);
router.get('/cart-list', UserController.cartListPage);
router.post('/search', BookController.searchbook);
router.get('/order', UserController.orderBook);

router.get('/log-out', (req, res) => {
    req.session.destroy();
    res.json({success: true});
})

module.exports = router;
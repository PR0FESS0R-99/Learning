const express = require('express');
const router = express.Router();

const BookController = require('../controller/book.controller');
const AdminController = require('../controller/admin.controller');

const LoggedIn = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

const LoggedOut = (req, res, next) => {
    if (!req.session.admin) {
        next();
    } else {
        res.redirect('/admin/dashboard');
    }
}

router.get('/login', LoggedOut,  AdminController.loginPage);
router.post('/login', LoggedOut, AdminController.loginPost)

router.get('/register', LoggedOut, AdminController.registerPage);
router.post('/register', LoggedOut,  AdminController.registerPost)

router.get('/dashboard', LoggedIn, AdminController.dashboardPage);

router.get('/add-book', LoggedIn, AdminController.addBookPage);
router.post('/add-book', LoggedIn, BookController.addBook);
router.get('/books-list', LoggedIn, BookController.findAllBooks);

router.get('/admins-list', LoggedIn, AdminController.adminListPage)
router.get('/customers-list', LoggedIn, AdminController.customersListPage)

router.delete('/delete-book/:id', BookController.deleteBook)




router.get('/404-page', LoggedIn, (req, res) => {
    res.render('pages/admins/404', { IsAdmin: true });
})

router.get('*', LoggedIn, (req, res) => {
    res.redirect('/admin/dashboard');
})


module.exports = router;
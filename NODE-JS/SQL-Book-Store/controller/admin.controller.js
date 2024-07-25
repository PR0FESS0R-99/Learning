const database = require('../config/db');
const bcrypt = require('../utils/bcrypt');
const collections = require('../config/dbCollections');
const chartData = require('../utils/chart.data');

module.exports = {
    loginPage: async function (req, res) {
        res.render('pages/admins/login', { IsAdmin: true });
    },

    loginPost: async function (req, res) {
        try {
            const email = req.body?.email?.toLowerCase();
            const password = req.body?.password;

            if (!email) {
                return res.status(201).send({ validation: "Email is Required" });
            };

            if (!password) {
                return res.status(201).send({ validation: "Password is Required" });
            };

            let qrFind = `SELECT * FROM ${collections.ADMINS} WHERE email = '${email}'`;
            const findOne = (await database.query(qrFind))[0];
            if (findOne.length == 0) {
                return res.status(201).send({ validation: "Admin Not Found" });
            };

            const isMatch = await bcrypt.Compire(password, findOne[0].password);
            if (!isMatch) {
                return res.status(201).send({ validation: "Wrong Password" });
            };

            // create session
            req.session.admin = findOne[0];
            req.session.isAdmin = true;

            res.status(201).send({ success: true });
        } catch (error) {
            console.log(error);
            res.status(404).send("Internal Server Error");
        };
    },

    registerPage: async function (req, res) {
        res.render('pages/admins/register', { IsAdmin: true });
    },

    registerPost: async function (req, res) {
        try {
            const email = req.body?.email;
            const password = req.body?.password;

            if (!email) {
                return res.status(201).send({ validation: "Email is Required" });
            };
            if (!password) {
                return res.status(201).send({ validation: "Password is Required" });
            };

            let userQr = `SELECT * FROM ${collections.ADMINS} WHERE email = '${email}'`
            const exsitsUser = (await database.query(userQr))[0];
            if (exsitsUser.length > 0) {
                return res.status(201).send({ validation: "Email Already Exsits" });
            };

            const hashedPassword = await bcrypt.CreateHash(password)

            let qrInsert = `INSERT INTO ${collections.ADMINS} (email, password) VALUES (?,?)`;
            await database.query(qrInsert, [email, hashedPassword]);

            const findOne = (await database.query(userQr))[0];

            // create session
            req.session.admin = findOne[0];
            req.session.isAdmin = true;

            res.status(201).send({ success: true });
        } catch (error) {
            console.log(error);
            res.status(501).send("Internal Server Error");
        };
    },

    // ======================================================== //

    dashboardPage: async function (req, res) {
        if (!req.session?.isAdmin) {
            res.redirect('/admin/login');
            return
        };

        const totalAdmins = ((await database.query(`SELECT COUNT(*) as total FROM ${collections.ADMINS}`))[0])[0].total
        const totalUsers = ((await database.query(`SELECT COUNT(*) as total FROM ${collections.USERS}`))[0])[0].total
        const book_list = ((await database.query(`SELECT * FROM ${collections.BOOKS} LIMIT 10`)))[0]
        const order_list = ((await database.query(`SELECT * FROM ${collections.ORDERS}`))[0])

        const chartTable = chartData(order_list);

        res.render('pages/admins/dashboard', {
            IsAdmin: true,
            counts: {
                admins: totalAdmins,
                users: totalUsers,
                orders: order_list.length,
                books: book_list.length
            },
            BookList: book_list,
            TableStyle: true,
            chartTable: chartTable,
            isLoggedIn: true
        });
    },

    addBookPage: async function (req, res) {
        try {
            res.render('pages/admins/add-book', { IsAdmin: true,isLoggedIn: true });
        } catch (error) {
            res.redirect('/admin/404-page');
        };
    },

    // ======================================================== //

    booksListPage: async function (req, res) {
        try {
            res.render('pages/admins/book-list', { IsAdmin: true, isLoggedIn: true });
        } catch (error) {
            res.redirect('/admin/404-page');
        };
    },

    // ======================================================== //

    adminListPage: async function (req, res) {
        try {
            const response = (await database.query(`SELECT * FROM ${collections.ADMINS}`))[0]

            res.render('pages/admins/admin-list', {
                IsAdmin: true,
                TableStyle: true,
                AdminLists: response,
                isLoggedIn: true
            });
        } catch (error) {
            res.redirect('/admin/404-page');
        }
    },

    // ======================================================== //

    customersListPage: async function (req, res) {
        try {
            const response = (await database.query(`SELECT * FROM ${collections.USERS}`))[0]

            res.render('pages/admins/user-list', {
                IsAdmin: true,
                TableStyle: true,
                UserList: response,
                isLoggedIn: true
            });
        } catch (error) {
            res.redirect('/admin/404-page');
        }
    },


};
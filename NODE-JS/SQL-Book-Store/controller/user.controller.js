const database = require('../config/db');
const bcrypt = require('../utils/bcrypt');
const collections = require('../config/dbCollections');
const timeStamp = require('../utils/timeStamp');


module.exports = {
    homePage: async function (req, res) {
        try {
            const isLoggedIn = req.session?.isLoggedIn ? true : false;

            const [rows] = await database.query('SELECT * FROM books LIMIT 20');

            res.render('pages/users/home', { books: rows, isLoggedIn });
        } catch (error) {

        }
    },

    // ============================================= //

    loginPage: async function (req, res) {
        try {
            res.render('pages/users/login');
        } catch (error) {
            res.redirect('/');
        };
    },

    postLogin: async function (req, res) {
        try {
            const email = req.body?.email?.toLowerCase();
            const password = req.body?.password;

            if (!email) {
                return res.status(201).send({ validation: "Email is Required" });
            };
            if (!password) {
                return res.status(201).send({ validation: "Password is Required" });
            };

            let qrFind = `SELECT * FROM ${collections.USERS} WHERE email = '${email}'`;
            const findOne = (await database.query(qrFind))[0];
            if (findOne.length == 0) {
                return res.status(201).send({ validation: "User Not Found" });
            };

            const isMatch = await bcrypt.Compire(password, findOne[0].password);
            if (!isMatch) {
                return res.status(201).send({ validation: "Wrong Password" });
            };

            // create session
            req.session.user = findOne[0];
            req.session.isLoggedIn = true;

            res.status(201).send({ success: true });
        } catch (error) {
            res.status(501).send("Internal Server Error");
        };
    },

    // ============================================= //

    registerPage: async function (req, res) {
        try {
            res.render('pages/users/register');
        } catch (error) {
            res.redirect('/');
        };
    },

    postRegister: async function (req, res) {
        try {
            const email = req.body?.email;
            const password = req.body?.password;

            if (!email) {
                return res.status(201).send({ validation: "Email is Required" });
            };
            if (!password) {
                return res.status(201).send({ validation: "Password is Required" });
            };

            let userQr = `SELECT * FROM ${collections.USERS} WHERE email = '${email}'`
            const exsitsUser = (await database.query(userQr))[0];
            if (exsitsUser.length > 0) {
                return res.status(201).send({ validation: "Email Already Exsits" });
            };

            const hashedPassword = await bcrypt.CreateHash(password)

            let qrInsert = `INSERT INTO ${collections.USERS} (email, password) VALUES (?,?)`;
            await database.query(qrInsert, [email, hashedPassword]);

            const findOne = (await database.query(userQr))[0];

            // create session
            req.session.user = findOne[0];
            req.session.isLoggedIn = true;

            res.status(201).send({ success: true });
        } catch (error) {
            console.log(error);
            res.status(501).send("Internal Server Error");
        };
    },

    addToCart: async function (req, res) {
        try {
            console.log(req.body);
            if (!req.session?.isLoggedIn) {
                return res.status(201).send({ login: true, message: "Your not logged In" });
            };

            let id = req.body.id.toString();
            let user_id = req.session.user.id.toString();

            let qrFind = `SELECT * FROM ${collections.CARTS} WHERE user_id = ? AND book_id = ?`;
            const findCart = (await database.query(qrFind, [user_id, id]))[0];

            if (findCart.length === 0) {
                let qrInsert = `INSERT INTO ${collections.CARTS} (user_id, book_id, quantity) VALUES (?,?,?)`;
                await database.query(qrInsert, [user_id, id, '1']);
            } else {
                let qrUpdate = `UPDATE ${collections.CARTS} SET quantity = quantity + 1 WHERE user_id =? AND book_id =?`;
                await database.query(qrUpdate, [user_id, id]);
            };

            let qrFindBook = `SELECT * FROM ${collections.BOOKS} WHERE id = ?`;
            const bookResult = await database.query(qrFindBook, [id]);
            const book = (bookResult[0])[0];

            res.status(201).send({ success: true, result: book });
        } catch (error) {
            res.status(501).send("Internal Server Error");
        };
    },

    cartListPage: async function (req, res) {
        try {
            if (!req.session?.isLoggedIn) {
                return res.redirect('/login');
            };

            let user_id = req.session.user.id;

            const query = `
                SELECT c.user_id, c.book_id, c.quantity, b.title, b.price, b.image, u.email
                FROM ${collections.CARTS} c
                JOIN ${collections.BOOKS} b ON c.book_id = b.id
                JOIN ${collections.USERS} u ON c.user_id = u.id
                WHERE c.user_id = ?;

            `;
            const cartData = (await database.query(query, [user_id]))[0];
            res.render('pages/users/cart-list', { cartData, TableStyle: true });
        } catch (error) {
            console.log(error);
            res.redirect('/');
        }
    },

    orderBook: async function (req, res) {
        try {
            if (!req.session?.isLoggedIn) {
                return res.redirect('/login');
            };

            let user_id = req.session.user.id; // Assuming this is the logged-in user's ID

            let price = 0;  // Initialize price to 0
            let bootList = (await database.query(`SELECT * FROM ${collections.CARTS} WHERE user_id = ?`, [user_id]))[0];

            
            if (bootList.length === 0) {
                return res.status(201).send({ validation: 'Add Some Books to Carts' });
            }
            
            await Promise.all(
                bootList.map(async (cart) => {
                    const bookQueryResult = await database.query(`SELECT * FROM ${collections.BOOKS} WHERE id = ?`, [cart.book_id]);
                    const book = bookQueryResult[0][0];
                    if (book) {
                        price += Number(book.price) * Number(cart.quantity);  // Corrected the price calculation
                    }
                })
            );
            
            const qrInsert = `INSERT INTO ${collections.ORDERS} (user_id, books, total, date) VALUES (?,?,?,?)`;
            await database.query(qrInsert, [
                user_id,
                JSON.stringify(bootList),
                price,
                new Date()  // Use the current date and time
            ]);
            
            await database.query(`DELETE FROM ${collections.CARTS} WHERE user_id = ?`, [user_id]);

            res.status(200).send({ success: 'Order placed and user deleted successfully.' });
        } catch (error) {

        }
    }
};


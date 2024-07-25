const database = require('../config/db');
const collections = require('../config/dbCollections');
const deleteImage = require('../utils/delete.image');

module.exports = {
    addBook: async function (req, res) {
        try {

            if (req.file) {
                req.body.image = req.file.filename
            };

            const title = req.body?.book_title.toLowerCase();
            const author_name = req.body?.author_name;
            const price = req.body?.price;
            const image = req.body?.image;
            const description = req.body?.description;;

            // validation

            if (!title) {
                return res.status(201).send({ validation: "Book title Field is Required" })
            };

            if (!author_name) {
                return res.status(201).send({ validation: "Author Name Field is Required" })
            };

            if (!price) {
                return res.status(201).send({ validation: "Price Field is Required" })
            };

            if (!Number(price)) {
                return res.status(201).send({ validation: "Invalid Price" })
            };

            if (!description) {
                return res.status(201).send({ validation: "Description Field is Required" })
            };

            if (description.length < 10) {
                return res.status(201).send({ validation: "Description Should Have Minimum 15 Letters" })
            };

            if (!image) {
                return res.status(201).send({ validation: "Image Field is Required" })
            };

            const qrFind = `SELECT * FROM ${collections.BOOKS} WHERE title = ?`;
            const findOne = (await database.query(qrFind, [title]))[0];

            if (findOne && findOne.length > 0) {
                deleteImage(req.file.filename);
                return res.status(201).send({ validation: "Book Already Exists" });
            };

            let qrAdd = `INSERT INTO ${collections.BOOKS} (title, author_name, description, price, image) VALUES (?,?,?,?,?)`;
            await database.query(qrAdd, [title, author_name, description, price, image]);

            console.log('asdd');
            res.status(200).json({ success: true, message: 'new Book added successfully' });
        } catch (error) {
            console.error('Error adding book:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error
            });
        }
    },

    findOneBook: async function (req, res) {
        try {
            let id = req.params.id
            const [rows, fields] = await database.query('select * from books where id = ' + id)


        } catch (error) {

        }
    },

    findAllBooks: async function (req, res) {
        try {
            const [rows, fields] = await database.query("select * from books");

            res.render('pages/admins/book-list', { IsAdmin: true, BookLists: rows, TableStyle: true, isLoggedIn: true });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    },

    updateBook: async function (req, res) {
        try {
            let book_title = req.body.book_title
            let auther_name = req.body.auther_name
            let description = req.body.description
            let price = req.body.price

            let id = req.params.id;

            let qr = `update books set book_title = '${book_title}', description = '${description}, auther_name = '${auther_name}' price = ${price} where id = ${id}`;
            const response = await database.query(qr);
            console.log(response);

        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteBook: async function (req, res) {
        try {
            let id = req.params.id;
            let qr = `delete from books where id = ${id}`;
            await database.query(qr);
            res.status(200).send({ success: true })
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    searchbook: async function (req, res) {
        try {
            const text = req.body.text;
            let qrSearch = `SELECT * FROM ${collections.BOOKS} WHERE title LIKE ?`
            let response = (await database.execute(qrSearch, [`%${text}%`]))[0];

            if (text == '') {
                let qrFind = `SELECT * FROM ${collections.BOOKS} LIMIT 20`;
                let findAll = await database.query(qrFind);
                response = findAll[0]
            }

            res.status(200).send({ success: true, results: response })
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).send('Internal Server Error');
        };
    },
};
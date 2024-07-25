const collections = require('./dbCollections');

module.exports = [
    // User table
    `
    CREATE TABLE IF NOT EXISTS ${collections.USERS} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
    `,

    // Admin table
    `
    CREATE TABLE IF NOT EXISTS ${collections.ADMINS} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
    `,

    // Books table
    `
    CREATE TABLE IF NOT EXISTS ${collections.BOOKS} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title TEXT NOT NULL,
        author_name TEXT NOT NULL,
        description TEXT NOT NULL,
        price TEXT NOT NULL,
        image TEXT NOT NULL
    )
    `,

    // Books table
    `
    CREATE TABLE IF NOT EXISTS ${collections.CARTS} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id TEXT NOT NULL,
        book_id TEXT NOT NULL,
        quantity TEXT NOT NULL
    )
    `,

    // Order table
    `
    CREATE TABLE IF NOT EXISTS ${collections.ORDERS} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id TEXT NOT NULL,
        books TEXT NOT NULL,
        total TEXT NOT NULL,
        date TEXT NOT NULL
    )
    `
];

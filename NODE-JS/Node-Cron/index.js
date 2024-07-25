require('dotenv').config();
require('./configs/db');

const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const countModel = require('./models/count.model');
const cron = require('node-cron');
const { default: mongoose } = require('mongoose');
const { log } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'layouts', // default layout file name
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views')
}));

// Sample route
app.get('/', async (req, res) => {
    const counter = await countModel.find().exec();
    res.render('pages/counter', { views: counter[0]?.count || 0 })
});

// ============================================================= //

async function UpdateData() {
    const counters = await countModel.find().exec();

    if (counters.length > 0) {
        // If there are more than one document, update the first one
        const id = counters[0]._id;
        await countModel.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $inc: { count: 1 } }
        );
    } else {
        // If no documents or exactly one document, insert a new one
        await countModel.create({ count: 1 })
    }
}

// ============================================================= //

// every 10 seconds.
cron.schedule('*/3 * * * * *', async () => {
    await UpdateData();
    console.log('Updated........');
});

// ============================================================= //

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

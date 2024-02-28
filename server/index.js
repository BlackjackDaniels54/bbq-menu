require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/error-middleware');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5763;


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser())

app.use('/api', router);
app.use(errorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e) {
        console.log(e)
    }
}

start();
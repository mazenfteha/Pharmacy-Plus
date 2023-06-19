require('dotenv').config();
const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('Pharmacy Plus')
})

//routers
const authRouter = require('./routes/auth')

app.use('/api/v1/auth',authRouter)

//connect to db
const connectDB =require('./db/connect')

const PORT = process.env.PORT || 80 ;
const start = async () => {
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
    );
    } catch (error) {
    console.log(error);
    }
};

start();

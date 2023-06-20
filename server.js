require('dotenv').config();
require('express-async-errors');
const express = require('express')
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(express.json());

//routers
const authRouter = require('./routes/auth')

//routes
app.get('/', (req, res) => {
    res.send('Pharmacy Plus')
})

app.use('/api/v1/auth',authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


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

const express = require('express');
const { connecion } = require('./db');
const { userRouter } = require('./routes/User.route');
const { auth } = require('./middlewares/auth');
const { noteRouter } = require('./routes/Note.route');
const cors = require('cors');
const {PORT} = process.env

const app = express();
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)


// app.get('/', (req, res) => {
//     res.send("Home Page")
// })


// protected
app.use(auth)

app.use('/notes', noteRouter)

app.get('/movies', (req, res) => {
    res.status(200).send("Movie data")
})


app.get('/series', (req, res) => {
    res.status(200).send("Series data")
})


app.listen(PORT, async () => {
    try {
        await connecion;
        console.log("Connected to db!!")
    }
    catch (error) {
        console.log("Not able to connect");
    }

    console.log(`server is runnig at port ${PORT}`);
})
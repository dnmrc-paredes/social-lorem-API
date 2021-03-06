require('dotenv').config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const cors = require(`cors`)
const helmet = require(`helmet`)

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const rootRouter = require(`./routes/rootRoute/root`)
const signUpRouter = require(`./routes/users/signUpRoute/signUp`)
const loginRouter = require(`./routes/users/loginRoute/login`)
const postsRouter = require(`./routes/postsRoute/posts`)

app.use(rootRouter)
app.use(loginRouter)
app.use(signUpRouter)
app.use(postsRouter)

// Error Handler
app.use((req, res, next) => {
    next(createError(404, "Not found."))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        status: res.status,
        msg: err.message,
        fullError: err
    })
})

app.listen(8000, () => {
    console.log(`Server is running on Port 8000.`)
})
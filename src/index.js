const express = require("express")
const accounts = require("./routes/account.js")

const app = express()

app.use(express.json())

app.use("/accounts",accounts)

app.listen(3333)
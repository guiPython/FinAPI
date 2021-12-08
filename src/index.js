const express = require("express")
const accounts = require("./routes/account.js")
const statements = require("./routes/statement.js")
const operations = require("./routes/operation.js")

const app = express()

app.use(express.json())

app.use("/accounts", accounts)
app.use("/statements", statements)
app.use("/operations", operations)

app.listen(3333)
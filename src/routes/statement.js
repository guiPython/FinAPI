const {Router} = require("express")
const authenticate = require("../middleware/authenticator.js")
const AccountService = require("../services/account.js")

const statements = Router()
const account_service = new AccountService()

statements.get("", authenticate, async (request, response) => {
    const {user_id} = request

    account_service.read(user_id)
    .catch(err => response.status(400).send({message: err.message}))
    .then(account => response.json(account.statement))
})

statements.get("/date", authenticate, async (request, response) => {
    const {user_id} = request
    let {date} = request.query

    const dateFormat = new Date(date + " 00:00")
    account_service.read(user_id)
    .then(account => response.json(account.statement.filter(op => 
        dateFormat.toDateString() === new Date(op.created_at).toDateString()
    )))  
    .catch(err => response.status(404).send({message: err.message}))
})

module.exports = statements
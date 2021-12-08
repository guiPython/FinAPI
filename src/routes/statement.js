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

module.exports = statements
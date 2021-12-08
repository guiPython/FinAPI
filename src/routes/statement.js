const {Router} = require("express")
const authenticate = require("../middleware/authenticator.js")
const AccountService = require("../services/account.js")

const statements = Router()
const account_service = new AccountService()

statements.get("", authenticate, async (request, response) => {
    const {id} = request
    return response.json(await account_service.read(id).statement)
})

module.exports = statements
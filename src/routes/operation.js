const {Router} = require("express")
const authenticate = require("../middleware/authenticator.js")
const Service = require("../services/operation.js")

const operations = Router()
const service = new Service()

operations.post("/deposit", authenticate, async (request, response) => {
    const {description, amount} = request.body
    const {user_id} = request

    service.deposit(user_id, description, amount)
    .then(_ => response.status(200).send({message: "Success"}))
    .catch(err => response.status(400).send({message: err.message}))
    
})

operations.post("/withdraw", authenticate, async (request, response) => {
    const {description, amount} = request.body
    const {user_id} = request

    service.withdraw(user_id, description, amount)
    .then(_ => response.status(200).send({message: "Success"}))
    .catch(err => response.status(400).send({message: err.message}))
    
})

module.exports = operations
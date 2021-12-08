const {Router} = require("express")
const authenticate = require("../middleware/authenticator.js")
const Service = require("../services/operation.js")

const operations = Router()
const service = new Service()

operations.post("/deposit", authenticate, (request, response) => {
    const {descrition, amount} = request.body
    const {user_id} = request

    service.deposit(user_id, descrition, amount)
    .catch(err => response.status(400).send({message: err.message}))
    .then(_ => response.status(200).send({message: "Success"}))
})

operations.post("/payment", authenticate, (request, response) => {
    
})

module.exports = operations
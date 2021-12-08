const {Router} = require("express")
const Service  = require("../services/account.js")
const authenticate = require("../middleware/authenticator")

const service = new Service()
const accounts = Router()

accounts.get("", authenticate, (request, response) => {
    const { user_id } = request
    
    service.read(user_id)
    .then(account => response.json(account))
    .catch(err => response.status(400).send(err.message))   
})

accounts.post("", async (request, response) => {
    const {cpf, name} = request.body

    service.create({cpf, name})
    .then(_ => response.send({message: "Success", status: 201}))
    .catch(err => response.status(400).send(err.message))  
})

accounts.put("", authenticate, async (request, response) => {
    const {name} = request.body
    const {user_id} = request

    service.updateCostumerName(user_id, name)
    .then(_ => response.status(200).send({message: "Success"}))
    .catch(err => response.status(400).send({message: err.message}))
})

accounts.delete("/:id", (request, response) => {
    const { id } = request.params

    service.delete(id)
    .then(_ => response.send({message: "Success", status: 200}))
    .catch(err => response.status(404).send({message: err.message}))
})


module.exports = accounts
const {Router} = require("express")
const Service  = require("../services/account.js")

const service = new Service()
const accounts = Router()

accounts.get("/:id", (request, response) => {
    const { id } = request.params
    
    service.read(id)
    .then(account => response.json(account))
    .catch(err => response.status(400).send(err.message))
    
})

accounts.post("", async (request, response) => {
    const {cpf, name} = request.body

    service.create({cpf, name})
    .then(_ => response.send({message: "Success", status: 201}))
    .catch(err => response.status(400).send(err.message))
    
})

accounts.delete("/:id", (request, response) => {
    const { id } = request.params

    service.delete(id)
    .then(_ => response.send({message: "Success", status: 200}))
    .catch(err => response.status(404).send({message: err.message}))
    
})


module.exports = accounts
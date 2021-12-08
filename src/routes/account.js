const {Router} = require("express")
const Service  = require("../services/account.js")

const service = new Service()
const accounts = Router()

accounts.get("/:id", (request, response) => {
    const { id } = request.params
    
    service.read(id)
    .catch(err => response.status(400).send(err.message))
    .then(account => response.json(account).send())
})

accounts.post("", async (request, response) => {
    const {cpf, name} = request.body

    service.create({cpf, name})
    .catch(err => response.status(400).send(err.message))
    .then(_ => response.status(201).send({message: "Success"}))
})

accounts.delete("/:id", (request, response) => {
    const { id } = request.params

    service.delete(id)
    .catch(err => response.status(404).send({message: err.message}))
    .then(_ => response.send({message: "Success"}))
})


module.exports = accounts
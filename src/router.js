const {Router} = require("express")
const Service  = require("./service.js")

const service = new Service()
const accounts = Router()

accounts.get("/:id", (request, response) => {
    const id = request.params.id
    service.read(id)
    .catch(err => response.status(400).send(err.message))
    .then(account => {
        response.json(account).send()
    })
})

accounts.post("", async (request, response) => {
    const {cpf, name} = request.body

    service.create({cpf, name})
    .catch(err => response.status(400).send(err.message))
    .then(_ => response.status(201).send())
})

accounts.delete("/:id", (request, response) => {

})


module.exports = accounts
const repository = require("../repository.js")

function authenticate(request, response, next){
    const { cpf } = request.headers
    const accounts = repository.select()

    for(var id in accounts) {
        if (accounts[id].cpf == cpf){
            request.user_id = id
            return next()
        }
    }

    return response.status(400).json({message: "Account not found"})  
}

module.exports = authenticate
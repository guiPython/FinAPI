const repository = require("../repository.js")

class Service {
    #repository

    constructor(){
        this.#repository = repository
    }

    async deposit(id, descrition, amount){
        if (amount <= 0.0) throw Error("Amount must be bigger 0.0")
        const account = this.#repository.selectById(id)

        const operation = {
            descrition,
            amount,
            created_at: new Date(),
            type: "credit"
        }

        account.statement.push(operation)
        return await this.#repository.update(id, account)
    }

    async payment(id, descrition, amount){
        const account = this.#repository.selectById(id)
        
        const operation = {
            descrition,
            amount,
            created_at: new Date(),
            type: "credit"
        }

        account.statement.push(operation)
        return await this.#repository.update(id, account)
    }
}

module.exports = Service
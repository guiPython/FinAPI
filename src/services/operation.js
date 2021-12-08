const repository = require("../repository.js")

class Service {
    #repository

    constructor(){
        this.#repository = repository
    }

    #balance(account){
        return account.statement.reduce((acc, op) => {
            if(op.type === "credit") return acc + op.amount
            return acc - op.amount
        },0)
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

    async withdraw(id, descrition, amount){
        const account = this.#repository.selectById(id)

        if(amount <= 0.0) throw Error("Amount must be bigger 0.0")

        if(this.#balance(account) - amount < 0.0){
            throw Error("The balance account can´t negative")
        }

        const operation = {
            descrition,
            amount,
            created_at: new Date(),
            type: "debit"
        }

        account.statement.push(operation)
        return await this.#repository.update(id, account)
    }
}

module.exports = Service
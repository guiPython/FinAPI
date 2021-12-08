const {v4: uuidV4} = require("uuid")
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

    async create(account){
        account.statement = []
        let accounts = this.#repository.select()
        for(var id in accounts) {
            if (accounts[id].cpf == account.cpf) throw Error("This account already exists")
        }
        await this.#repository.insert(uuidV4(), account)
    }

    async read(id){
        let account = this.#repository.selectById(id)
        account.balance = this.#balance(account)
        if(account == undefined) throw Error("This account not exists")
        return account
    }

    async delete(id){
        let account = this.#repository.selectById(id)
        if(account == undefined) throw Error("This account not exists")
        await this.#repository.delete(id)
    }

    async updateCostumerName(id, name){
        let account = this.#repository.selectById(id)
        account.name = name
        await this.#repository.update(id,account)
    }
}

module.exports = Service
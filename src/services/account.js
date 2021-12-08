const {v4: uuidV4} = require("uuid")
const repository = require("../repository.js")

class Service {
    #repository
    
    constructor(){
        this.#repository = repository
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
        if(account == undefined) throw Error("This account not exists")
        return account
    }

    async delete(id){
        let account = this.#repository.selectById(id)
        if(account == undefined) throw Error("This account not exists")
        await this.#repository.delete(id)
    }
}

module.exports = Service
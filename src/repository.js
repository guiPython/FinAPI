const {readFileSync, writeFile} = require("fs")

class Repository {
    #database

    constructor(path){
        this.path = path;
        this.#database = this.#openConnetion();
    }

    #openConnetion(){
        return JSON.parse(readFileSync(this.path))
    }

    select(){ return this.#database }

    selectById(id){ return this.#database[id] }

    async update(id, account){
        this.#database[id] = account
        writeFile(this.path, JSON.stringify(this.#database), (err) => {
            if(err) throw Error("Update Account")
        })
        return account
    }

    async delete(id){
        delete this.#database[id]
        writeFile(this.path, JSON.stringify(this.#database), (err) => {
            if(err) throw Error("Delete Account")
        })
    }
}

module.exports = Repository
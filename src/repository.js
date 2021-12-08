const {readFileSync, writeFile, existsSync, writeFileSync} = require("fs")
const {resolve} = require("path");
class Repository {
    #database

    constructor(path){
        this.path = path;
        this.#database = this.#openConnetion();
    }

    #openConnetion(){
        if(!existsSync(this.path)) writeFileSync(this.path, "{}")
        return JSON.parse(readFileSync(this.path))
    }

    select(){ return this.#database }

    selectById(id){ return this.#database[id] }

    async insert(id, account){
        this.#database[id] = account
        writeFile(this.path, JSON.stringify(this.#database, null, 4), (err) => {
            if(err) throw Error("Insert Account")
        })
        return account
    }

    async update(id, account){
        this.#database[id] = account
        writeFile(this.path, JSON.stringify(this.#database, null, 4), (err) => {
            if(err) throw Error("Update Account")
        })
        return account
    }

    async delete(id){
        delete this.#database[id]
        writeFile(this.path, JSON.stringify(this.#database, null, 4), (err) => {
            if(err) throw Error("Delete Account")
        })
    }
}

module.exports = new Repository(resolve("db.json"))
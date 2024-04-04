import User from "./User.js"

export default class UserSet {
    #users

    constructor() {
        this.#users = new Map()
    }

    addUserByName(userName) {
        const user = new User(userName)
        this.#users.set(userName, user)

        return user
    }

    doesUserExist(userName) {
        return this.#users.has(userName)
    }

    getUserByName(userName) {
        return this.#users.get(userName)
    }

    printUsers() {
        const users = this.#users.values()
        let user = users.next()

        while (!user.done) {
            console.log(user.value)
            user = users.next()
        }
    }

    getUsers() {
        return this.#users.values()
    }

    isEmpty() {
        return this.#users.size === 0
    }

    getSize() {
        return this.#users.size
    }

    clear() {
        this.#users.clear()
    }

}

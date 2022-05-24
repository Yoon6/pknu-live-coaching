class User {
    constructor (id, msg) {
        this.id = id;
        this.msg = msg;
    }

    set message(val) {
        this.msg = val;
    }
}

module.exports = {User}
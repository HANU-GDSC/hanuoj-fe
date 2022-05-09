class Session {
    _id;
    _coderId;
    _expiredAt;

    constructor({
        id,
        coderId,
        expiredAt,
    }) {
        this._id = id;
        this._coderId = coderId;
        this._expiredAt = expiredAt;
    }

    static init() {
        return new Session({
            id: undefined,
            coderId: undefined,
            expiredAt: undefined,
        });
    }

    setCoderId(coderId) {
        if (typeof coderId !== "string")
            throw new Error("coderId must be a string");
        this._coderId = coderId;
    }

    setExpiredAt(expiredAt) {
        if (typeof expiredAt !== "string")
            throw new Error("expiredAt must be a string");
        this._expiredAt = expiredAt;
    }

    getId() {
        return this._id;
    }

    getCoderId() {
        return this._coderId;
    }

    getExpiredAt() {
        return this._expiredAt;
    }
}
    
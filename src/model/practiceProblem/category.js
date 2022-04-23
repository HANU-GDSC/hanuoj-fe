class Category {
    _id;
    _name;

    constructor({
        id,
        name
    }) {
        this.id = id;
        this.name = name;
    }

    static init() {
        return new Category({
            id: "",
            name: ""
        });
    }

    setName(name) {
        if (typeof name !== "string")
            throw new Error("Category name must be a string");
        this.name = name;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }
}

export default Category;
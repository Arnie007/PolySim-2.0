module.exports = {
    name: "If action then bool",

    description: "If action is triggered, then outputs boolean",

    category: ".Andy",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "boolean",
            "name": "Boolean",
            "description": "Type: Boolean\n\nDescription: The boolean.",
            "types": ["boolean"]
        }
    ],

    async code(cache) {
        this.StoreOutputValue("text", cache)
    }
}

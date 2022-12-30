module.exports = {
    name: "Value",

    description: "Creates a value to use it in your blocks.",

    category: ".Andy",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "value",
            "name": "Value",
            "description": "Description: The value to set.",
            "type": "VALUE"
        }
    ],

    outputs: [
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Value\n\nDescription: The value.",
            "types": ["unspecified","object", "list"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("value", cache), "value", cache, "inputBlock");
    }
}
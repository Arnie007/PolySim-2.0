module.exports = {
    name: "If true Then text",

    description: "If input value is true then output the entered text.",

    category: ".Andy",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "required": true
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Number, Text\n\nDescription: The value to transform.",
            "types": ["unspecified", "number", "text"],
            "required": true
        },
        {
            "id": "input",
            "name": "Input Value",
            "description": "Acceptable Types: Boolean\n\nDescription: If the value is true it output text.",
            "types": ["boolean"],
            "required": true
        }
    ],

    options: [
        {
            "id": "truetext",
            "name": "Value true Text",
            "description": "Description: The text to output if true.",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The value transformed.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {

        const inputboolean = this.GetInputValue("input", cache) + "";

        if (inputboolean === true) {
            var output = this.GetOptionValue("truetext", cache);
        } else {
            var output = this.GetOptionValue("value", cache);
        }
        
        this.StoreOutputValue(output, "result", cache);
        this.RunNextBlock("action", cache);
    }
}

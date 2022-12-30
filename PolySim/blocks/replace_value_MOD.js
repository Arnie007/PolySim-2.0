module.exports = {
    name: "Replace value",

    description: "Replaces the first or all old values with the new value.",

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
            "description": "Acceptable Types: Unspecified, Number, Text\n\nDescription: The value to change.",
            "types": ["unspecified", "number", "text"],
            "required": true
        },
        ,
        {
            "id": "new_value",
            "name": "New Value",
            "description": "Acceptable Types: Unspecified, Number, Text\n\nDescription: The value to change.",
            "types": ["unspecified", "number", "text"],
            "required": true
        },
        
    ],

    options: [
        {
            "id": "replacement_type",
            "name": "Replacement Type",
            "description": "Description: The type of replacement to execute.",
            "type": "SELECT",
            "options": {
                "first": "First Result",
                "all": "All Results"
            }
        },
        {
            "id": "old_value",
            "name": "Old Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The old value that will be replaced by the new value.",
            "types": ["text", "unspecified"],
            "required": true
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

    code(cache) {
        const value = this.GetInputValue("value", cache);
        let old_value = this.GetOptionValue("old_value", cache);
        const new_value = this.GetOptionValue("new_value", cache);
        const replacement_type = this.GetOptionValue("replacement_type", cache);

       // const escapeRegExp = txt => txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }
        function replaceAll(str, match, replacement){
            return str.replace(new RegExp(escapeRegExp(match), 'g'), ()=>replacement);
        }

        let res = value;
        switch(replacement_type) {
            case "all":
                res = replaceAll(value, old_value, new_value);
                break;
            default: // first
                res = value.replace(old_value, new_value);
                break;
        }

        this.StoreOutputValue(res, "result", cache);
        this.RunNextBlock("action", cache);
    }
}
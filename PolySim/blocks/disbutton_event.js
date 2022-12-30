module.exports = {
    name: "Discord Button [Event]",

    description: "When a Button is activated, this event will trigger.",

    category: "Component Stuff",

    auto_execute: true,

    inputs: [
        {
            "id": "buttonid",
            "name": "Event-ID",
            "description": "Type: Action\n\nDescription: The custom id who you provided.",
            "types": ["text"]
        }
    ],

    options: [
        {
            "id": "triggerfilter",
            "name": "Enable replyed",
            "description": "Description: Filter buttons that already got replayed.",
            "type": "SELECT",
            "options": {
                "false": "Yes",
                "true": "No"
            }
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
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The button clicker [User].",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The button clicker [Member].",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server.",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            "types": ["object"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Action\n\nDescription: The button message [Message].",
            "types": ["object"]
        },
        {
            "id": "button",
            "name": "Button",
            "description": "Type: Action\n\nDescription: The button message [Message].",
            "types": ["object"]
        },
        {
            "id": "buttonid",
            "name": "Id of button",
            "description": "Type: Action\n\nDescription: The button id [Text].",
            "types": ["text"]
        }
    ],

    code(cache) {
        const buttonid = this.GetInputValue("buttonid", cache);
        const triggerfilter = this.GetOptionValue("triggerfilter", cache) == "true" ? true : false

        this.events.on('clickButton', async (button) => {

            if(triggerfilter && button.deffered) return

            if (typeof buttonid === "undefined" || buttonid === button.id) {
                this.StoreOutputValue(button.clicker.user, "user", cache);
                this.StoreOutputValue(button.clicker.member, "member", cache);
                this.StoreOutputValue(button.message, "message", cache);
                this.StoreOutputValue(button.guild, "server", cache);
                this.StoreOutputValue(button.channel, "channel", cache);
                this.StoreOutputValue(button, "button", cache);
                this.StoreOutputValue(button.id, "buttonid", cache);
                this.RunNextBlock("action", cache);
            }
        });
    }
}

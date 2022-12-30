
module.exports = {
    name: "Discord Together",

    description: "Make Discord Application games/apps",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },		
        {
            "id": "channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to make an invite off",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "textinput",
            "name": "Custom Text Input",
            "description": "Inputs : chess/youtube/poker/betrayal/fishing",
            "types": ["text", "unspecified"]
        },
        {
            "id": "customid",
            "name": "Custom ID",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The custom application ID",
            "types": ["text", "unspecified"]
        }
		
    ],

    options: [
        {
            "id": "type",
            "name": "Type",
            "description": "The type of game to host",
            "type": "SELECT",
            "options": {
                1: "Text Input",
                2: "Youtube",
                3: "Poker",
                4: "Chess",
                5: "Betrayal",
                6: "Fishing",
                7: "Custom ID"
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
            "id": "textaction",
            "name": "Text Input Error",
            "description": "Type: Action\n\nDescription: Executes the following block if text value is invalid",
            "types": ["action"]
        },
        {
            "id": "link",
            "name": "URL",
            "description": "Type: Action\n\nDescription: The URL. NEEDS TO BE IN EMBED!",
            "types": ["text"]
        }
    ],




    async code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const textinput = this.GetInputValue("textinput", cache);
        const customid = this.GetInputValue("customid", cache);
        const channelID = channel.id;
        const type = parseInt(this.GetOptionValue("type", cache));
        const client = this.client;
        const token = client.token;
		var check = false;

		
		
		
		let result;
        switch(type) {
            case 1:

                if (textinput.toLowerCase() == 'chess') {
				    result = '832012586023256104';
				}
				else if (textinput.toLowerCase() == 'fishing') {
					result = '814288819477020702';
				}
				else if (textinput.toLowerCase() == 'poker') {
					result = '755827207812677713';
				}
				else if (textinput.toLowerCase() == 'youtube') {
					result = '755600276941176913';
				}
				else if (textinput.toLowerCase() == 'betrayal') {
					result = '773336526917861400';
				} else{
					this.RunNextBlock("textaction", cache)
					var check = true;
				}
				
                break;
            case 2:
                result = '755600276941176913';
                break;
            case 3:
                result = '755827207812677713';
                break;
            case 4:
                result = '832012586023256104';
                break;
            case 5:
                result = '773336526917861400';
                break;
            case 6:
                result = '814288819477020702';
                break;
            case 7:
                result = customid;
		    break;
			}
		
        const fetch = await this.require("node-fetch");
	const r = await fetch(`https://discord.com/api/v8/channels/${channelID}/invites`, {
			
     method: 'POST',
     headers: { authorization: `Bot ${token}`, 'content-type': 'application/json' },
     body: JSON.stringify({
       max_age: 60,
       max_uses: 1,
       target_type: 2,
       target_application_id: result
     })
  })

  const invite = await r.json()
  
if (check == false) {
  this.StoreOutputValue('https://discord.gg/'+invite.code, "link", cache)
  this.RunNextBlock("action", cache)
}
    }
}
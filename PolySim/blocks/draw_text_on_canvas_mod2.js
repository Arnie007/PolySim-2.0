module.exports = {
  name: "Draw Text On Canvas",

  description: "Draw text on canvas MOD",

  category: ".MOD",

  inputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
      "types": ["action"]
    },
    {
      "id": "path",
      "name": "Canvas",
      "description": "Image / GIF or canvas output of this block",
      "types": ["object", "text", "unspecified"],
      "required": true
    },
    {
      "id": "_text",
      "name": "Text",
      "description": "Text to draw on canvas",
      "types": ["text", "unspecified"]
    },
    {
      "id": "font",
      "name": "Font",
      "description": "Font for the text",
      "types": ["text", "unspecified"]
    },
    {
      "id": "color2",
      "name": "Text color",
      "description": "Text Color",
     "types": ["text", "number", "unspecified"]
    },
    {
      "id": "size",
      "name": "Font Size",
      "description": "Size of the font (in px)",
      "types": ["number", "unspecified"]
    },

    {
      "id": "x",
      "name": "X Position",
      "description": "Position in X axis (start in 2 to know location)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y",
      "name": "Y Position",
      "description": "Position in Y axis (start in 2 to know location)",
      "types": ["number", "unspecified"]
    },


  ],

  options: [],

  outputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
      "types": ["action"]
   },
   {
      "id": "canvas",
      "name": "Canvas",
      "description": "The created canvas",
      "types": ["object", "unspecified"]
   }
  ],

  async code(cache) {
      const Discord = require('discord.js')
      const Canvas = await this.require('canvas');
      const path = await this.GetInputValue("path", cache);
      const Width = path.width;
      const Height = path.height;
      
      const font = this.GetInputValue("font", cache);
      const _text = this.GetInputValue("_text", cache);
      const color2 = this.GetInputValue("color2", cache);
      const size = this.GetInputValue("size", cache);
      const x = this.GetInputValue("x", cache);
      const y = this.GetInputValue("y", cache);

      const canvas = Canvas.createCanvas(Width, Height);
      const ctx = canvas.getContext(`2d`);
      const BG = path.toBuffer('image/png');
      const background = await Canvas.loadImage(BG);
      
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.rect(0, 0, canvas.width, canvas.height);
 
      ctx.font = `${size}px` + font;
	    ctx.fillStyle = color2;
	    ctx.fillText( _text , canvas.width / x, canvas.height / y);
      
      this.StoreOutputValue(canvas, "canvas", cache);
      this.RunNextBlock("action", cache);
  }
}
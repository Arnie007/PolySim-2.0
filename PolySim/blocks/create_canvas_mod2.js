module.exports = {
  name: "Create Canvas",

  description: "Create canvas MOD",

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
      "name": "Background",
      "description": "Image for the canvas background",
      "types": ["text", "object", "unspecified"],
      "required": true
    },
    {
      "id": "width",
      "name": "BG Width",
      "description": "Witdh of your canvas. (700 recommended)",
      "types": ["number", "unspecified"],
      "required": true
    },
    {
      "id": "height",
      "name": "BG Height",
      "description": "Height of your canvas. (250 recommended)",
      "types": ["number", "unspecified"],
      "required": true
    },
    {
      "id": "image",
      "name": "Image",
      "description": "The image you want to put in",
      "types": ["text", "object", "unspecified"],
      "required": true
    },
    {
      "id": "x2",
      "name": "Image X",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"],
      "required": true
    },
    {
      "id": "y2",
      "name": "Image Y",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"],
      "required": true
    },
    {
      "id": "w1",
      "name": "Image Width",
      "description": "Image witdh (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "h1",
      "name": "Image Height",
      "description": "Image height (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "_text",
      "name": "Text",
      "description": "above text idk",
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
      "name": "Text X",
      "description": "Position in X axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y",
      "name": "Text Y",
      "description": "Position in Y axis (in px)",
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
      const path = this.GetInputValue("path", cache);
      const Width = this.GetInputValue("width", cache);
      const Height = this.GetInputValue("height", cache);
     
      const image = await Canvas.loadImage(this.GetInputValue("image",cache));
      const x2 = this.GetInputValue("x2", cache);
      const y2 = this.GetInputValue("y2", cache);
      const w1 = this.GetInputValue("w1", cache);
      const h1 = this.GetInputValue("h1", cache);

      const font = this.GetInputValue("font", cache);
      const _text = this.GetInputValue("_text", cache);
      const color2 = this.GetInputValue("color2", cache);
      const size = this.GetInputValue("size", cache);
      const x = this.GetInputValue("x", cache);
      const y = this.GetInputValue("y", cache);

      const canvas = Canvas.createCanvas(Width, Height);
      const ctx = canvas.getContext(`2d`);
      const background = await Canvas.loadImage(path);
      
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.rect(0, 0, canvas.width, canvas.height);
 
      ctx.font = `${size}px` + font;
	    ctx.fillStyle = color2;
	    ctx.fillText( _text , canvas.width / x, canvas.height / y);

      ctx.drawImage(image, x2, y2 ,w1 ,h1);

      this.StoreOutputValue(canvas, "canvas", cache);
      this.RunNextBlock("action", cache);
  }
}
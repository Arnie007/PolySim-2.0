module.exports = {
  name: "Convert Canvas To Image",

  description: "Converts Canvas To Image Which You Can Send As An Attachment",

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
      "description": "The canvas output from other canvas MOD blocks",
      "types": ["object", "text", "unspecified"],
      "required": true
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
    "id": "image",
    "name": "Image",
    "description": "The converted canvas",
    "types": ["object", "unspecified"]
   }
  ],

  async code(cache) {
      const Discord = require('discord.js')
      const Canvas = await this.require('canvas');
      const path = await this.GetInputValue("path", cache);
      const Width = path.width;
      const Height = path.height;

      const canvas = Canvas.createCanvas(Width, Height);
      const ctx = canvas.getContext(`2d`);
      const BG = path.toBuffer('image/png');
      const background = await Canvas.loadImage(BG);
      
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.rect(0, 0, canvas.width, canvas.height);

      const buffer = canvas.toBuffer('image/png');

      this.StoreOutputValue(buffer, "image", cache);
      this.RunNextBlock("action", cache);
  }
}
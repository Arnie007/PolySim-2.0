module.exports = {
    name: "Excel | Edit Cell Data",

    description: "Edits specific cell data.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Runs the block.",
            "types": ["action"]
        },
        {
            "id": "file",
            "name": "File location",
            "description": "File location for example './excel/sheet.xlsx'",
            "types": ["text"],
            "required": true
        },
        {
            "id": "data",
            "name": "Data",
            "description": "Data to put in cell (overwrites previous cell data)",
            "types": ["text", "object", "unspecified"],
            "required": true
        },
        {
            "id": "row",
            "name": "Row",
            "description": "The row of the cell to edit",
            "types": ["number"],
            "required": true
        },
        {
            "id": "column",
            "name": "Column",
            "description": "The column of the cell to edit",
            "types": ["number"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Runs the next block.",
            "types": ["action"]
        },
        {
            "id": "output",
            "name": "Raw Excel",
            "description": "Raw excel data. If you want to output any info.",
            "types": ["object", "list", "unspecified"]
        }
    ],

    async code(cache) {
        const xlsx = await this.require("node-xlsx");
        const fs = await this.require("fs");
        let filelocation = this.GetInputValue("file", cache);
        let data = this.GetInputValue("data", cache);
        let row = this.GetInputValue("row", cache);
        let column = this.GetInputValue("column", cache);
        
        let file = xlsx.parse(fs.readFileSync(filelocation));
        file[0].data[row-1][column-1] = data;
        let buffer = xlsx.build(file);
        fs.writeFile(filelocation, buffer, (err) => {
            if (err) throw err;
          });

        this.StoreOutputValue((file), "output", cache);
        this.RunNextBlock("action", cache)
    }
}
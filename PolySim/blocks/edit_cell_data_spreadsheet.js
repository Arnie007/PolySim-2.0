module.exports = {
    name: "Spreadsheet | Edit Cell Data",

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
            "id": "authjson",
            "name": "Auth JSON",
            "description": "For more info go to\nhttps://cloud.google.com/iam/docs/creating-managing-service-account-keys",
            "types": ["text"],
            "required": true
        },
        {
            "id": "fileuri",
            "name": "Doc URI",
            "description": "The URI is the ID of the sheet (in the link/url path)",
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

    options: [

    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Runs the next block.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const { GoogleSpreadsheet } = await this.require("google-spreadsheet");
        let filelocation = this.GetInputValue("fileuri", cache);
        let data = this.GetInputValue("data", cache);
        let row = this.GetInputValue("row", cache);
        let column = this.GetInputValue("column", cache);
        const auth = this.GetInputValue("authjson", cache);


        const object = JSON.parse(auth);
        let doc = new GoogleSpreadsheet(filelocation);

        await doc.useServiceAccountAuth({
            client_email: object.client_email,
            private_key: object.private_key,
          });

        await doc.loadInfo();
        let sheet = doc.sheetsByIndex[0];
        await sheet.loadCells('A1:Z1000')
        let cell = sheet.getCell(row-1, column-1);
        cell.value = data;
        await sheet.saveUpdatedCells();
  

        


        this.RunNextBlock("action", cache)
    }
}
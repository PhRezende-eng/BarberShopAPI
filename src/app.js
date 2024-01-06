const express = require('express')
const app = express();

app.listen(3000, () => console.log("Server is running at PORT 3000 🚀 \n on http://localhost:3000"))

const BSResponse = {
    "data": "Hello World!",
    "statusCode": 200,
    "statusMessage": "ok",
}

app.get('/api', (req, res) => {
    BSResponse["data"] = "Teste";
    res.json(BSResponse);
});
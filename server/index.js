const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send("Welcome. Let's create a Gig!'"));

app.listen(PORT, () => console.log(`Server Listening on Port :${port}`));

// index.js
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

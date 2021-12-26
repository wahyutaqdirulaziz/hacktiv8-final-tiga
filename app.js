require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const index = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/users', index)


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

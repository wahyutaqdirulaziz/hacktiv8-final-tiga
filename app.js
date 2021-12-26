require('dotenv').config();
const express       = require('express');
const app           = express();
const port          = process.env.PORT || 3000;
const user          = require('./routes/user');
const product       = require('./routes/product');
const category      = require('./routes/category');
const transaction   = require('./routes/transaction');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/categories', category);
app.use('/api/transactions', transaction);


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

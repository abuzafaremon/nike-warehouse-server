const express = require('express');
const app = express();
port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello Word!')
})



app.listen(port, () => {
  console.log('Listening to port', port);
})
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware này nhận request và parse dùm mình trước
const path = require('path'); // native module

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 5000; // when u deploy to Heroku, it sets up the process PORT for you

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // CROSS-ORIGIN RESOURCE SHARING

if (process.env.NODE_ENV === 'production') {
  // express.static() middleware func: to serve files from within a given root directory
  // Node.js có sẵn __dirname
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Bất cứ get req nào tới, send back static files (HTML, CSS, JS)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, err => {
  if (err) throw err;
  console.log('Server is running on port ' + port);
});

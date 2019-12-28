const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware này nhận request và parse dùm mình trước
const path = require('path'); // native module

// Đưa các thông tin từ file .env vào process.env.XXX
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Phải bên dưới dòng env
// console.log(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
} else {
  // app.get('*', (req, res) => {
  //   res.status(200).send('<h1>Running!!!</h1>');
  // });
}

app.listen(port, err => {
  if (err) throw err;
  console.log('Server is running on port ' + port);
});

// Xử lý request thanh toán từ client (phía frontend react app)
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  // stripe là obj đã đính stripe secret key để gọi api thanh toán tới stripe server, rồi kết quả thế nào báo lại cho phía client biết.
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

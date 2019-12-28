import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  // console.log(price);
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_fuKaI0NYdIqtLmYGpdztlMV100kjavkrCi';

  // - Trigger khi ng dùng nhấn xác nhận thanh toán (sau khi đã nhập đầy đủ thông tin)
  // - Rồi sẽ pass token tới backend để xử lý charge tiền
  const onToken = token => {
    // console.log(token);
    // alert('Payment successful!');

    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(res => {
        alert('Payment successful');
      })
      .catch(err => {
        console.log('Payment error: ', err);
        alert(
          'There was an issue with your payment. Please sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

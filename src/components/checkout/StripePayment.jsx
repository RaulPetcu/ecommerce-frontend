import { Alert, AlertTitle, Skeleton } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';
import React, { useEffect, useState } from 'react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    createStripePaymentSecret({ addressId: selectedUserCheckoutAddress.addressId })
      .then((secret) => {
        if (!ignore) setClientSecret(secret);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(error?.response?.data?.message || "Failed to start payment");
      });

    return () => { ignore = true; };
  }, []);

  if (errorMessage) {
    return (
      <div className='max-w-lg mx-auto'>
        <Alert severity="error">
          <AlertTitle>Payment unavailable</AlertTitle>
          {errorMessage}
        </Alert>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className='max-w-lg mx-auto'>
        <Skeleton />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
    </Elements>
  );
};

export default StripePayment
import React, { useEffect, useState, useRef } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Skeleton from '../shared/Skeleton';

const PaymentConfirmation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const hasSubmitted = useRef(false);

    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");
    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    useEffect(() => {
        if (!paymentIntent || !redirectStatus) return;

        if (redirectStatus !== "succeeded") {
            setErrorMessage("Payment was not completed. Please try again.");
            return;
        }

        if (hasSubmitted.current || !cart || cart.length === 0) return;
        hasSubmitted.current = true;

        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            paymentIntentId: paymentIntent,
        };
        dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    }, [paymentIntent, redirectStatus, cart]);

    if (loading) {
        return (
            <div className='max-w-xl mx-auto'>
                <Skeleton />
            </div>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            {errorMessage ? (
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-red-200">
                    <h2 className='text-2xl font-bold text-red-600 mb-2'>Payment Failed</h2>
                    <p className="text-gray-600">{errorMessage}</p>
                </div>
            ) : (
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                    <div className="text-green-500 mb-4 flex justify-center">
                        <FaCheckCircle size={64} />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase! Your payment was successful, and we're
                        processing your order.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentConfirmation
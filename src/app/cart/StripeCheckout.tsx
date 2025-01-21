'use client';
import { useRouter } from 'next/navigation';
import { getStripePromise } from '../../lib/stripe';
import toast from 'react-hot-toast';
import { FC } from 'react';

interface IProducts {
  price: number;
  quantity: number;
  name: string;
}

const StripeCheckout: FC<IProducts> = ({ price, quantity, name }) => {
  const handleDeleteAll = async () => {
    await fetch('/api/cart', {
      method: 'DELETE',
    });
  };

  const handleCart = async () => {
    try {
      const stripe = await getStripePromise();
      const res = await fetch('/api/stripe-session', {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, quantity, name }),
      });

      const data = await res.json();
      if (data.session) {
        stripe?.redirectToCheckout({ sessionId: data.session.id });
        toast.loading('Proceeding to Checkout');
      } else {
        toast.error('Your Cart is Empty!');
      }
    } catch (error) {
      console.error('Error in handling cart:', error);
      toast.error('Something went wrong!');
    }
  };

  const handleCheckout = () => {
    handleCart();
    handleDeleteAll();
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-green-400 rounded-sm p-2 w-full text-white hover:cursor-pointer"
        onClick={handleCheckout}
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default StripeCheckout;

import React, { useEffect, useRef } from 'react';
import './Modal.css';

export default function Modal({ products, showModal, handleShowModal }) {
  const totalPrice = products.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0).toFixed(2);

  const startNewOrder = () => {
    handleShowModal();
  }

  const dialogRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showModal]);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    const handleCancel = (e) => {
      e.preventDefault();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault(); 
      }
    };

    if (showModal) {
      dialogElement?.showModal();
      dialogElement?.addEventListener('keydown', handleKeyDown);
    } else {
      dialogElement?.close();
      dialogElement?.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      dialogElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <dialog ref={dialogRef} className='modal w-full max-w-[500px] rounded-lg ' >
      <div className="modal-box p-8">
        <img src='/icon-order-confirmed.svg' alt='order confirmed' className='mb-4' />
        <h2 className='text-[2.20rem] font-bold'>Order Confirmed</h2>
        <p className='mb-6 text-[#988e8d] text-sm'>We hope you enjoy your food!</p>

        <div className="bg-[#fcf8f5] rounded-md p-6">
          {products.map((product) => (
            <React.Fragment key={`${product.name}-modal`}>
              <div className='flex justify-between items-center w-full gap-x-4'>
                <img src={`${product.image.thumbnail}`} alt={product.name} className='max-w-[50px] rounded-md' />
                <div className='w-full'>
                  <p className="text-xs font-semibold">{product.name}</p>
                  <p className="inline-block me-3 text-xs font-semibold text-orange-500">{product.quantity}x</p>
                  <p className="inline-block me-3 text-xs text-gray-500"><span className="me-0.5 text-sm">@</span>${product.price.toFixed(2)}</p>
                </div>
                <p className="inline-block text-sm font-semibold text-gray-800">${(product.price * product.quantity).toFixed(2)}</p>
              </div>

              <div>
                <hr className=' mx-auto my-4' />
              </div>
            </React.Fragment>
          ))}
          <div className="flex justify-between items-center py-2">
            <p className="inline-block text-sm text-gray-800">Order Total</p>
            <p className="inline-block font-bold text-2xl -tracking-wide">${totalPrice}</p>
          </div>
        </div>

        <form method='dialog'>
          <button onClick={startNewOrder} className="mt-5 bg-orange-500 w-full rounded-full py-3 text-white font-medium hover:bg-orange-700 transition-colors">
            Start New Order
          </button>
        </form>
      </div>
    </dialog>
  )
}

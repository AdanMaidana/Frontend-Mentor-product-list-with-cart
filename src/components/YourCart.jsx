import React, { useState } from "react";
import Modal from "./Modal";

export default function YourCart({ products, cartShop, setSelectedProducts, onModalStateChange }) {
  const totalQuantity = products.reduce((accumulator, item) => accumulator + item.quantity, 0);
  const totalPrice = products.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0).toFixed(2);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    const newShowModalState = !showModal;

    if (newShowModalState) {
      setShowModal(newShowModalState);
      onModalStateChange(newShowModalState);
    } else {
      setShowModal(newShowModalState);
      onModalStateChange(newShowModalState);
      setSelectedProducts([]);
    }

  }

  return (
    <aside className="bg-white w-full h-max max-w-[300px] xl:max-w-[400px] mx-auto p-8 mt-8 xl:m-0 rounded-md">

      <h2 className="text-2xl text-orange-500 font-bold">Your Cart {`(${totalQuantity})`}</h2>
      {totalQuantity <= 0 ?
        (
          <>
            <img src="/illustration-empty-cart.svg" alt="empty car" className="mx-auto mt-10" />
            <p className="text-center text-sm text-[#8a7872] font-semibold">Your added items will appear here</p>
          </>
        )
        :
        (
          <ul className="mt-6">
            {products.map((product, index) => (
              <React.Fragment key={`cart-item-${index}`}>
                <li className="flex justify-between items-center w-full">

                  <div>
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="inline-block me-3 text-sm font-semibold text-orange-500">{product.quantity}x</p>
                    <p className="inline-block me-3 text-sm text-gray-500"><span className="me-0.5">@</span>${product.price.toFixed(2)}</p>
                    <p className="inline-block text-sm font-semibold text-gray-600">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>

                  <div>
                    <button disabled={showModal} onClick={() => cartShop(product, 'remove')} className="float-end border border-[#CAAFA7] rounded-full p-1 group hover:bg-[#CAAFA7] transition-colors">
                      <svg className="fill-[#CAAFA7] group-hover:fill-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" /></svg>
                    </button>
                  </div>

                </li>


                <hr className="my-3" />
              </React.Fragment>
            ))}
          </ul>
        )
      }

      {totalQuantity > 0 &&
        (
          <>
            <div className="flex justify-between items-center">
              <p className="inline-block text-sm text-black ">Order Total</p>
              <p className="inline-block font-bold text-3xl -tracking-wide">${totalPrice}</p>
            </div>


            <div className="bg-[#fdf7f6] text-[#403533] flex justify-center items-center gap-x-1 py-3 px-2 rounded-md mt-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z" /><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z" /></svg>
              <p className="text-[0.78rem] xl:text-sm">This is a <span className="font-semibold text-black">carbon-neutral</span> delivery</p>
            </div>

            <button disabled={showModal} onClick={handleShowModal} className="mt-5 bg-orange-500 w-full rounded-full py-3 text-white font-medium hover:bg-orange-700 transition-colors">
              Confirm Order
            </button>


          </>
        )}

      <Modal products={products} showModal={showModal} handleShowModal={handleShowModal} />
    </aside>
  )
}


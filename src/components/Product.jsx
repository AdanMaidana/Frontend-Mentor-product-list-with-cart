export default function Product({ data, cartShop, isSelected, totalQuantity, enableProduct }) {

  function handleCart(action) {
    //First product
    if (action === 'add') {
      handleAddProduct();
    } else if (action === 'increment') {
      handleIncrement();
    } else if (action === 'decrement') {
      handleDecrement();
    }
  };

  const handleAddProduct = () => {
    cartShop(data, 'add');
  }

  const handleIncrement = () => {
    cartShop(data, 'increment');
  }

  const handleDecrement = () => {
    if (totalQuantity === 1) {
      cartShop(data, 'decrement');
    }
    else {
      cartShop(data, 'decrement');
    }
  }


  return (
    <li className="w-full mx-auto">
      <div className="relative mb-8 mx-auto flex flex-col justify-center">
        <picture className={`hover:border-orange-500 rounded-lg border-[3px] ${isSelected ? 'border-orange-500' : 'border-transparent'} transition-colors `}>
          <source srcSet={data.image.desktop} media="(min-width: 1280px)" />
          <source srcSet={data.image.tablet} media="(min-width: 768px)" />
          <img className="rounded-md" src={data.image.mobile} alt={data.name} />
        </picture>

        <div className="absolute -bottom-4 w-full mx-auto flex justify-center items-center ">
          <div className="min-w-[60%] flex justify-between items-center rounded-full text-sm font-medium ">

            {/* Initial button to add the first product */}
            {totalQuantity < 1 &&
              <button disabled={!enableProduct} onClick={() => handleCart('add')} className="w-full flex justify-center items-center gap-x-2 py-2 px-4 border border-gray-400 bg-white rounded-full hover:border-orange-700 hover:text-orange-700 transition-colors group">
                <svg className="fill-[#C73B0F] transition-[fill]" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" /><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" /></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath></defs></svg>
               <p className="transition-colors text-black font-semibold group-hover:text-orange-700">Add to Cart</p>
              </button>}

            {/* Button to add or reduce */}
            {totalQuantity > 0 &&
              <div className="flex justify-between w-full px-3 py-2 bg-orange-700 border border-orange-700 text-white rounded-full">
                <button disabled={!enableProduct} onClick={() => handleCart('decrement')} className="border border-white rounded-full p-1 hover:bg-white group transition-colors">
                  <svg className="fill-white group-hover:fill-[#C73B0F] transition-[fill]" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z" /></svg>
                </button>

                <p className="select-none font-semibold">{totalQuantity}</p>

                <button disabled={!enableProduct} onClick={() => handleCart('increment')} className="border border-white rounded-full p-1 hover:bg-white group transition-colors">
                  <svg className="fill-white group-hover:fill-[#C73B0F] transition-[fill]" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
                </button>
              </div>
            }

          </div>
        </div>

      </div>

      <p className="text-sm text-gray-400">{data.category}</p>
      <p className="font-semibold">{data.name}</p>
      <p className="text-orange-500 font-semibold">${data.price.toFixed(2)}</p>
    </li>
  )
}



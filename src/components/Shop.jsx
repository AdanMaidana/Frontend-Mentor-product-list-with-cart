import { useState } from "react";
import ProductData from "../assets/data.json";
import Product from "./Product";
import YourCart from "./YourCart";

export default function Shop() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [enableProduct, setEnableProduct] = useState(true);

  const cartShop = (product, action) => {
    if (!selectedProducts.some(item => item.name === product.name) && action === 'add') {
      // Agrega el producto con cantidad 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    else if (selectedProducts.some(item => item.name === product.name) && action === 'increment') {
      // Incrementa la cantidad del producto existente
      setSelectedProducts(selectedProducts.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else if (selectedProducts.some(item => item.name === product.name) && action === 'decrement') {
      setSelectedProducts(selectedProducts.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)); // Elimina productos con cantidad 0
    }
    else if (selectedProducts.some(item => item.name === product.name) && action === 'remove') {
      // Elimina el producto del carrito por completo
      setSelectedProducts(selectedProducts.filter(item => item.name !== product.name));
    }
  };


    // Función para manejar el acceso al estado de showModal desde el componente padre
    const handleModalState = (state) => {
      setEnableProduct(!enableProduct);
    };

  return (
    <>
      <main className="w-full max-w-[300px] mx-auto xl:flex xl:flex-col xl:max-w-screen-md">
        <h1 className="text-[2.5rem] font-bold mb-8">Desserts</h1>
        <ul className="grid grid-cols-1 gap-y-8 xl:grid-cols-3 xl:gap-x-4">
          {
            ProductData.map((product) => {
              return <Product data={product} key={product.name} cartShop={cartShop} isSelected={selectedProducts.some(item => item.name === product.name)} totalQuantity={selectedProducts.filter(item => item.name === product.name).reduce((accumulator, item) => accumulator + item.quantity, 0)} enableProduct={enableProduct}
              />;
            })
          }
        </ul>
      </main>

      <YourCart products={selectedProducts} cartShop={cartShop} setSelectedProducts={setSelectedProducts} onModalStateChange={handleModalState} />
    </>
  )
}

/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function ProductsCard() {
  const {
    data,
    setShowModal,
    selectedImgHandler,
    setCartProductId,
    addCartHandler,
  } = useContext(DataContext);
  return (
    <>
      <div className="grid grid-cols-3">
        {data?.map((product) => (
          <div
            key={product.id}
            className="w-[300px] flex flex-col justify-center text-center items-center gap-y-3"
          >
            <div>
              <img
                src={product.imageUrl}
                alt="{product.id}"
                className="w-[300px] h-[383.031px] cursor-pointer"
                onClick={() => selectedImgHandler(product.id)}
              />
            </div>
            <p>{product.name}</p>
            <div className="flex justify-between w-72 items-center">
              <p>$ {product.price}</p>
              <button
                type="button"
                className="bg-[#f0c041] px-4 py-2 text-sm"
                onClick={() => addCartHandler(product.id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

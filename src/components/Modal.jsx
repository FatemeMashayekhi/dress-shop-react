/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function Modal() {
  const { showModal, setShowModal, selectedProductId, data, addCartHandler } =
    useContext(DataContext);

  const addHandler = (id) => {
    addCartHandler(id);
    setShowModal(false);
  };

  const product = data?.find((item) => item.id === selectedProductId);

  return (
    <>
      {showModal && selectedProductId && (
        <div
          id="modal"
          className="fixed z-40 pt-[100px] left-0 top-0 w-full h-screen overflow-auto bg-black/40"
        >
          <div
            id="modalContent"
            className="flex bg-white border-2 border-black"
          >
            <div>
              <img src={product.imageUrl} alt={product.id} className="py-3" />
            </div>
            <div className="flex flex-col gap-y-5 p-4">
              <div className="flex justify-between">
                <p>{product.name}</p>
                <button
                  className="bg-gray-200 border-2 border-black p-2 rounded-md hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  <Icon icon="streamline:delete-1-solid" className="size-2" />
                </button>
              </div>
              <p>{product.description}</p>
              <div className="flex justify-between">
                <p>Price : $ {product.price}</p>
                <button
                  type="button"
                  className="bg-[#f0c041] px-4 py-2 text-sm"
                  onClick={() => addHandler(product.id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

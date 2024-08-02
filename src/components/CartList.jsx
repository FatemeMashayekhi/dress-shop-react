/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function CartList() {
  const { setShowForm, data, cartData, removeHandler, totalPrice } =
    useContext(DataContext);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        {cartData?.map((item) => (
          <div key={item.id} id="container">
            <div id="box" className="flex gap-x-8">
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.id}
                  className="w-[50px] h-[71px]"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p>{item.name}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-1">
                    <span>$ {item.price}</span>
                    <span>x</span>
                    <span>{item.quantity}</span>
                  </div>
                  <button
                    type="button"
                    className="bg-gray-200 p-2 text-sm border-[1px] border-gray-300"
                    onClick={() => removeHandler(item.id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <p>Total : $ {totalPrice}</p>
          <button
            type="button"
            className="bg-[#f0c041] px-4 py-2 text-sm"
            onClick={() => setShowForm(true)}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
}

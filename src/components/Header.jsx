import { useContext } from "react";
import { DataContext } from "../DataContext";

export default function Header() {
  const { sortOrderHandler, filterSizeHandler } = useContext(DataContext);
  return (
    <>
      <div className="flex justify-evenly border-b-2 p-3">
        <p>6 Products</p>
        <label htmlFor="order" className="flex gap-x-1">
          Order
          <select
            name="order"
            id="order"
            className="border-2 border-black"
            onChange={(e) => sortOrderHandler(e.target.value)}
          >
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
          </select>
        </label>

        <label htmlFor="filter" className="flex gap-x-1">
          Filter
          <select
            name="filter"
            id="filter"
            className="border-2 border-black"
            onChange={(e) => filterSizeHandler(e.target.value)}
          >
            <option value="All">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </label>
      </div>
    </>
  );
}

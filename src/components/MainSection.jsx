import Cart from "./Cart";
import Header from "./Header";
import ProductsCard from "./ProductsCard";

export default function MainSection() {
  return (
    <div className="flex">
      <div className="w-[1000px]">
        <Header />
        <ProductsCard />
      </div>
      <Cart />
    </div>
  );
}

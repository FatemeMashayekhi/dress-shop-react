import CartList from "./CartList";
import UserForm from "./UserForm";

export default function Cart() {
  return (
    <div className="w-[400px] p-4">
      <CartList />
      <UserForm />
    </div>
  );
}

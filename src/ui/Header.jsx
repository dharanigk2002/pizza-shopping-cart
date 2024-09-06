import { Link } from "react-router-dom";
import OrderSearch from "../features/order/OrderSearch";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-yellow-500 p-5 uppercase sm:px-8">
      <Link to="/" className="tracking-widest sm:tracking-[5px]">
        Fast React Pizza Co.
      </Link>
      <OrderSearch />
      <Username />
    </header>
  );
}

export default Header;

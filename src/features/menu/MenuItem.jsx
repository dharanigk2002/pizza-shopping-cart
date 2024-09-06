/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const existsInCart = useSelector(getCurrentQuantityById(pizza.id));
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function addToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  function removeFromCart() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? `opacity-70 grayscale` : ""}`}
      />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {[...ingredients].join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut &&
            (!existsInCart ? (
              <Button type="small" onClick={addToCart}>
                Add to cart
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <UpdateItemQuantity pizzaId={id} />
                <Button type="small" onClick={removeFromCart}>
                  Remove from cart
                </Button>
              </div>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

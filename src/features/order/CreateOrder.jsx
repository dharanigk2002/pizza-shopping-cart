import {
  Form,
  Navigate,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import store from "../../store";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const {
    userName: username,
    status,
    address,
    position,
    error,
  } = useSelector((store) => store.user);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const ordering = isSubmitting || navigation.state === "loading";
  const formError = useActionData();
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice / 5 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoading = status === "loading";

  if (!cart.length && !ordering) return <Navigate to="/cart" />;

  return (
    <div className="relative px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={username}
            className="input grow"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" className="input w-full" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-600">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoading}
              defaultValue={address}
              className="input w-full"
            />
            {status === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
          <span className="absolute right-[1rem]">
            {!position && (
              <Button
                type="small"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            value={withPriority}
            onChange={() => setWithPriority((priority) => !priority)}
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting || isLoading
              ? "Loading..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const response = await request.formData();
  const data = Object.fromEntries(response);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone = "Please enter valid phone number";
  if (Object.keys(error).length > 0) return error;
  const res = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${res.id}`);
}

export default CreateOrder;

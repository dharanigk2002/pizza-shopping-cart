import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={isSubmitting || isLoading}>
        {isSubmitting && "Submitting..."}
        {isLoading && "Loading..."}
        {!isSubmitting && !isLoading && "Make Priority"}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderID, data);
  return null;
}

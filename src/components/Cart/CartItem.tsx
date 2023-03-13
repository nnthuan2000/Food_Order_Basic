import { ICartItem } from "../../models/ICart";

const CartItem = ({ name, price, amount }: ICartItem) => {
  const priceFormated = `$${price.toFixed(2)}`;

  return <div>aaa</div>;
};

export default CartItem;

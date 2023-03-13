import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cartContext";

interface HeaderCartButtonProps {
  onShowCart: () => void;
}

const HeaderCartButton = ({ onShowCart }: HeaderCartButtonProps) => {
  const { totalAmount } = useContext(CartContext);

  return (
    <button className={classes.button} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;

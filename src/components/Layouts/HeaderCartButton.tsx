import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cartContext";

interface HeaderCartButtonProps {
  onShowCart: () => void;
}

const HeaderCartButton = ({ onShowCart }: HeaderCartButtonProps) => {
  const { totalAmount } = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    if (totalAmount === 0) {
      return;
    }

    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <button className={btnClasses} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default HeaderCartButton;

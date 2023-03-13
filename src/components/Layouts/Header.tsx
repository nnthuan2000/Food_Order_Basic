import React from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";

interface HeaderProps {
  onShowCart: () => void;
}

const Header = ({ onShowCart }: HeaderProps) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onShowCart={onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;

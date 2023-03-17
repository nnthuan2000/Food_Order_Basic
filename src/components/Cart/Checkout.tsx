import React, { useRef, useState, useEffect } from "react";

import Input from "../UI/Input/Input";
import { IInputRef } from "../../models/Input";

import classes from "./Checkout.module.css";

interface CheckoutProps {
  onCancel: () => void;
}

const isEmpty = (value: string) => value.trim() !== "";
const moreThanFiveChars = (value: string) => value.trim().length >= 5;

const Checkout = ({ onCancel }: CheckoutProps) => {
  const nameInputRef = useRef<IInputRef>(null);
  const streetInputRef = useRef<IInputRef>(null);
  const postalCodeInputRef = useRef<IInputRef>(null);
  const cityInputRef = useRef<IInputRef>(null);

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameInputIsInvalid = !nameInputRef.current?.isValid;
    const streetInputIsInvalid = !streetInputRef.current?.isValid;
    const postalCodeInputIsInvalid = !postalCodeInputRef.current?.isValid;
    const cityInputIsInvalid = !cityInputRef.current?.isValid;

    if (nameInputIsInvalid) {
      nameInputRef.current!.focus();
    } else if (streetInputIsInvalid) {
      streetInputRef.current!.focus();
    } else if (postalCodeInputIsInvalid) {
      postalCodeInputRef.current!.focus();
    } else if (cityInputIsInvalid) {
      cityInputRef.current!.focus();
    } else {
      console.log("Form is valid");
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Input
        ref={nameInputRef}
        label="Your Name"
        input={{
          id: "name",
          type: "text",
          errorMessage: "Please enter a valid name!",
          validate: isEmpty,
        }}
      />

      <Input
        ref={streetInputRef}
        label="Street"
        input={{
          id: "street",
          type: "text",
          errorMessage: "Please enter a valid street!",
          validate: isEmpty,
        }}
      />

      <Input
        ref={postalCodeInputRef}
        label="Postal Code"
        input={{
          id: "postal",
          type: "text",
          errorMessage: "Please enter a valid postal code (5 characters)!",
          validate: moreThanFiveChars,
        }}
      />

      <Input
        ref={cityInputRef}
        label="City"
        input={{
          id: "city",
          type: "text",
          errorMessage: "Please enter a valid city!",
          validate: isEmpty,
        }}
      />

      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

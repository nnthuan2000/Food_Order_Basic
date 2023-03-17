import React, { useRef, useState } from "react";

import Input from "../../UI/Input/Input";

import { IInputRef } from "../../../models/Input";

import classes from "./MealItemForm.module.css";

interface MealItemFormProps {
  id: string;
  onAddMealToCart: (id: string, amount: number) => void;
}

const MealItemForm = ({ id, onAddMealToCart }: MealItemFormProps) => {
  const amountInputRef = useRef<IInputRef>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    onAddMealToCart(id, +enteredAmount);
    amountInputRef.current!.resetValue();
  };

  return (
    <form action="" className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          errorMessage: "Amount in invalid, please in (1-5)",
          validate: (value) => !isNaN(Number(value)),
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default React.memo(MealItemForm);

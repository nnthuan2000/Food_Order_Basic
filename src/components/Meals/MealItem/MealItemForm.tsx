import { useRef, useState } from "react";

import Input from "../../UI/Input/Input";

import { IInputRef } from "../../../models/Input";

import classes from "./MealItemForm.module.css";

interface MealItemFormProps {
  id: string;
  onAddMealToCart: (id: string, amount: number) => void;
}

const MealItemForm = ({ id, onAddMealToCart }: MealItemFormProps) => {
  const [amountIsValid, setAmountIsValid] = useState<boolean | null>(null);
  const amountInputRef = useRef<IInputRef>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    if (enteredAmount.trim().length === 0) {
      setAmountIsValid(false);
      return;
    }
    onAddMealToCart(id, +enteredAmount);
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
        }}
      />
      <button type="submit">+ Add</button>
      {amountIsValid === false && <p>Amount in invalid, please in (1-5)</p>}
    </form>
  );
};

export default MealItemForm;

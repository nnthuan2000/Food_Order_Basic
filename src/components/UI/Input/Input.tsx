import React, { useImperativeHandle, useState } from "react";

import { IInput, IInputRef } from "../../../models/Input";

import classes from "./Input.module.css";

interface InputProps {
  label: string;
  input: IInput;
}

const Input = React.forwardRef<IInputRef, InputProps>(({ label, input }, ref) => {
  const [currentValue, setCurrentValue] = useState<number>(parseInt(input.defaultValue));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) {
      return;
    }
    setCurrentValue(parseInt(e.target.value));
  };

  useImperativeHandle(ref, () => {
    return {
      value: currentValue.toString(),
    } as IInputRef;
  });

  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input
        type={input.type}
        id={input.id}
        min={input.min}
        max={input.max}
        step={input.step}
        value={currentValue}
        onChange={changeHandler}
      />
    </div>
  );
});

export default Input;

import React, { useImperativeHandle, useRef } from "react";

import useInput from "../../../hooks/useInput";

import { IInput, IInputRef } from "../../../models/Input";

import classes from "./Input.module.css";

interface InputProps {
  label: string;
  input: IInput;
}

const Input = React.forwardRef<IInputRef, InputProps>(({ label, input }, ref) => {
  const { value, isValid, error, changeHandler, blurHandler, resetHandler } = useInput(
    input.defaultValue || "",
    input.validate
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const activate = () => {
    inputRef.current!.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      value,
      isValid,
      isError: error,
      resetValue: resetHandler,
      focus: activate,
    };
  });

  let inputClasses = classes.input;

  if (input.type === "text") inputClasses += ` ${classes.text}`;
  if (error) inputClasses += ` ${classes.invalid}`;

  return (
    <React.Fragment>
      <div className={inputClasses}>
        <label htmlFor={input.id}>{label}</label>
        <input
          ref={inputRef}
          type={input.type}
          id={input.id}
          min={input.min}
          max={input.max}
          step={input.step}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </div>
      {error && <p className={classes["error-text"]}>{input.errorMessage}</p>}
    </React.Fragment>
  );
});

export default Input;

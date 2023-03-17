export interface IInput {
  id: string;
  type: string;
  step?: string;
  min?: string;
  max?: string;
  defaultValue?: string;
  errorMessage: string;
  validate: (value: string) => boolean;
}

export interface IInputRef {
  value: string;
  isValid: boolean;
  isError: boolean;
  resetValue: () => void;
  focus: () => void;
}

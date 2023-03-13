export interface ICartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface ICarts {
  items: ICartItem[];
  totalAmount: number;
}

export interface ICartContext extends ICarts {
  addItem: (item: ICartItem) => void;
  removeItem: (id: string) => void;
}

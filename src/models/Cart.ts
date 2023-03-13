export interface ICartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface ICarts {
  items: ICartItem[];
  totalAmount: number;
  totalPrice: number;
}

export interface ICartContext extends ICarts {
  addItem: (item: ICartItem) => void;
  removeItem: (id: string, isRemoveAll: boolean) => void;
}

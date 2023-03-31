interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface ICleaningProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface IFoodProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
  calories: number;
}

type TProductRequest = Omit<IProduct, "id" | "expirationDate">;

export { IProduct, ICleaningProduct, IFoodProduct, TProductRequest };

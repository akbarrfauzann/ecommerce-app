// data/products.ts
import jacket from "../assets/images/jacket.png";
import shirt from "../assets/images/shirt.png";
import shoes from "../assets/images/shoes.png";
import hoodie from "../assets/images/hoodie.png";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  size: string;
  condition?: string;
  flaws?: string;
};

export const categories = [
  "All",
  "Jacket",
  "Shirt",
  "Hoodie",
  "Pants",
] as const;

export const newArrivalsProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt Stussy",
    price: 1000000,
    image: shirt,
    category: "Shirt",
    size: "L",
    condition: "8/10",
    flaws: "Minor stains on the back",
  },
  {
    id: 2,
    name: "Carhatt Jacket",
    price: 5000000,
    image: jacket,
    category: "Jacket",
    size: "M",
    condition: "9/10",
    flaws: "❌",
  },
  {
    id: 3,
    name: "Adidas Samba",
    price: 200000,
    image: shoes,
    category: "Shoes",
    size: "42",
    condition: "7/10",
    flaws: "Worn out soles",
  },
];

export const ourProducts: Product[] = [
  {
    id: 4,
    name: "Carhatt Jacket",
    price: 5000000,
    image: jacket,
    category: "Jacket",
    size: "L",
    condition: "9/10",
    flaws: "❌",
  },
  {
    id: 5,
    name: "T-Shirt Stussy",
    price: 1000000,
    image: shirt,
    category: "Shirt",
    size: "L",
    condition: "8/10",
    flaws: "Minor stains on the back",
  },
  {
    id: 6,
    name: "Adidas Samba",
    price: 200000,
    image: shoes,
    category: "Shoes",
    size: "42",
    condition: "7/10",
    flaws: "Worn out soles",
  },
  {
    id: 7,
    name: "Carhatt Jacket",
    price: 5000000,
    image: jacket,
    category: "Jacket",
    size: "XL",
    condition: "9/10",
    flaws: "❌",
  },
  {
    id: 8,
    name: "T-Shirt Stussy",
    price: 1000000,
    image: shirt,
    category: "Shirt",
    size: "M",
    condition: "8/10",
    flaws: "Minor stains on the back",
  },
  {
    id: 9,
    name: "Nike Hoodie",
    price: 3000000,
    image: hoodie,
    category: "Hoodie",
    size: "L",
    condition: "9/10",
    flaws: "❌",
  },
  {
    id: 10,
    name: "Carhatt Jacket",
    price: 5000000,
    image: jacket,
    category: "Jacket",
    size: "S",
    condition: "9/10",
    flaws: "❌",
  },
  {
    id: 11,
    name: "Adidas Samba",
    price: 1000000,
    image: shoes,
    category: "Shoes",
    size: "43",
    condition: "8/10",
    flaws: "Minor scratches on the side",
  },
];

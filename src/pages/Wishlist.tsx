import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import numberWithCommas from "../utils/numberWithCommas";

type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Classic Blue T-Shirt",
      image: "/src/assets/images/shirt.png",
      price: 300000,
      quantity: 1,
      size: "M",
    },
    {
      id: 2,
      name: "Black Denim Jacket",
      image: "/src/assets/images/jacket.png",
      price: 199999,
      quantity: 1,
      size: "L",
    },
    {
      id: 3,
      name: "Adidas Sneakers",
      image: "/src/assets/images/shoes.png",
      price: 149999,
      quantity: 1,
      size: "42",
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 dark:bg-dark">
      <h1 className="text-3xl text-black dark:text-white font-bold mb-6 uppercase">My Wishlist</h1>

      <div className="bg-white dark:bg-dark border dark:border dark:border-white rounded-lg shadow-md overflow-hidden">
        {wishlistItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black dark:divide-white">
                {wishlistItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img src={item.image} alt="Product" className="h-10 w-10 rounded-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.size}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Rp{numberWithCommas(item.price)}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="bg-primary hover:bg-secondary hover:text-white dark:bg-dark-secondary dark:text-black text-white py-1 px-3 rounded text-xs uppercase cursor-pointer">Add to Cart</button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors duration-200 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">Your wishlist is empty.</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

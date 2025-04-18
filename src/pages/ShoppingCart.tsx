import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import numberWithCommas from "../utils/numberWithCommas";

type RootState = {
  cart: {
    cartItems: Array<{
      id: number;
      name: string;
      price: number;
      image: string;
      size: string;
      quantity: number;
    }>;
  };
};

const ShoppingCart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="px-4 py-8 dark:bg-dark">
      <h1 className="text-3xl font-bold mb-8 dark:text-white uppercase">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark border dark:border dark:border-white rounded-lg shadow overflow-hidden">
            {cartItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-center text-md font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-center text-md font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-center text-md font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-center text-md font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-center text-md font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black dark:divide-white">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt="image product"
                              className="w-16 h-16 object-cover"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-black dark:text-white">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-black dark:text-white">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          Rp{numberWithCommas(item.price)}
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors duration-200 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center dark:text-white">
                Your cart is empty.
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <button
              className="flex mt-4 items-center justify-between w-full md:w-auto bg-transparent border-2 border-black text-black dark:bg-dark-secondary dark:text-black py-2 px-3 rounded-lg font-semibold transition-colors uppercase cursor-pointer"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Right side - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Cart total
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="font-medium dark:text-white">
                  Rp{numberWithCommas(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  Shipping
                </span>
                <span className="font-medium dark:text-white italic ">
                  Free
                </span>
              </div>
              <div className="border-t border-black dark:border-white pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Total</span>
                  <span className="font-semibold dark:text-white">
                    Rp{numberWithCommas(totalPrice)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
                className="block w-full bg-primary text-white hover:bg-secondary hover:text-white dark:bg-dark-secondary dark:text-black py-3 rounded-lg font-semibold transition-colors duration-200 uppercase cursor-pointer text-center"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

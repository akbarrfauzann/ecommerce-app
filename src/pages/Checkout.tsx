import { FaArrowRightLong } from "react-icons/fa6";
import jacket from "../assets/images/jacket.png";

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-dark">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark dark:text-white rounded-lg shadow">
            <form action="" className="p-6">
              <h1 className="text-xl font-bold mb-4">Delivery Information</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First & Last Name */}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="first-name">
                    First Name
                  </label>
                  <input type="text" id="first-name" name="first-name" className="border mt-2 p-2 rounded-lg" placeholder="Enter first name" />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="last-name">
                    Last Name
                  </label>
                  <input type="text" id="last-name" name="last-name" className="border mt-2 p-2 rounded-lg" placeholder="Enter last name" />
                </div>

                {/* Email & Phone */}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="email">
                    Email
                  </label>
                  <input type="email" id="email" name="email" className="border mt-2 p-2 rounded-lg" placeholder="Enter email" />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="phone">
                    Phone Number
                  </label>
                  <input type="number" id="phone" name="phone" className="border mt-2 p-2 rounded-lg" placeholder="Enter phone number" />
                </div>

                {/* Address (Full Width) */}
                <div className="col-span-1 md:col-span-2 flex flex-col">
                  <label className="font-bold" htmlFor="address">
                    Address
                  </label>
                  <textarea className="border mt-2 p-2 rounded-lg" placeholder="Enter address"></textarea>
                </div>

                {/* Country */}
                <div className="col-span-1 md:col-span-2 flex flex-col">
                  <label className="font-bold" htmlFor="country">
                    Country
                  </label>
                  <input type="text" id="country" name="country" className="border mt-2 p-2 rounded-lg" placeholder="Enter country" />
                </div>

                {/* City & Zip Code */}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="city">
                    City
                  </label>
                  <input type="text" id="city" name="city" className="border mt-2 p-2 rounded-lg" placeholder="Enter city" />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="zip">
                    Zip Code
                  </label>
                  <input type="number" id="zip" name="zip" className="border mt-2 p-2 rounded-lg" placeholder="Enter zip code" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img src={jacket} alt="Jacket" className="w-16 h-16 bg-tertiary rounded-lg object-contain" />
                <div className="ml-4">
                  <p className="text-sm font-bold text-primary dark:text-dark-secondary uppercase">Black Denim Jacket</p>
                  <p className="text-sm font-semibold text-black dark:text-gray-300">Rp2.000.000</p>
                  <p className="text-sm text-secondary dark:text-gray-300">Size: L</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center p-2 gap-2 border-2 border-secondary dark:border-white rounded-lg w-full max-w-md">
                <input type="text" placeholder="Discount code" className="flex-1 p-2 outline-none dark:text-white" />
                <button className="bg-primary dark:bg-dark-secondary text-white dark:text-black px-4 py-2 rounded-lg font-semibold cursor-pointer">Apply</button>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">Subtotal</span>
                <span className="font-medium dark:text-white">Rp3.000.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">Shipping</span>
                <span className="font-medium italic dark:text-white">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">Discount</span>
                <span className="font-medium dark:text-white">Rp500.000</span>
              </div>
              <div className="border-t border-black dark:border-white pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Total</span>
                  <span className="font-semibold dark:text-white">Rp2.500.000</span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-between w-full bg-secondary text-white dark:bg-dark-secondary dark:text-black py-3 px-4 rounded-lg font-semibold transition-colors duration-200 uppercase cursor-pointer"
              >
                Choose Payment
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

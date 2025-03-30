import { FaArrowRightLong } from "react-icons/fa6";
import jacket from "../assets/images/jacket.png";

const Payment = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-dark">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark rounded-lg shadow">
            <div className="p-6">
              <h1 className="text-xl dark:text-white font-bold mb-4">Order Review</h1>
              <div className="bg-gray-50 dark:bg-secondary p-4 rounded-lg mb-6">
                <h2 className="text-lg dark:text-white font-semibold mb-3">Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">Full Name</p>
                    <p className="font-medium text-black dark:text-tertiary">Akbar Fauzan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">Email</p>
                    <p className="font-medium text-black dark:text-tertiary">makbarfauzans@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">Phone</p>
                    <p className="font-medium text-black dark:text-tertiary">0812133141415</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">Address</p>
                    <p className="font-medium text-black dark:text-tertiary">Jl. Raya Bogor No. 1 Bogor Indonesia</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">City</p>
                    <p className="font-medium text-black dark:text-tertiary">Bogor, 16730</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold dark:text-white">Country</p>
                    <p className="font-medium text-black dark:text-tertiary">Indonesia</p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg text-black dark:text-white font-semibold mb-3">Select Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border-2 rounded-lg p-4 cursor-pointer border-dark-secondary">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <img src="/api/placeholder/64/64" alt="Bank Indo" className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white">Transfer Bank</p>
                      <p className="text-sm text-gray-500 dark:text-tertiary">Direct bank transfer</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 rounded-lg p-4 cursor-pointer border-dark-secondary">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <img src="/api/placeholder/64/64" alt="GoPay" className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-medium text-black dark:text-white">GoPay</p>
                      <p className="text-sm text-gray-500 dark:text-tertiary">E-wallet payment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-secondary dark:text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 cursor-pointer">Back to Form</button>

                <button className="flex items-center justify-center w-full md:w-auto bg-primary text-white dark:bg-dark-secondary dark:text-black py-3 px-4 rounded-lg font-semibold transition-colors duration-200 uppercase cursor-pointer">
                  Pay Now
                  <FaArrowRightLong className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

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
              <div className="flex items-center">
                <img src={jacket} alt="Jacket" className="w-16 h-16 bg-tertiary rounded-lg object-contain" />
                <div className="ml-4">
                  <p className="text-sm font-bold text-primary dark:text-dark-secondary uppercase">Black Denim Jacket</p>
                  <p className="text-sm font-semibold text-black dark:text-gray-300">Rp1.000.000</p>
                  <p className="text-sm text-secondary dark:text-gray-300">Size: L</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-medium dark:text-white">Rp3.000.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="font-medium italic dark:text-white">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Discount</span>
                <span className="font-medium dark:text-white">Rp500.000</span>
              </div>
              <div className="border-t border-black dark:border-white pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Total</span>
                  <span className="font-semibold dark:text-white">Rp2.500.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

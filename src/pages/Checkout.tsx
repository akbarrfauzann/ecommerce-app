import { useState } from "react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutSchema } from "../../lib/types";
import numberWithCommas from "../utils/numberWithCommas";
import { FaArrowRightLong } from "react-icons/fa6";
import shoes from "../assets/images/shoes.png";

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

const Checkout = () => {
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState<CheckoutSchema | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const onSubmit: SubmitHandler<CheckoutSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setFormData(data);
    setShowReview(true);
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  return (
    <div className="px-4 py-8 dark:bg-dark">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark dark:text-white rounded-lg shadow">
            {!showReview ? (
              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <h1 className="text-xl font-bold mb-4">Delivery Information</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First & Last Name */}
                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">First Name</span>
                      <input
                        type="text"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        {...register("firstName")}
                      />
                    </label>
                    {errors.firstName && (
                      <span className="text-red-500">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Last Name</span>
                      <input
                        type="text"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        {...register("lastName")}
                      />
                    </label>
                    {errors.lastName && (
                      <span className="text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Email</span>
                      <input
                        type="email"
                        className="w-full font-normal border p-2 rounded-lg"
                        placeholder="Enter email"
                        autoComplete="email"
                        {...register("email")}
                      />
                    </label>
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Phone Number</span>
                      <input
                        type="tel"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter phone number"
                        autoComplete="tel"
                        {...register("phone")}
                      />
                    </label>
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Address (Full Width) */}
                  <div className="col-span-1 md:col-span-2 flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Address</span>
                      <textarea
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter address"
                        autoComplete="address-line1"
                        rows={4}
                        {...register("address")}
                      ></textarea>
                    </label>
                    {errors.address && (
                      <span className="text-red-500">
                        {errors.address.message}
                      </span>
                    )}
                  </div>

                  {/* Country */}
                  <div className="col-span-1 md:col-span-2 flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Country</span>
                      <input
                        type="text"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter country"
                        autoComplete="country"
                        {...register("country")}
                      />
                    </label>
                    {errors.country && (
                      <span className="text-red-500">
                        {errors.country?.message}
                      </span>
                    )}
                  </div>

                  {/* City & Zip Code */}
                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">City</span>
                      <input
                        type="text"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter city"
                        autoComplete="address-level2"
                        {...register("city")}
                      />
                    </label>
                    {errors.city && (
                      <span className="text-red-500">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label>
                      <span className="block font-bold mb-2">Zip Code</span>
                      <input
                        type="number"
                        className="w-full border p-2 rounded-lg"
                        placeholder="Enter zip code"
                        autoComplete="postal-code"
                        {...register("zipCode")}
                      />
                    </label>
                    {errors.zipCode && (
                      <span className="text-red-500">
                        {errors.zipCode.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex items-center justify-between w-full md:w-auto bg-secondary text-white dark:bg-dark-secondary dark:text-black py-3 px-4 rounded-lg font-semibold transition-colors duration-200 uppercase cursor-pointer"
                  >
                    {isSubmitting ? "Processing..." : "Continue to Payment"}
                  </button>
                </div>
              </form>
            ) : (
              formData && (
                <div className="p-6">
                  <h1 className="text-xl font-bold mb-4">Order Review</h1>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-3">
                      Delivery Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Full Name
                        </p>
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Address
                        </p>
                        <p className="font-medium">{formData.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          City & Zip Code
                        </p>
                        <p className="font-medium">
                          {formData.city}, {formData.zipCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Country
                        </p>
                        <p className="font-medium">{formData.country}</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold mb-3">
                    Select Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer ${
                        selectedPayment === "bank-indo"
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                      onClick={() => handlePaymentSelect("bank-indo")}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <img
                            src={shoes}
                            alt="Bank Indo"
                            className="w-8 h-8"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Bank Indo</p>
                          <p className="text-sm text-gray-500">
                            Direct bank transfer
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer ${
                        selectedPayment === "gopay"
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                      onClick={() => handlePaymentSelect("gopay")}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <img src={shoes} alt="GoPay" className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="font-medium">GoPay</p>
                          <p className="text-sm text-gray-500">
                            E-wallet payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowReview(false)}
                      className="flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 cursor-pointer uppercase"
                    >
                      Back to Form
                    </button>

                    <button
                      disabled={!selectedPayment}
                      className={`flex items-center justify-center w-full md:w-auto ${
                        selectedPayment
                          ? "bg-secondary text-white dark:bg-dark-secondary dark:text-black"
                          : "bg-gray-300 text-gray-600"
                      } py-3 px-4 rounded-lg font-semibold transition-colors duration-200 uppercase cursor-pointer`}
                    >
                      Pay Now
                      <FaArrowRightLong className="ml-2" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border dark:border dark:border-white dark:bg-dark rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">
              Order Summary
            </h2>

            {cartItems.length > 0 ? (
              <div className="space-y-2 mt-2">
                {cartItems.map((item) => (
                  <div className="flex items-center" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 bg-tertiary rounded-lg object-contain"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-bold text-primary dark:text-dark-secondary uppercase">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-black dark:text-gray-300">
                        Rp{item.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-secondary dark:text-gray-300">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-md text-black mt-4 dark:text-white">
                Your cart is empty.
              </p>
            )}

            {/* Order Summary */}
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-2 border-2 border-secondary dark:border-white rounded-lg p-2 w-full">
                <input
                  name="discountCode"
                  type="text"
                  placeholder="Discount code"
                  className="col-span-2 p-2 outline-none dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <button className="bg-primary dark:bg-dark-secondary text-white dark:text-black px-2 py-2 rounded-lg font-semibold cursor-pointer">
                  Apply
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">
                  Subtotal
                </span>
                <span className="font-medium dark:text-white">
                  Rp{numberWithCommas(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">
                  Shipping
                </span>
                <span className="font-medium italic dark:text-white">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-tertiary">
                  Discount
                </span>
                <span className="font-medium dark:text-white">Rp100.000</span>
              </div>
              <div className="border-t border-black dark:border-white pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Total</span>
                  <span className="font-semibold dark:text-white">
                    Rp{numberWithCommas(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

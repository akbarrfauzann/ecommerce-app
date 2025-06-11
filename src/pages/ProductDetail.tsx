import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { newArrivalsProducts, ourProducts } from "../data/products";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import numberWithCommas from "../utils/numberWithCommas";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  size: string;
  condition?: string;
  flaws?: string;
};

const ProductDetail = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const { id } = useParams<{ id: string }>();
  const allProducts = [...newArrivalsProducts, ...ourProducts];
  const uniqueProductIds = new Set();
  const combinedProducts = allProducts.filter((product) => {
    if (!uniqueProductIds.has(product.id)) {
      uniqueProductIds.add(product.id);
      return true;
    }
    return false;
  });

  const product = combinedProducts.find((product) => product.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <div className="text-center my-20">Product not found</div>;
  }

  const productImages = [
    product.image,
    "../assets/images/hoodie.png",
    "../assets/images/shirt.png",
    "../assets/images/shoes.png",
  ];

  const productDetails = [
    { label: "Category", value: product.category },
    { label: "Size", value: product.size },
    { label: "Condition", value: product.condition },
    { label: "Flaws", value: product.flaws },
  ];

  return (
    <div className="px-6 py-8 dark:bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Product Images */}
        <div className="flex flex-col gap-2">
          <div className="w-full aspect-[4/3] bg-tertiary rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImage]}
              alt="Product main view"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-tertiary rounded-lg overflow-hidden 
                  ${
                    selectedImage === index
                      ? "ring-2 ring-primary dark:ring-white"
                      : ""
                  }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-contain cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              Home / {product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-dark-secondary">
              {product.name}
            </h1>
            <p className="mt-2 text-xl md:text-2xl font-semibold text-black dark:text-white">
              Rp{numberWithCommas(product.price)}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-secondary dark:text-white mb-2">
              Size
            </h2>
            <button className="px-4 py-2 bg-primary text-white dark:text-black dark:bg-dark-secondary rounded-md">
              {product.size}
            </button>
          </div>

          <div className="flex flex-col border border-gray-300 rounded-md px-4 dark:border-secondary py-4">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
              Product Details
            </h2>
            <ul className="grid grid-cols-2 gap-4">
              {productDetails.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-secondary dark:text-gray-300"
                >
                  <span className="font-medium">{detail.label}:</span>
                  <span>{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
              Description
            </h2>
            <p className="text-secondary dark:text-gray-300">
              High-quality {product.category} from our latest collection.
              Designed for comfort and style, this {product.name} is perfect for
              your wardrobe.
            </p>
          </div>

          {/* Notes & Reviews */}
          <div className="py-4 px-10 border-t border-b border-gray-300 dark:border-gray-600">
            <p className="text-black dark:text-white py-2 px-4 italic">
              <span className="font-bold">Note :</span> Pay attention to the
              size and details. The original color might appear slightly
              different due to lighting. Be a smart buyer - no returns, no
              refunds.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="w-full flex-1 bg-primary text-white dark:text-black dark:bg-dark-secondary rounded-lg py-3 px-6 font-semibold hover:bg-primary-dark transition-colors duration-200 cursor-pointer">
              BUY NOW
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white dark:bg-dark dark:text-dark-secondary dark:hover:text-black dark:hover:bg-dark-secondary dark:border-dark-secondary py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
            >
              ADD TO CART
            </button>
          </div>

          {/* Share On */}
          <div className="flex items-center gap-2">
            <p className="text-secondary dark:text-white uppercase font-semibold font-primary">
              Share on:
            </p>
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-black dark:text-white cursor-pointer hover:text-green-500" />
              <FaInstagram className="text-black dark:text-white cursor-pointer hover:text-pink-500" />
              <FaFacebookF className="text-black dark:text-white cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

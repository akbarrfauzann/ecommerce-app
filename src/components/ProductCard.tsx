import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
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

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };
  const navigate = useNavigate();
  const handleViewDetails = () => navigate(`/products/${product.id}`);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className="bg-white dark:bg-dark w-full">
      {/* Product Image & Like Button */}
      <div className="relative w-full h-40 sm:h-64 md:h-72 xl:h-80 overflow-hidden rounded-lg">
        <button onClick={handleViewDetails} className="block w-full h-full">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain bg-tertiary rounded-lg 
                transition-transform duration-300 ease-in-out 
                hover:scale-120
                origin-center"
            />
          </div>
        </button>

        <button onClick={toggleLike} className="absolute top-4 right-4 text-2xl" aria-label={isLiked ? "Unlike" : "Like"}>
          {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Rest of the component remains the same */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md font-bold dark:text-white">{product.name}</h2>
            <p className="text-primary font-semibold dark:text-dark-secondary">Rp{numberWithCommas(product.price)}</p>
            <p className="text-sm text-secondary font-normal dark:text-tertiary">{product.size}</p>
          </div>

          {/* Desktop Cart Button */}
          <button type="button" onClick={() => handleAddToCart(product)} aria-label="Add to cart" className="hidden md:block">
            <HiOutlineShoppingBag
              className="w-10 h-10 p-2 rounded-lg border-2
                text-primary border-primary
                hover:bg-primary hover:text-white
                dark:text-dark-secondary dark:border-dark-secondary
                dark:hover:bg-dark-secondary dark:hover:text-white
                cursor-pointer transition-colors"
            />
          </button>
        </div>

        {/* Mobile Cart Button */}
        <button type="button" onClick={() => handleAddToCart(product)} aria-label="Add to cart" className="block md:hidden mt-2 w-full">
          <HiOutlineShoppingBag
            className="w-full h-10 p-2 rounded-lg border-2
              text-primary border-primary
              hover:bg-primary hover:text-white
              dark:text-dark-secondary dark:border-dark-secondary
              dark:hover:bg-dark-secondary dark:hover:text-white
              cursor-pointer transition-colors"
          />
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProductCard;

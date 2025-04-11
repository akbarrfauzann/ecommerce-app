import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { BsCart, BsCartDash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { toast } from "react-toastify";
import numberWithCommas from "../utils/numberWithCommas";
import type { RootState } from "../redux/store";

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
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);


  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product));
      toast.error("Product removed from cart");

    } else {
      dispatch(addToCart(product));
      toast.success("Product added to cart");
    }
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist({ id: product.id }));
      toast.error("Removed from wishlist");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist");
    }
  };
  

  const handleViewDetails = () => navigate(`/products/${product.id}`);

  return (
    <div className="bg-white dark:bg-dark w-full">
      <div className="relative w-full h-40 sm:h-64 md:h-72 xl:h-80 overflow-hidden rounded-lg">
        <button onClick={handleViewDetails} className="block w-full h-full">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain bg-tertiary rounded-lg 
              transition-transform duration-300 ease-in-out 
              hover:scale-120 origin-center"
            />
          </div>
        </button>

        <button onClick={handleWishlistClick} className="absolute top-4 right-4 text-2xl" aria-label={isWishlisted ? "Unlike" : "Like"}>
          {isWishlisted ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md font-bold dark:text-white">{product.name}</h2>
            <p className="text-primary font-semibold dark:text-dark-secondary">Rp{numberWithCommas(product.price)}</p>
            <p className="text-sm text-secondary font-normal dark:text-tertiary">{product.size}</p>
          </div>

          {/* Desktop Cart Button */}
          <button type="button" onClick={handleCartClick} aria-label="Add or remove from cart" className="hidden md:block">
            {isInCart ? (
              <BsCartDash className="w-10 h-10 p-2 rounded-lg border-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-400 dark:hover:text-white cursor-pointer transition-colors" />
            ) : (
              <BsCart className="w-10 h-10 p-2 rounded-lg border-2 text-primary border-primary hover:bg-primary hover:text-white dark:text-dark-secondary dark:border-dark-secondary dark:hover:bg-dark-secondary dark:hover:text-white cursor-pointer transition-colors" />
            )}
          </button>
        </div>

        {/* Mobile Cart Button */}
        <button type="button" onClick={handleCartClick} aria-label="Add or remove from cart" className="block md:hidden mt-2 w-full">
          {isInCart ? (
            <BsCartDash className="w-full h-10 p-2 rounded-lg border-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-400 dark:hover:text-white cursor-pointer transition-colors" />
          ) : (
            <BsCart className="w-full h-10 p-2 rounded-lg border-2 text-primary border-primary hover:bg-primary hover:text-white dark:text-dark-secondary dark:border-dark-secondary dark:hover:bg-dark-secondary dark:hover:text-white cursor-pointer transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories, ourProducts } from "../data/products";
const INITIAL_VISIBLE_PRODUCTS = 4;

const OurProducts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleProducts, setVisibleProducts] = useState(
    INITIAL_VISIBLE_PRODUCTS
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setVisibleProducts(INITIAL_VISIBLE_PRODUCTS);
    setIsExpanded(false);
  };

  const handleViewMoreClick = () => {
    setVisibleProducts(
      isExpanded ? INITIAL_VISIBLE_PRODUCTS : ourProducts.length
    );
    setIsExpanded(!isExpanded);
  };

  const filteredProducts =
    activeCategory === "All"
      ? ourProducts
      : ourProducts.filter((product) => product.category === activeCategory);

  return (
    <section className="px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl text-black dark:text-white md:text-3xl font-bold uppercase">
          Our{" "}
          <span className="text-primary dark:text-dark-secondary">
            Products
          </span>
        </h1>
        <p className="mt-2 text-secondary dark:text-tertiary text-sm md:text-base max-w-2xl mx-auto">
          Our new arrivals are built to withstand your activities while keeping
          you looking your best!
        </p>

        {/* Categories */}
        <div className="relative w-full px-4 pt-4 md:px-0">
          <ul className="flex md:justify-center gap-x-8 overflow-x-auto whitespace-nowrap py-2">
            {categories.map((category) => (
              <li
                key={category}
                className={`
                  text-sm md:text-base font-semibold cursor-pointer flex-shrink-0
                  ${
                    activeCategory === category
                      ? "text-primary dark:text-dark-secondary font-bold underline underline-offset-4"
                      : "text-secondary dark:text-tertiary"
                  }
                  hover:text-primary dark:hover:text-dark-secondary transition-colors
                `}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View More Button */}
          {filteredProducts.length > INITIAL_VISIBLE_PRODUCTS && (
            <div className="text-center mt-8">
              <button
                className="text-sm font-bold text-black dark:text-white dark:hover:text-dark-secondary underline underline-offset-4 cursor-pointer hover:text-primary transition-colors"
                onClick={handleViewMoreClick}
                type="button"
              >
                {isExpanded ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center my-20">
          <p className="text-secondary dark:text-tertiary font-semibold text-sm md:text-base">
            No products found for this category.
          </p>
        </div>
      )}
    </section>
  );
};

export default OurProducts;

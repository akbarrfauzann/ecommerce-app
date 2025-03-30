import ProductCard from "./ProductCard";
import { newArrivalsProducts } from "../data/products";

const NewArrivals = () => {
  return (
    <section className="py-8 px-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl dark:text-white font-bold uppercase">
          <span className="text-primary dark:text-dark-secondary">New</span> Arrivals
        </h1>
        <p className="mt-2 text-secondary dark:text-tertiary text-sm md:text-base max-w-2xl mx-auto">Our new arrivals are built to withstand your activities while keeping you looking your best!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {newArrivalsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

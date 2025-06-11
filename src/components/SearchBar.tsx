import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ourProducts } from "../data/products.ts";
import { FiSearch } from "react-icons/fi";
import numberWithCommas from "../utils/numberWithCommas.ts";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState<Product[]>([]);
  const handleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setActiveSearch([]);
      return;
    }
    const filteredProducts = ourProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    setActiveSearch(filteredProducts);
  };

  return (
    <form className="w-full max-w-[500px] relative px-4">
      <div className="flex items-center rounded-md bg-gray-100 dark:bg-tertiary px-2 py-1.5 w-full">
        <FiSearch className="w-4 h-4 md:w-5 md:h-5 text-primary dark:text-black" />
        <input
          id="search"
          type="search"
          placeholder="Search Products"
          className="bg-transparent text-primary dark:text-black w-full font-primary outline-none ml-1 md:ml-2 text-sm md:text-base placeholder-primary dark:placeholder-black"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-full mt-2 p-4 bg-white text-black w-full rounded-xl left-0 flex flex-col gap-2 shadow-lg z-50 max-h-60 overflow-y-auto">
          {activeSearch.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 hover:rounded-lg p-2 transition-colors duration-200"
              onClick={() => handleClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div>
                <p className="font-semibold mt-2">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Rp{numberWithCommas(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;

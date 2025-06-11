import SearchBar from "./SearchBar";

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-80 bg-white dark:bg-dark">
      <h1 className="text-xl font-bold mb-4 text-primary dark:text-white uppercase tracking-wider">
        Search Products
      </h1>
      <SearchBar />
    </div>
  );
};

export default SearchPage;

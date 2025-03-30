const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center dark:bg-dark dark:text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Page not found</p>
      <a href="/" className="text-black border-black border-2 px-4 py-2 rounded-lg hover:bg-dark hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
        Go back home
      </a>
    </div>
  );
};

export default NotFound;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        isOpen ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-secondary rounded-lg shadow p-6 transition-all w-full mx-4 sm:mx-auto sm:w-auto max-w-md max-h-[90vh] overflow-y-auto
          ${isOpen ? "scale-100 opacity-100" : "scale-100 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 rounded-md bg-white hover:bg-gray-200 
          text-gray-600 hover:text-black dark:text-white dark:bg-secondary 
          transition-colors cursor-pointer z-50"
          onClick={onClose}
          aria-label="Close Modal"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

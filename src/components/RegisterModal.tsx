import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import Modal from "./Modal";

const registerFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(10, { message: "Maximum 10 characters" }),
  password: z.string().min(8, { message: "Minimum 8 characters" }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  openLoginModal: () => void;
  onSubmit: (values: RegisterFormSchema) => void;
};

export default function RegisterModal({
  isOpen,
  onOpen,
  onClose,
  openLoginModal,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleSubmit = async (values: RegisterFormSchema) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = auth.currentUser;
      console.log("User registered:", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: values.email,
          username: values.username,
        });
      }
      form.reset();
      toast.success("Registration successful!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="w-full flex-1 bg-primary text-white dark:text-black dark:bg-dark-secondary rounded-lg py-2 px-4 font-semibold hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
        onClick={onOpen}
        aria-label="Register"
      >
        Register
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative w-full max-w-md max-h-full dark:bg-opacity-50">
          {/* Header */}
          <header className="flex items-center justify-between p-6 border-b rounded-t border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Create an account
            </h3>
          </header>

          {/* Body */}
          <div className="p-6">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Email input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="register-email"
                >
                  Your email
                </label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3 dark:bg-transparent dark:border-white dark:placeholder-tertiary dark:text-white"
                  {...form.register("email")}
                  autoComplete="email"
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-sm font-medium">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>

              {/* Username input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="register-username"
                >
                  Your username
                </label>
                <input
                  id="register-username"
                  type="text"
                  placeholder="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3 dark:bg-transparent dark:border-white dark:placeholder-tertiary dark:text-white"
                  {...form.register("username")}
                  autoComplete="username"
                />
                {form.formState.errors.username && (
                  <span className="text-red-500 text-sm font-medium">
                    {form.formState.errors.username.message}
                  </span>
                )}
              </div>

              {/* Password input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="register-password"
                >
                  Your password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3 dark:bg-transparent dark:border-white dark:placeholder-tertiary dark:text-white"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <span className="text-red-500 text-sm font-medium">
                    {form.formState.errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                aria-label="Register"
                aria-disabled={isLoading}
                className={`w-full text-white dark:text-black bg-primary focus:ring-4 focus:ring-tertiary font-medium rounded-lg text-base px-5 py-3 text-center dark:bg-dark-secondary dark:focus:ring-secondary cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              {/* Login link */}
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                Have an account?{" "}
                <button
                  type="button"
                  aria-label="Login"
                  onClick={() => {
                    openLoginModal();
                  }}
                  className="text-primary hover:underline dark:text-dark-secondary cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

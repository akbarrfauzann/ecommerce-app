import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import Modal from "./Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Minimum 8 characters" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  openRegisterModal: () => void;
  onSubmit: (values: LoginFormSchema) => void;
};

export default function LoginModal({
  isOpen,
  onOpen,
  onClose,
  openRegisterModal,
}: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmit = async (values: LoginFormSchema) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("User logged in Successfully");
      navigate("/");
      form.reset();
      onClose();
      toast.success("Login successful!");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="text-primary dark:text-dark-secondary font-bold py-2 px-4 rounded cursor-pointer"
        onClick={onOpen}
        aria-label="Login"
      >
        Login
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative w-full max-w-md max-h-full dark:bg-opacity-50">
          {/* Header */}
          <header className="flex items-center justify-between p-6 border-b rounded-t border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Login to your account
            </h3>
          </header>

          {/* Body */}
          <div className="p-6">
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Username Input */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="login-email"
                  type="text"
                  placeholder="name@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3 dark:bg-transparent dark:border-white dark:placeholder-tertiary dark:text-white"
                  {...form.register("email")}
                  autoComplete="email"
                  aria-required="true"
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-sm font-medium">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="login-password"
                >
                  Your password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3 dark:bg-transparent dark:border-white dark:placeholder-tertiary dark:text-white"
                    {...form.register("password")}
                    aria-required="true"
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

              {/* Submit Button */}
              <button
                type="submit"
                aria-label="Login"
                aria-disabled={isLoading}
                className={`w-full text-white dark:text-black bg-primary focus:ring-4 focus:ring-tertiary font-medium rounded-lg text-base px-5 py-3 text-center dark:bg-dark-secondary dark:focus:ring-secondary cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              {/* Register Link */}
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  className="text-primary dark:text-dark-secondary cursor-pointer hover:underline"
                  aria-label="Register"
                  onClick={() => {
                    onClose();
                    openRegisterModal();
                  }}
                >
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

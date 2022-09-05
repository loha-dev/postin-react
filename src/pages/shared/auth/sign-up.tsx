import { supabase } from "../../../utils/supabase";
import { Link, useNavigate } from "@tanstack/react-location";
import type { authType } from "../../../types/short";
import { CheckIcon } from "@mantine/core";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { hideNotification, showNotification } from "@mantine/notifications";

const SignUp = () => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const signUpForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 8 ? null : "Too short"),
    },
  });

  const handleSignIn = async (values: authType) => {
    showNotification({
      title: `Inscription en cours`,
      message: "Attendez un moment 🥱",
      loading: true,
      id: "signup",
    });
    const { error } = await supabase.auth.signUp({
      password: values.password,
      email: values.email,
    });
    if (!error) {
      hideNotification("signup");
      showNotification({
        title: `Inscription succes`,
        message: "Aller au page de connexion",
        color: "green",
        icon: <CheckIcon className="w-5 h-5" />,
      });
      navigate({
        to: "/auth/signin",
      });
    }
  };

  return (
    <div className="flex flex-wrap w-full bg-fotsy dark:bg-mainty">
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src="https://images.unsplash.com/photo-1582896911227-c966f6e7fb93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-10 md:justify-end md:pl-12 md:-mb-24 mx-3">
          <a
            href="#"
            className="p-4 text-4xl font-medium dark:text-white text-black"
          >
            Post-in
          </a>
        </div>
        <div className="flex flex-col justify-center px-5 pt-8 my-auto md:justify-start md:pt-0 md:px-10 lg:px-32">
          <p className="text-4xl font-bold dark:text-white">Inscription ! </p>
          <form
            className="flex flex-col gap-1 pt-3 md:pt-8 font-semibold"
            onSubmit={signUpForm.onSubmit(handleSignIn)}
          >
            <div className="flex flex-col mb-5 pt-4">
              <label className="mb-3 font-medium dark:text-white ">Email</label>
              <div className="flex relative">
                <input
                  type="text"
                  id="username"
                  autoComplete="username"
                  className=" flex-1 appearance-none border rounded-md border-gray-300 w-full py-3 px-6 bg-white text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Entrer votre email"
                  {...signUpForm.getInputProps("email")}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-12">
              <label className="mb-3 font-medium dark:text-white">
                Mot de passe
              </label>
              <div className="flex relative">
                <input
                  type={isShown ? "text" : "password"}
                  id="design-login-password"
                  className=" flex-1 appearance-none border rounded-md border-gray-300 w-full py-3 px-6 bg-white text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Entre votre mot de passe"
                  {...signUpForm.getInputProps("password")}
                />
                {isShown ? (
                  <HiEyeOff
                    className="absolute text-gray-400 right-2 bottom-2 w-6"
                    onClick={() => setIsShown((prev) => !prev)}
                  />
                ) : (
                  <HiEye
                    className="absolute text-gray-400 right-2 bottom-2 w-6"
                    onClick={() => setIsShown((prev) => !prev)}
                  />
                )}
              </div>
              <Link
                to="/auth/forgot-password"
                className="text-gray-500 text-end mt-1 font-normal"
              >
                Mot de passe oublié
              </Link>
            </div>
            <button
              type="submit"
              className="text-white w-full px-4 py-3 text-xl font-semibold text-center bg-gradient-to-r from-orange-600 to-green-400 hover:from-pink-500 hover:to-yellow-500 rounded"
            >
              <span className="w-full">Se connecter</span>
            </button>
          </form>
          <div className="py-8 text-center">
            <p className="dark:text-white">
              deja une compte?{" "}
              <Link
                to="/auth/signin"
                className="font-medium underline text-cyan-500"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

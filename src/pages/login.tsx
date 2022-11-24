import { NavBar } from "../components/NavBar";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface IHandleLogin {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => {
        if (!value) return "Username is required";
      },
      password: (value) => {
        if (!value) return "Password is required";
      },
    },
  });

  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  const handleLogin = async (values: IHandleLogin) => {
    try {
      await axios.post("/api/login", values);
      router.push("/dashboard");
    } catch (err: any) {
      showNotification({
        title: "Error",
        message: err.response.data.error,
        color: "red",
        autoClose: 3 * 1000,
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-custom-cream">
      <NavBar />
      <div className="m-auto md:max-w-7xl">
        <main className="flex flex-wrap justify-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="relative h-[300px] w-[300px] sm:h-[530px] sm:w-[530px]">
              <Image
                src="/home-main-image.png"
                alt="Home main image"
                fill
                className="absolute"
              />
            </div>
            <h1 className="text-center font-extrabold text-custom-purple">
              36TH INTER UNIVERSITY
              <br />
              EAST ZONE YOUTH FESTIVAL
            </h1>
            <h3 className="mb-12 text-center text-lg font-bold text-custom-purple">
              23rd - 27th December 2022
            </h3>
          </div>
          <div className="mb-20 flex w-full flex-1 justify-center md:mt-20">
            <div className="flex h-min w-80 flex-col items-center rounded-lg bg-custom-purple p-4">
              <span className="text-xl font-bold text-custom-cream">
                University Login Portal
              </span>
              <form
                onSubmit={form.onSubmit((values) => handleLogin(values))}
                className="w-full"
              >
                <TextInput
                  radius="xl"
                  size="md"
                  placeholder="Enter your username"
                  {...form.getInputProps("username")}
                  className="mt-8"
                />
                <TextInput
                  radius="xl"
                  size="md"
                  placeholder="Enter your password"
                  {...form.getInputProps("password")}
                  className="mt-8"
                />
                <Button
                  type="submit"
                  radius="xl"
                  className="m-auto mt-8 w-full bg-custom-red text-custom-cream hover:bg-custom-red/95"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

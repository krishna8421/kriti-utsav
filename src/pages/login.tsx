import { NavBar } from "../components/NavBar";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";

interface IHandleLogin {
  username: string;
  password: string;
}

const Login = () => {
  const [visible, setVisible] = useState(false);

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
    setVisible(true);
    try {
      await axios.post("/api/login", values);
      router.push("/dashboard");
      setVisible(false);
    } catch (err: any) {
      showNotification({
        title: "Error",
        message: err.response.data.error,
        color: "red",
        autoClose: 3 * 1000,
      });
      setVisible(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-custom-cream">
      <Head>
        <title>KRITI UTSAV - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="36th Inter University East Zone Youth Festival hosted by Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar from 23rd to 27th December 2022 under the aegies of Association of Indian Universities(AIU)."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://kritiutsav.kiit.ac.in/"></meta>
        <meta property="og:title" content="KRITI UTSAV"></meta>
        <meta
          property="og:description"
          content="36th Inter University East Zone Youth Festival hosted by Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar from 23rd to 27th December 2022 under the aegies of Association of Indian Universities(AIU)."
        ></meta>
        <meta property="og:image" content="/favicon.ico"></meta>
      </Head>
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <NavBar />
      <div className="m-auto md:max-w-7xl">
        <main className="flex flex-wrap justify-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="relative h-[250px] w-[250px] sm:h-[500px] sm:w-[500px]">
              <Image
                src="/header-circle.png"
                alt="Home main image"
                fill
                className="animate-spin-slow"
              />
              <div className="absolute right-8 top-[25%] h-32 w-9/12 md:top-[27%] md:right-16 md:h-60">
                <Image src="/header-logo.png" alt="Home main image" fill />
              </div>
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
            <div className="flex h-min w-80 flex-col items-center rounded-lg bg-custom-purple p-4 drop-shadow-xl">
              <span className="text-xl font-bold text-custom-cream">
                Login Portal
              </span>
              <span className="text-xl text-custom-cream">
                (University/Institute)
              </span>
              <form
                onSubmit={form.onSubmit((values) => handleLogin(values))}
                className="w-full"
              >
                <TextInput
                  radius="xl"
                  size="md"
                  placeholder="Username"
                  {...form.getInputProps("username")}
                  className="mt-8 bg-[]"
                  styles={{
                    input: {
                      backgroundColor: "#1A8C92",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                      border: "none",
                    },
                  }}
                />
                <TextInput
                  type="password"
                  radius="xl"
                  size="md"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                  className="mt-8"
                  styles={{
                    input: {
                      backgroundColor: "#1A8C92",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                      border: "none",
                    },
                  }}
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

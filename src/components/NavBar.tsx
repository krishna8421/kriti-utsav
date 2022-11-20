import Image from "next/image";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-8 m-auto md:max-w-7xl">
      <div className="relative h-[65px] w-[105px] cursor-pointer">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="absolute"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="md:block hidden">
        <span
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/about")}
        >
          About
        </span>
        <span
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/events")}
        >
          Events
        </span>
        <span
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/downloads")}
        >
          Downloads
        </span>
        <span
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/contact")}
        >
          Contact
        </span>
        <span
          className="mr-8 cursor-pointer rounded-full bg-custom-purple px-6 py-3 text-lg font-bold text-white"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

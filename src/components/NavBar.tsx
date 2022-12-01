import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { Drawer, Menu } from "@mantine/core";
import Cookies from "js-cookie";

interface Props {
  handleContactClick?: () => void;
  handleEventsClick?: () => void;
}

export const NavBar = ({ handleContactClick, handleEventsClick }: Props) => {
  const { isAuth } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  return (
    <div className="m-auto flex items-center justify-between py-8 px-4 md:max-w-7xl">
      <div className="relative h-[60px] w-[96.6px] cursor-pointer">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="absolute"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="hidden items-center justify-between md:flex">
        <div
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/about")}
        >
          About
        </div>
        <div
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => {
            if (handleEventsClick) {
              handleEventsClick();
            } else {
              router.push("/?tab=events");
            }
          }}
        >
          Events
        </div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <div className="cursor-pointer text-lg font-bold text-custom-purple">
              Downloads
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                window && window.open("/Curriculam-Vitae_KritiUtsav.pdf");
              }}
            >
              Curriculum Vitae
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window && window.open("/Eligibility-Certificate.pdf");
              }}
            >
              Eligibility Certificate
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window &&
                  window.open(
                    "/Kritiutsav-Event-Rules-and-Regulations-Website.pdf"
                  );
              }}
            >
              Event Rules and Regulations
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window && window.open("/Checklist-Kriti Utsav.pdf");
              }}
            >
              CheckList
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window && window.open("/Brochure_KritiUtsav.pdf");
              }}
            >
              Brochure
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <RiArrowDropDownLine size={20} className="mr-6 cursor-pointer" />
        <div
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => {
            if (handleContactClick) {
              handleContactClick();
            } else {
              router.push("/?tab=contact");
            }
          }}
        >
          Contact
        </div>
        {isAuth && (
          <div
            className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </div>
        )}
        <div
          className={`mr-8 cursor-pointer rounded-full bg-custom-purple px-9 py-2 text-lg font-bold text-white`}
          onClick={() => {
            if (isAuth) {
              Cookies.remove("token");
              router.push("/");
            } else {
              router.push("/login");
            }
          }}
        >
          {isAuth ? "Logout" : "Login"}
        </div>
      </div>
      <GiHamburgerMenu
        size={30}
        className="cursor-pointer md:hidden"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      />
      <Drawer
        opened={openMenu}
        onClose={() => setOpenMenu(false)}
        position="left"
        size="75%"
        transition="rotate-left"
        transitionDuration={250}
        transitionTimingFunction="ease"
      >
        <div className="flex h-full flex-col items-center justify-center gap-16">
          <div
            className="cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/about")}
          >
            About
          </div>
          <div
            className="cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/?tab=events")}
          >
            Events
          </div>
          <Menu shadow="md">
            <Menu.Target>
              <div className=" ml-5 flex cursor-pointer items-center text-lg font-bold text-custom-purple">
                <div>Downloads</div>
                <RiArrowDropDownLine size={20} className="cursor-pointer" />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  window && window.open("/Curriculam-Vitae_KritiUtsav.pdf");
                }}
              >
                Curriculum Vitae
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  window && window.open("/Eligibility-Certificate.pdf");
                }}
              >
                Eligibility Certificate
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  window &&
                    window.open(
                      "/Kritiutsav-Event-Rules-and-Regulations-Website.pdf"
                    );
                }}
              >
                Event Rules and Regulations
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  window && window.open("/Checklist-Kriti Utsav.pdf");
                }}
              >
                CheckList
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  window && window.open("/Brochure_KritiUtsav.pdf");
                }}
              >
                Brochure
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <div
            className="cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/?tab=contact")}
          >
            Contact
          </div>
          {isAuth && (
            <div
              className="cursor-pointer text-lg font-bold text-custom-purple"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </div>
          )}
          <div
            className={`cursor-pointer rounded-full bg-custom-purple px-9 py-2 text-lg font-bold text-white`}
            onClick={() => {
              if (isAuth) {
                Cookies.remove("token");
                router.push("/");
              } else {
                router.push("/login");
              }
            }}
          >
            {isAuth ? "Logout" : "Login"}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

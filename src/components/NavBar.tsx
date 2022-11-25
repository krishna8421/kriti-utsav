import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Drawer, Menu } from "@mantine/core";

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
      <div className="hidden md:block">
        <span
          className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
          onClick={() => router.push("/about")}
        >
          About
        </span>
        <span
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
        </span>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <span className="mr-8 cursor-pointer text-lg font-bold text-custom-purple">
              Download
            </span>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                window && window.open("/Curriculam-Vitae.pdf");
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
                window && window.open("/CheckList-KritiUtsav.pdf");
              }}
            >
              CheckList
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <span
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
        </span>
        {/* <span
          className={`mr-8 cursor-pointer rounded-full bg-custom-purple px-6 py-3 text-lg font-bold text-white`}
          onClick={() => {
            if (isAuth) {
              router.push("/dashboard");
            } else {
              router.push("/login");
            }
          }}
        >
          {isAuth ? "Dashboard" : "Login"}
        </span> */}
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
          <span
            className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/about")}
          >
            About
          </span>
          <span
            className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/?tab=events")}
          >
            Events
          </span>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <span className="mr-8 cursor-pointer text-lg font-bold text-custom-purple">
                Download
              </span>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  window && window.open("/Curriculam-Vitae.pdf");
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
                  window && window.open("/CheckList-KritiUtsav.pdf");
                }}
              >
                CheckList
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <span
            className="mr-8 cursor-pointer text-lg font-bold text-custom-purple"
            onClick={() => router.push("/?tab=contact")}
          >
            Contact
          </span>
          {/* <span
            className={`mr-8 cursor-pointer rounded-full bg-custom-purple px-6 py-3 text-lg font-bold text-white`}
            onClick={() => {
              if (isAuth) {
                router.push("/dashboard");
              } else {
                router.push("/login");
              }
            }}
          >
            {isAuth ? "Dashboard" : "Login"}
          </span> */}
        </div>
      </Drawer>
    </div>
  );
};

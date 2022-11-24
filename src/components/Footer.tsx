import React from "react";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="bg-custom-green">
      <div className="m-auto flex flex-wrap justify-around gap-4 py-4 text-lg text-white md:max-w-7xl">
        <div className="flex items-center justify-center gap-2">
          <HiOutlineMail size={20} />
          <span>kriti.utsav@kiit.ac.in</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <BsTelephone size={18} />
          <span>+91 9178358687</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <HiOutlineLocationMarker size={20} />
          <span className="text-center text-sm sm:text-md">
            Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar.
          </span>
        </div>
      </div>
    </footer>
  );
};

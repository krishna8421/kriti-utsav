import Image from "next/image";
import { useState, Fragment } from "react";
import { MdClose } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";

interface EventImageProps {
  src: string;
  alt: string;
  name: string;
  description: string[];
}

export const EventImage = ({
  src,
  alt,
  name,
  description,
}: EventImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="text-center">
        <div
          className="relative h-[200px] w-[200px] cursor-pointer sm:h-[300px] sm:w-[300px]"
          onClick={openModal}
        >
          <Image src={`/${src}`} alt={alt} fill className="absolute" />
        </div>
        <span className="text-lg font-bold text-white">{name}</span>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="border-3 w-full max-w-md transform overflow-hidden rounded-2xl border-solid border-custom-red bg-custom-green p-6 text-left align-middle text-white shadow-xl transition-all">
                  <div className="flex w-full cursor-pointer justify-end">
                    <MdClose size={25} onClick={closeModal} />
                  </div>
                  <Dialog.Title
                    as="h1"
                    className="mb-8 text-center text-3xl font-extrabold text-custom-cream"
                  >
                    {name}
                  </Dialog.Title>
                  <ul className="text-xl font-semibold leading-9">
                    {description.map((desc, i) => {
                      return <li key={i}>{desc}</li>;
                    })}
                  </ul>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

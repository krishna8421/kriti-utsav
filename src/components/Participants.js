import { useState } from "react";
import classNames from "classnames";
import { GoDiffAdded } from "react-icons/go";
import Form from "./partcipants/Form";
import { showNotification } from "@mantine/notifications";

const Participants = () => {
  const [tabSection, setTabSection] = useState(1);
  const [fineArts, setFineArts] = useState([
    {
      event: "DEFAULT",
      fullname: "",
      gender: "DEFAULT",
      dob: "",
      prticipation: "DEFAULT",
      photourl: "",
    },
  ]);
  const [literary, setLiterary] = useState([
    {
      event: "DEFAULT",
      fullname: "",
      gender: "DEFAULT",
      dob: "",
      prticipation: "DEFAULT",
      photourl: "",
    },
  ]);
  const [music, setMusic] = useState([
    {
      event: "DEFAULT",
      fullname: "",
      gender: "DEFAULT",
      dob: "",
      prticipation: "DEFAULT",
      photourl: "",
    },
  ]);
  const [dance, setDance] = useState([
    {
      event: "DEFAULT",
      fullname: "",
      gender: "DEFAULT",
      dob: "",
      prticipation: "DEFAULT",
      photourl: "",
    },
  ]);
  const [theatre, setTheatre] = useState([
    {
      event: "DEFAULT",
      fullname: "",
      gender: "DEFAULT",
      dob: "",
      prticipation: "DEFAULT",
      photourl: "",
    },
  ]);
  console.log(fineArts);
  const handleAddFields = () => {
    // const { event, fullname, gender, dob, prticipation, photourl } = fineArts;
    // console.log(event, fullname, gender, dob, prticipation, photourl);

    // if (event || !fullname || !gender || !dob || !prticipation || !photourl) {
    //   showNotification({
    //     title: "Error",
    //     message: "Please fill all the fields to add participants",
    //     color: "red",
    //     autoClose: 3 * 1000,
    //   });
    //   return;
    // }

    tabSection === 1 &&
      setFineArts([
        ...fineArts,
        {
          event: "DEFAULT",
          fullname: "",
          gender: "DEFAULT",
          dob: "",
          prticipation: "DEFAULT",
          photourl: "",
        },
      ]);
    tabSection === 2 &&
      setLiterary([
        ...literary,
        {
          event: "DEFAULT",
          fullname: "",
          gender: "DEFAULT",
          dob: "",
          prticipation: "DEFAULT",
          photourl: "",
        },
      ]);
    tabSection === 3 &&
      setMusic([
        ...music,
        {
          event: "DEFAULT",
          fullname: "",
          gender: "DEFAULT",
          dob: "",
          prticipation: "DEFAULT",
          photourl: "",
        },
      ]);
    tabSection === 4 &&
      setDance([
        ...dance,
        {
          event: "DEFAULT",
          fullname: "",
          gender: "DEFAULT",
          dob: "",
          prticipation: "DEFAULT",
          photourl: "",
        },
      ]);
    tabSection === 5 &&
      setTheatre([
        ...theatre,
        {
          event: "DEFAULT",
          fullname: "",
          gender: "DEFAULT",
          dob: "",
          prticipation: "DEFAULT",
          photourl: "",
        },
      ]);
  };
  return (
    <div className="mt-4">
      {/* creating tabs */}
      <div className="flex flex-wrap justify-around gap-4">
        <div
          className="cursor-pointer rounded-lg bg-[#841531] py-1 px-2 text-sm font-bold text-white md:py-3 md:px-6 md:text-base"
          onClick={() => setTabSection(1)}
        >
          Fine Arts
        </div>
        <div
          className="cursor-pointer rounded-lg bg-[#FD8E13] py-1 px-2 text-sm font-bold text-white md:py-3 md:px-6 md:text-base"
          onClick={() => setTabSection(2)}
        >
          Literary
        </div>
        <div
          className="cursor-pointer rounded-lg bg-[#E52A48] py-1 px-2 text-sm font-bold text-white md:py-3 md:px-6 md:text-base"
          onClick={() => setTabSection(3)}
        >
          Music
        </div>
        <div
          className="px32 cursor-pointer rounded-lg bg-[#1A8C92] py-1 px-2 text-sm font-bold text-white md:py-3 md:px-6 md:text-base"
          onClick={() => setTabSection(4)}
        >
          Dance
        </div>
        <div
          className="px32 cursor-pointer rounded-lg bg-[#2E1739] py-1 px-2 text-sm font-bold text-white md:py-3 md:px-6 md:text-base"
          onClick={() => setTabSection(5)}
        >
          Theatre
        </div>
      </div>

      {/* box section */}
      <div
        className={classNames(
          "relative mt-3 h-96 w-full overflow-x-hidden rounded-t-xl border-[3px] border-solid bg-custom-cream",
          {
            "border-[#841531]": tabSection === 1,
            "border-[#FD8E13]": tabSection === 2,
            "border-[#E52A48]": tabSection === 3,
            "border-[#1A8C92]": tabSection === 4,
            "border-[#2E1739]": tabSection === 5,
          }
        )}
      >
        {/* form fillup */}
        {tabSection === 1 &&
          fineArts.map((fields, index) => (
            <Form
              tabSection={tabSection}
              key={index}
              index={index}
              fields={fields}
              valueFields={fineArts}
              setFields={setFineArts}
            />
          ))}
        {tabSection === 2 &&
          literary.map((fields, index) => (
            <Form
              tabSection={tabSection}
              key={index}
              index={index}
              fields={fields}
              valueFields={literary}
              setFields={setLiterary}
            />
          ))}
        {tabSection === 3 &&
          music.map((fields, index) => (
            <Form
              tabSection={tabSection}
              key={index}
              index={index}
              fields={fields}
              valueFields={music}
              setFields={setMusic}
            />
          ))}
        {tabSection === 4 &&
          dance.map((fields, index) => (
            <Form
              tabSection={tabSection}
              key={index}
              index={index}
              fields={fields}
              valueFields={dance}
              setFields={setDance}
            />
          ))}
        {tabSection === 5 &&
          theatre.map((fields, index) => (
            <Form
              tabSection={tabSection}
              key={index}
              index={index}
              fields={fields}
              valueFields={theatre}
              setFields={setTheatre}
            />
          ))}
      </div>

      {/* Add more button section */}
      <div
        className={classNames("z-10 w-full rounded-b-xl p-4", {
          "bg-[#841531]": tabSection === 1,
          "bg-[#FD8E13]": tabSection === 2,
          "bg-[#E52A48]": tabSection === 3,
          "bg-[#1A8C92]": tabSection === 4,
          "bg-[#2E1739]": tabSection === 5,
        })}
      >
        <div
          className={classNames(
            "flex w-2/12 cursor-pointer items-center rounded-lg border-none bg-custom-cream p-3 font-bold text-custom-red hover:bg-custom-cream/95",
            {
              "text-[#841531]": tabSection === 1,
              "text-[#FD8E13]": tabSection === 2,
              "text-[#E52A48]": tabSection === 3,
              "text-[#1A8C92]": tabSection === 4,
              "text-[#2E1739]": tabSection === 5,
            }
          )}
          onClick={() => handleAddFields()}
        >
          <GoDiffAdded size={20} className="mr-2" />
          Add Participants
        </div>
      </div>
    </div>
  );
};

export default Participants;

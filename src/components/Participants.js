import { useEffect, useState } from "react";
import classNames from "classnames";
import { GoDiffAdded } from "react-icons/go";
import Form from "./partcipants/Form";
import { v1 as uuid } from "uuid";
import { Button, LoadingOverlay } from "@mantine/core";
import { participationDetailsAtom } from "../store/participationDetails";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

const defaultFineArts = {
  id: uuid(),
  eventType: "fineArts",
  event: "DEFAULT",
  name: "",
  gender: "DEFAULT",
  DOB: "",
  modeOfParticipation: "DEFAULT",
  photoUrl: "",
};

const defaultLiterary = {
  id: uuid(),
  eventType: "literary",
  event: "DEFAULT",
  name: "",
  gender: "DEFAULT",
  DOB: "",
  modeOfParticipation: "DEFAULT",
  photoUrl: "",
};

const defaultMusic = {
  id: uuid(),
  eventType: "music",
  event: "DEFAULT",
  name: "",
  gender: "DEFAULT",
  DOB: "",
  modeOfParticipation: "DEFAULT",
  photoUrl: "",
};

const defaultDance = {
  id: uuid(),
  eventType: "dance",
  event: "DEFAULT",
  name: "",
  gender: "DEFAULT",
  DOB: "",
  modeOfParticipation: "DEFAULT",
  photoUrl: "",
};

const defaultTheatre = {
  id: uuid(),
  eventType: "theatre",
  event: "DEFAULT",
  name: "",
  gender: "DEFAULT",
  DOB: "",
  modeOfParticipation: "DEFAULT",
  photoUrl: "",
};

const Participants = () => {
  const [tabSection, setTabSection] = useState(1);
  const [participationDetails, setParticipationDetails] = useAtom(
    participationDetailsAtom
  );

  const [visible, setVisible] = useState(false);

  const [fineArts, setFineArts] = useState([defaultFineArts]);
  const [literary, setLiterary] = useState([defaultLiterary]);
  const [music, setMusic] = useState([defaultMusic]);
  const [dance, setDance] = useState([defaultDance]);
  const [theatre, setTheatre] = useState([defaultTheatre]);

  useEffect(() => {
    let f = [],
      l = [],
      m = [],
      d = [],
      t = [];
    participationDetails?.filter((participation) => {
      if (participation.eventType === "fineArts") f.push(participation);
      if (participation.eventType === "literary") l.push(participation);
      if (participation.eventType === "music") m.push(participation);
      if (participation.eventType === "dance") d.push(participation);
      if (participation.eventType === "theatre") t.push(participation);
    });
    setFineArts(f.length === 0 ? [defaultFineArts] : [...f]);
    setLiterary(l.length === 0 ? [defaultLiterary] : [...l]);
    setMusic(m.length === 0 ? [defaultMusic] : [...m]);
    setDance(d.length === 0 ? [defaultDance] : [...d]);
    setTheatre(t.length === 0 ? [defaultTheatre] : [...t]);
  }, [participationDetails]);

  const handleAddFields = () => {
    tabSection === 1 &&
      fineArts.length < 13 &&
      setFineArts([
        ...fineArts,
        {
          id: uuid(),
          eventType: "fineArts",
          event: "DEFAULT",
          name: "",
          gender: "DEFAULT",
          DOB: "",
          modeOfParticipation: "DEFAULT",
          photoUrl: "",
        },
      ]);

    tabSection === 2 &&
      literary.length < 6 &&
      setLiterary([
        ...literary,
        {
          id: uuid(),
          eventType: "literary",
          event: "DEFAULT",
          name: "",
          gender: "DEFAULT",
          DOB: "",
          modeOfParticipation: "DEFAULT",
          photoUrl: "",
        },
      ]);
    tabSection === 3 &&
      music.length < 48 &&
      setMusic([
        ...music,
        {
          id: uuid(),
          eventType: "music",
          event: "DEFAULT",
          name: "",
          gender: "DEFAULT",
          DOB: "",
          modeOfParticipation: "DEFAULT",
          photoUrl: "",
        },
      ]);
    tabSection === 4 &&
      dance.length < 19 &&
      setDance([
        ...dance,
        {
          id: uuid(),
          eventType: "dance",
          event: "DEFAULT",
          name: "",
          gender: "DEFAULT",
          DOB: "",
          modeOfParticipation: "DEFAULT",
          photoUrl: "",
        },
      ]);
    tabSection === 5 &&
      theatre.length < 30 &&
      setTheatre([
        ...theatre,
        {
          id: uuid(),
          eventType: "theatre",
          event: "DEFAULT",
          name: "",
          gender: "DEFAULT",
          DOB: "",
          modeOfParticipation: "DEFAULT",
          photoUrl: "",
        },
      ]);
  };

  const handleSaveDetails = async () => {
    const participation = fineArts.concat(literary, music, dance, theatre);
    setParticipationDetails(participation);
    setVisible(true);
    const token = Cookies.get("token");
    try {
      const res = await axios.post(
        "/api/saveParticipatesDetails",
        { ParticipationDetails: participation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      showNotification({
        title: "Data Added Successfully",
        message: "Participants details added successfully",
        color: "green",
        autoClose: 3 * 1000,
      });
      setVisible(false);
    } catch (err) {
      showNotification({
        title: "ERROR",
        message: "Unable to save data",
        color: "red",
        autoClose: 3 * 1000,
      });
      setVisible(false);
    }
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
        <LoadingOverlay visible={visible} overlayBlur={2} />
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
        <Button
          className={classNames(
            "bg-custom-cream font-bold text-custom-red hover:bg-custom-cream/95",
            {
              "text-[#841531]": tabSection === 1,
              "text-[#FD8E13]": tabSection === 2,
              "text-[#E52A48]": tabSection === 3,
              "text-[#1A8C92]": tabSection === 4,
              "text-[#2E1739]": tabSection === 5,
            }
          )}
          radius="md"
          size="md"
          onClick={() => {
            handleAddFields();
          }}
          leftIcon={<GoDiffAdded size={20} />}
        >
          Add Participants
        </Button>

        <Button
          className={classNames(
            "mt-2 bg-custom-cream font-bold text-custom-red hover:bg-custom-cream/95 md:ml-2 md:mt-0",
            {
              "text-[#841531]": tabSection === 1,
              "text-[#FD8E13]": tabSection === 2,
              "text-[#E52A48]": tabSection === 3,
              "text-[#1A8C92]": tabSection === 4,
              "text-[#2E1739]": tabSection === 5,
            }
          )}
          radius="md"
          size="md"
          onClick={() => {
            handleSaveDetails();
          }}
          leftIcon={<GoDiffAdded size={20} />}
        >
          Save Details
        </Button>
      </div>
    </div>
  );
};

export default Participants;

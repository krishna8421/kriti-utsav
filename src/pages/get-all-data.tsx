import { useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import ContingentInCharge from "../components/table/ContingentInCharge";
import Travelinfo from "../components/table/Travelinfo";
import PartcipantsStrength from "../components/table/PartcipantsStrength";
import Participants from "../components/table/Participants";
import Transaction from "../components/table/Transaction";

const AllDetails = () => {
  const [allUniversity, setAllUniversity] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    fetch("/api/get-all-data?username=ksac&password=7c57a-0b8f7-8c280-d7a5d")
      .then((a) => a.json())
      .then((parsed) => {
        setAllUniversity(parsed.users);
      });
    setVisible(false);
  }, []);

  return (
    <div className="relative p-6">
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <div className="mb-8 flex w-full items-center justify-between">
        <div className="text-xl font-bold md:text-4xl">
          All University Details
        </div>
        <div className="flex">
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(allUniversity)
            )}`}
            download="All_University_Details.json"
            className="mx-auto flex h-11 items-center justify-center rounded border-0 bg-indigo-500 py-2 px-4 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 40.496 36"
              className="fill-current"
            >
              <path
                id="Icon_awesome-file-export"
                d="M27,8.571a1.682,1.682,0,0,0-.492-1.188L19.624.492A1.686,1.686,0,0,0,18.429,0H18V9h9ZM40.148,21.656,33.42,14.878a1.128,1.128,0,0,0-1.927.795V20.25h-4.5v4.5h4.5v4.584a1.128,1.128,0,0,0,1.927.795l6.729-6.785A1.2,1.2,0,0,0,40.148,21.656ZM13.5,23.625v-2.25a1.128,1.128,0,0,1,1.125-1.125H27v-9H17.438A1.692,1.692,0,0,1,15.75,9.563V0H1.688A1.683,1.683,0,0,0,0,1.688V34.313A1.683,1.683,0,0,0,1.688,36H25.313A1.683,1.683,0,0,0,27,34.313V24.75H14.625A1.128,1.128,0,0,1,13.5,23.625Z"
              />
            </svg>
            <span className="pl-2 font-semibold">Export Json</span>
          </a>

          <a
            href="https://products.aspose.app/cells/conversion/json-to-xlsx"
            target="_blank"
            title="email-link"
            rel="noopener noreferrer"
            className="ml-4 flex h-11 items-center justify-center rounded border-0 bg-orange-500 py-2 px-4 text-lg text-white hover:bg-orange-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 40.496 36"
              className="fill-current"
            >
              <path
                id="Icon_awesome-file-export"
                d="M27,8.571a1.682,1.682,0,0,0-.492-1.188L19.624.492A1.686,1.686,0,0,0,18.429,0H18V9h9ZM40.148,21.656,33.42,14.878a1.128,1.128,0,0,0-1.927.795V20.25h-4.5v4.5h4.5v4.584a1.128,1.128,0,0,0,1.927.795l6.729-6.785A1.2,1.2,0,0,0,40.148,21.656ZM13.5,23.625v-2.25a1.128,1.128,0,0,1,1.125-1.125H27v-9H17.438A1.692,1.692,0,0,1,15.75,9.563V0H1.688A1.683,1.683,0,0,0,0,1.688V34.313A1.683,1.683,0,0,0,1.688,36H25.313A1.683,1.683,0,0,0,27,34.313V24.75H14.625A1.128,1.128,0,0,1,13.5,23.625Z"
              />
            </svg>
            <span className="pl-2 font-semibold">Convert Excel</span>
          </a>
        </div>
      </div>
      {allUniversity.map((univesityDetails) => (
        <div
          key={
            //@ts-ignore
            univesityDetails.id
          }
          className="mb-14"
        >
          <span className="rounded-lg bg-emerald-800 p-2 font-bold text-white">
            {
              //@ts-ignore
              univesityDetails.name
            }
          </span>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Travelling Info
            </span>
            <div className="mt-3">
              <Travelinfo
                details={
                  //@ts-ignore
                  univesityDetails.UserResponse
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Participants Strength
            </span>
            <div className="mt-3">
              <PartcipantsStrength
                details={
                  //@ts-ignore
                  univesityDetails.UserResponse
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Contingent In-Charge
            </span>
            <div className="mt-3">
              <ContingentInCharge
                details={
                  //@ts-ignore
                  univesityDetails.UserResponse.ContingentInCharge
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Participation Details
            </span>
            <div className="mt-3">
              <Participants
                details={
                  //@ts-ignore
                  univesityDetails.UserResponse.ParticipationDetails
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Transaction Details
            </span>
            <div className="mt-3">
              <Transaction
                details={
                  //@ts-ignore
                  univesityDetails.UserResponse
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllDetails;

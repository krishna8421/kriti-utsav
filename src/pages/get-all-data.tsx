import { useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import ContingentInCharge from "../components/table/ContingentInCharge";
import Travelinfo from "../components/table/Travelinfo";
import PartcipantsStrength from "../components/table/PartcipantsStrength";
import Participants from "../components/table/Participants";
import Transaction from "../components/table/Transaction";

const Blog = () => {
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

  console.log(allUniversity);

  return (
    <div className="relative p-6">
      <LoadingOverlay visible={visible} overlayBlur={2} />
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
export default Blog;

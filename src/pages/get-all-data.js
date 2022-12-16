import { useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import ContingentInCharge from "../components/table/ContingentInCharge";
import Travelinfo from "../components/table/Travelinfo";
import PartcipantsStrength from "../components/table/PartcipantsStrength";
import Participants from "../components/table/Participants";

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
        <div key={univesityDetails.id} className="mb-14">
          <span className="rounded-lg bg-emerald-800 p-2 font-bold text-white">
            {univesityDetails.name}
          </span>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Travelling Info
            </span>
            <div className="mt-3">
              <Travelinfo details={univesityDetails.UserResponse} />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Participants Strength
            </span>
            <div className="mt-3">
              <PartcipantsStrength details={univesityDetails.UserResponse} />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Contingent In-Charge
            </span>
            <div className="mt-3">
              <ContingentInCharge
                details={univesityDetails.UserResponse.ContingentInCharge}
              />
            </div>
          </div>
          <div className="mt-6">
            <span className="rounded-lg bg-emerald-400 p-2 font-bold text-white">
              Participation Details
            </span>
            <div className="mt-3">
              <Participants
                details={univesityDetails.UserResponse.ParticipationDetails}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Blog;

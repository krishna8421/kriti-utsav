import classNames from "classnames";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { event } from "../../constants/data";
import { UploadPhoto } from "../../utils/UploadPhoto";
import { useAuth } from "../../hooks/useAuth";

const Form = (props) => {
  const { fields, tabSection, index, setFields, valueFields } = props;
  const { user } = useAuth();
  const handleChangeInput = (index, event) => {
    const values = [...valueFields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  return (
    <div>
      <div className="items-center gap-2 p-2 md:flex">
        <div className="w-full">
          <select
            name="event"
            value={fields.event}
            className={classNames(
              "w-full border-spacing-2 rounded-lg border-[2.5px] bg-[#FFDDB8] p-2",
              {
                "border-[#841531]": tabSection === 1,
                "border-[#FD8E13]": tabSection === 2,
                "border-[#E52A48]": tabSection === 3,
                "border-[#1A8C92]": tabSection === 4,
                "border-[#2E1739]": tabSection === 5,
              }
            )}
            onChange={(event) => handleChangeInput(index, event)}
          >
            <option value="DEFAULT" disabled hidden>
              Select Event
            </option>
            {tabSection === 1 &&
              event.fineArts.map((k, v) => (
                <option key={v} value={k}>
                  {k}
                </option>
              ))}
            {tabSection === 2 &&
              event.literary.map((k, v) => (
                <option key={v} value={k}>
                  {k}
                </option>
              ))}
            {tabSection === 3 &&
              event.music.map((k, v) => (
                <option key={v} value={k}>
                  {k}
                </option>
              ))}
            {tabSection === 4 &&
              event.dance.map((k, v) => (
                <option key={v} value={k}>
                  {k}
                </option>
              ))}
            {tabSection === 5 &&
              event.theatre.map((k, v) => (
                <option key={v} value={k}>
                  {k}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full">
          <input
            name="name"
            value={fields.name}
            placeholder="Full Name"
            className={classNames(
              "w-full border-spacing-2 rounded-lg border-[2.5px] bg-[#FFDDB8] p-2",
              {
                "border-[#841531]": tabSection === 1,
                "border-[#FD8E13]": tabSection === 2,
                "border-[#E52A48]": tabSection === 3,
                "border-[#1A8C92]": tabSection === 4,
                "border-[#2E1739]": tabSection === 5,
              }
            )}
            onChange={(event) => handleChangeInput(index, event)}
          />
        </div>
        <div className="w-full">
          <select
            name="gender"
            value={fields.gender}
            className={classNames(
              "w-full border-spacing-2 rounded-lg border-[2.5px] bg-[#FFDDB8] p-2",
              {
                "border-[#841531]": tabSection === 1,
                "border-[#FD8E13]": tabSection === 2,
                "border-[#E52A48]": tabSection === 3,
                "border-[#1A8C92]": tabSection === 4,
                "border-[#2E1739]": tabSection === 5,
              }
            )}
            onChange={(event) => handleChangeInput(index, event)}
          >
            <option value="DEFAULT" disabled hidden>
              Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>
        <div className="w-full">
          <input
            name="DOB"
            value={fields.DOB}
            type="date"
            placeholder="Date of birth"
            className={classNames(
              "w-full border-spacing-2 rounded-lg border-[2.5px] bg-[#FFDDB8] p-2",
              {
                "border-[#841531]": tabSection === 1,
                "border-[#FD8E13]": tabSection === 2,
                "border-[#E52A48]": tabSection === 3,
                "border-[#1A8C92]": tabSection === 4,
                "border-[#2E1739]": tabSection === 5,
              }
            )}
            onChange={(event) => handleChangeInput(index, event)}
          />
        </div>
        <div className="w-full">
          <select
            name="modeOfParticipation"
            value={fields.modeOfParticipation}
            className={classNames(
              "w-full border-spacing-2 rounded-lg border-[2.5px] bg-[#FFDDB8] p-2",
              {
                "border-[#841531]": tabSection === 1,
                "border-[#FD8E13]": tabSection === 2,
                "border-[#E52A48]": tabSection === 3,
                "border-[#1A8C92]": tabSection === 4,
                "border-[#2E1739]": tabSection === 5,
              }
            )}
            onChange={(event) => handleChangeInput(index, event)}
          >
            <option value="DEFAULT" disabled hidden>
              Mode of participation
            </option>
            <option value="Participant">Participant</option>
            <option value="Student_Accompanist">Student Accompanist</option>
            <option value="OTHERS">Professional (Outside) Accompanist</option>
          </select>
        </div>
        <div className="flex w-9/12 justify-end">
          <FileInput
            accept="image/png,image/jpeg,image/jpg"
            // placeholder={
            //   fields.photoUrl
            //     ? fields.photoUrl
            //         .trim()
            //         .split("o/")[1]
            //         .split("?")[0]
            //         .split("%2F")[1]
            //     : "Upload Photo"
            // }
            placeholder="Upload Photo"
            name="photourl"
            styles={{
              placeholder: {
                color: "white",
                fontWeight: "bold",
              },
              input: {
                border: "none",
                backgroundColor: `${
                  tabSection === 1
                    ? "#841531"
                    : tabSection === 2
                    ? "#FD8E13"
                    : tabSection === 3
                    ? "#E52A48"
                    : tabSection === 4
                    ? "#1A8C92"
                    : tabSection === 5
                    ? "#2E1739"
                    : ""
                }`,
                color: "white",
                fontWeight: "bold",
                padding: "9px",
              },
            }}
            icon={<BiCloudUpload size={24} color="white" />}
            onChange={async (f) => {
              const url = await UploadPhoto(f, user?.id);
              const values = [...valueFields];
              values[index]["photoUrl"] = url;
              setFields(values);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;

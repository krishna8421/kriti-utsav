import { Tabs, Button, InputBase, Input, Select } from "@mantine/core";
import { GoDiffAdded } from "react-icons/go";
import InputMask from "react-input-mask";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { event } from "../constants/data";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { showNotification } from "@mantine/notifications";

interface Props {
  participationDetails: any;
  setParticipationDetails: any;
}

export const ParticipationDetails = ({
  participationDetails,
  setParticipationDetails,
}: Props) => {
  const [tempValue, setTempValue] = useState({});
  return (
    <div className="mt-4">
      <Tabs defaultValue="fine-arts" unstyled>
        <Tabs.List className="flex justify-around gap-4">
          <Tabs.Tab
            className="cursor-pointer rounded-lg border-none bg-[#841531] py-3 px-6 font-bold text-white"
            value="fine-arts"
          >
            Fine Arts
          </Tabs.Tab>
          <Tabs.Tab
            className="cursor-pointer rounded-lg border-none bg-[#FD8E13] py-3 px-6 font-bold text-white"
            value="literary"
          >
            Literary
          </Tabs.Tab>
          <Tabs.Tab
            className="cursor-pointer rounded-lg border-none bg-[#E52A48] py-3 px-6 font-bold text-white"
            value="music"
          >
            Music
          </Tabs.Tab>
          <Tabs.Tab
            className="cursor-pointer rounded-lg border-none bg-[#1A8C92] py-3 px-6 font-bold text-white"
            value="dance"
          >
            Dance
          </Tabs.Tab>
          <Tabs.Tab
            className="cursor-pointer rounded-lg border-none bg-[#2E1739] py-3 px-6 font-bold text-white"
            value="theatre"
          >
            Theatre
          </Tabs.Tab>
        </Tabs.List>
        <div className="relative mt-4 rounded-xl bg-custom-cream py-8 pb-20">
          <div className="mx-4">
            <Tabs.Panel value="fine-arts">
              <div className="flex justify-around gap-4">
                <Select
                  placeholder="Event"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      eventType: "FINE_ARTS",
                      event: e,
                    });
                  }}
                  data={[
                    ...event.fineArts.map((d) => ({
                      value: d.toLowerCase().replace(/[^a-z]/g, "-"),
                      label: d,
                    })),
                  ]}
                />

                <Input.Wrapper id="name" required>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    // @ts-ignore
                    value={tempValue.name ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>
                <Select
                  placeholder="Gender"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      gender: e,
                    });
                  }}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "others", label: "Others" },
                  ]}
                />
                <Input.Wrapper id="dob" required>
                  <InputBase
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    component={InputMask}
                    mask="99/99/9999"
                    // @ts-ignore
                    value={tempValue.DOB ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        DOB: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Select
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      modeOfParticipation: e,
                    });
                  }}
                  data={[
                    { value: "participant", label: "Participant" },
                    {
                      value: "student-accompanist",
                      label: "Student Accompanist",
                    },
                    {
                      value: "professional-accompanist-outside",
                      label: "Professional Accompanist Outside",
                    },
                  ]}
                />

                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="Upload Photo"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  // @ts-ignore
                  value={tempValue.photoUrl ?? null}
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      photoUrl: e,
                    });
                  }}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="literary">
              <div className="flex justify-around gap-4">
                <Select
                  placeholder="Event"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      eventType: "LITERARY",
                      event: e,
                    });
                  }}
                  data={[
                    ...event.literary.map((d) => ({
                      value: d.toLowerCase().replace(/[^a-z]/g, "-"),
                      label: d,
                    })),
                  ]}
                />

                <Input.Wrapper id="name" required>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    // @ts-ignore
                    value={tempValue.name ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>
                <Select
                  placeholder="Gender"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      gender: e,
                    });
                  }}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "others", label: "Others" },
                  ]}
                />

                <Input.Wrapper id="dob" required>
                  <InputBase
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    component={InputMask}
                    mask="99/99/9999"
                    // @ts-ignore
                    value={tempValue.DOB ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        DOB: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mode-of-participation" required>
                  <InputBase
                    component="select"
                    id="mode-of-participation"
                    rightSection={<MdArrowDropDown size={14} />}
                    // @ts-ignore
                    value={tempValue.modeOfParticipation ?? "participant"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        modeOfParticipation: e.target.value,
                      });
                    }}
                  >
                    <option value="participant">Participant</option>
                    <option value="student-accompanist">
                      Student Accompanist
                    </option>
                    <option value="professional-accompanist-outside">
                      Professional Accompanist (Outside)
                    </option>
                  </InputBase>
                </Input.Wrapper>

                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="Upload Photo"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  // @ts-ignore
                  value={tempValue.photoUrl ?? null}
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      photoUrl: e,
                    });
                  }}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="music">
              <div className="flex justify-around gap-4">
                <Select
                  placeholder="Event"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      eventType: "MUSIC",
                      event: e,
                    });
                  }}
                  data={[
                    ...event.music.map((d) => ({
                      value: d.toLowerCase().replace(/[^a-z]/g, "-"),
                      label: d,
                    })),
                  ]}
                />
                <Input.Wrapper id="name" required>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    // @ts-ignore
                    value={tempValue.name ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Select
                  placeholder="Gender"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      gender: e,
                    });
                  }}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "others", label: "Others" },
                  ]}
                />

                <Input.Wrapper id="dob" required>
                  <InputBase
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    component={InputMask}
                    mask="99/99/9999"
                    // @ts-ignore
                    value={tempValue.DOB ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        DOB: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mode-of-participation" required>
                  <InputBase
                    component="select"
                    id="mode-of-participation"
                    rightSection={<MdArrowDropDown size={14} />}
                    // @ts-ignore
                    value={tempValue.modeOfParticipation ?? "participant"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        modeOfParticipation: e.target.value,
                      });
                    }}
                  >
                    <option value="participant">Participant</option>
                    <option value="student-accompanist">
                      Student Accompanist
                    </option>
                    <option value="professional-accompanist-outside">
                      Professional Accompanist (Outside)
                    </option>
                  </InputBase>
                </Input.Wrapper>

                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="Upload Photo"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  // @ts-ignore
                  value={tempValue.photoUrl ?? null}
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      photoUrl: e,
                    });
                  }}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="dance">
              <div className="flex justify-around gap-4">
                <Select
                  placeholder="Event"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      eventType: "DANCE",
                      event: e,
                    });
                  }}
                  data={[
                    ...event.dance.map((d) => ({
                      value: d.toLowerCase().replace(/[^a-z]/g, "-"),
                      label: d,
                    })),
                  ]}
                />
                <Input.Wrapper id="name" required>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    // @ts-ignore
                    value={tempValue.name ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Select
                  placeholder="Gender"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      gender: e,
                    });
                  }}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "others", label: "Others" },
                  ]}
                />

                <Input.Wrapper id="dob" required>
                  <InputBase
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    component={InputMask}
                    mask="99/99/9999"
                    // @ts-ignore
                    value={tempValue.DOB ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        DOB: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mode-of-participation" required>
                  <InputBase
                    component="select"
                    id="mode-of-participation"
                    rightSection={<MdArrowDropDown size={14} />}
                    // @ts-ignore
                    value={tempValue.modeOfParticipation ?? "participant"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        modeOfParticipation: e.target.value,
                      });
                    }}
                  >
                    <option value="participant">Participant</option>
                    <option value="student-accompanist">
                      Student Accompanist
                    </option>
                    <option value="professional-accompanist-outside">
                      Professional Accompanist (Outside)
                    </option>
                  </InputBase>
                </Input.Wrapper>

                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="Upload Photo"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  // @ts-ignore
                  value={tempValue.photoUrl ?? null}
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      photoUrl: e,
                    });
                  }}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="theatre">
              <div className="flex justify-around gap-4">
                <Select
                  placeholder="Event"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      eventType: "THEATRE",
                      event: e,
                    });
                  }}
                  data={[
                    ...event.theatre.map((d) => ({
                      value: d.toLowerCase().replace(/[^a-z]/g, "-"),
                      label: d,
                    })),
                  ]}
                />

                <Input.Wrapper id="name" required>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    // @ts-ignore
                    value={tempValue.name ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Select
                  placeholder="Gender"
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      gender: e,
                    });
                  }}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "others", label: "Others" },
                  ]}
                />

                <Input.Wrapper id="dob" required>
                  <InputBase
                    id="dob"
                    placeholder="DD/MM/YYYY"
                    component={InputMask}
                    mask="99/99/9999"
                    // @ts-ignore
                    value={tempValue.DOB ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        DOB: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mode-of-participation" required>
                  <InputBase
                    component="select"
                    id="mode-of-participation"
                    rightSection={<MdArrowDropDown size={14} />}
                    // @ts-ignore
                    value={tempValue.modeOfParticipation ?? "participant"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        modeOfParticipation: e.target.value,
                      });
                    }}
                  >
                    <option value="participant">Participant</option>
                    <option value="student-accompanist">
                      Student Accompanist
                    </option>
                    <option value="professional-accompanist-outside">
                      Professional Accompanist (Outside)
                    </option>
                  </InputBase>
                </Input.Wrapper>

                <FileInput
                  accept="image/png,image/jpeg,image/jpg"
                  placeholder="Upload Photo"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  // @ts-ignore
                  value={tempValue.photoUrl ?? null}
                  onChange={(e) => {
                    setTempValue({
                      ...tempValue,
                      photoUrl: e,
                    });
                  }}
                />
              </div>
            </Tabs.Panel>

            <div>
              <table
                className={`${
                  participationDetails.length === 0 ? "hidden" : ""
                }`}
              >
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Event</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Mode of Participation</th>
                  </tr>
                </thead>
                <tbody>
                  {participationDetails.map((d: any, i: number) => (
                    <tr key={i}>
                      <td className="px-8">
                        {d.eventType?.replace(/_/g, " ")}
                      </td>
                      <td className="px-8">
                        {(d.event[0].toUpperCase() + d.event.slice(1)).replace(
                          /-/g,
                          " "
                        )}
                      </td>
                      <td className="px-8">{d.name}</td>
                      <td className="px-8">{d.gender}</td>
                      <td className="px-8">{d.DOB}</td>
                      <td className="px-8">
                        {(
                          d.modeOfParticipation[0].toUpperCase() +
                          d.modeOfParticipation.slice(1)
                        ).replace(/-/g, " ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute bottom-0 w-full rounded-b-xl bg-custom-red p-4">
            <Button
              className="bg-custom-cream text-custom-red hover:bg-custom-cream/95"
              leftIcon={<GoDiffAdded />}
              onClick={() => {
                const {
                  // @ts-ignore
                  event,
                  // @ts-ignore
                  name,
                  // @ts-ignore
                  gender,
                  // @ts-ignore
                  DOB,
                  // @ts-ignore
                  modeOfParticipation,
                  // @ts-ignore
                  photoUrl,
                } = tempValue;

                if (
                  !event ||
                  !name ||
                  !gender ||
                  !DOB ||
                  !modeOfParticipation ||
                  !photoUrl
                ) {
                  console.log({
                    event,
                    name,
                    gender,
                    DOB,
                    modeOfParticipation,
                    photoUrl,
                  });
                  showNotification({
                    title: "Error",
                    message: "Please fill all the fields to add participants",
                    color: "red",
                    autoClose: 3 * 1000,
                  });
                  return;
                }
                setParticipationDetails([...participationDetails, tempValue]);
                setTempValue({});
              }}
            >
              Add Participants
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

import { Tabs, Button, InputBase, Input } from "@mantine/core";
import { GoDiffAdded } from "react-icons/go";
import InputMask from "react-input-mask";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { event } from "../constants/data";
import { useState } from "react";

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
                <Input.Wrapper id="fine-arts-event" required>
                  <InputBase
                    component="select"
                    id="fine-arts-event"
                    // @ts-ignore
                    value={tempValue.event ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        eventType: "FINE_ARTS",
                        event: e.target.value,
                      });
                    }}
                  >
                    {event.fineArts.map((d, i) => (
                      <option
                        key={i}
                        value={d.toLowerCase().replace(/[^a-z]/g, "-")}
                      >
                        {d}
                      </option>
                    ))}
                  </InputBase>
                </Input.Wrapper>

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

                <Input.Wrapper id="gender" required>
                  <InputBase
                    component="select"
                    id="gender"
                    // @ts-ignore
                    value={tempValue.gender ?? "male"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

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
                <Input.Wrapper id="literary-event" required>
                  <InputBase
                    component="select"
                    id="literary-event"
                    // @ts-ignore
                    value={tempValue.event ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        eventType: "LITERARY",
                        event: e.target.value,
                      });
                    }}
                  >
                    {event.literary.map((d, i) => (
                      <option
                        key={i}
                        value={d.toLowerCase().replace(/[^a-z]/g, "-")}
                      >
                        {d}
                      </option>
                    ))}
                  </InputBase>
                </Input.Wrapper>

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

                <Input.Wrapper id="gender" required>
                  <InputBase
                    component="select"
                    id="gender"
                    // @ts-ignore
                    value={tempValue.gender ?? "male"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

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
                <Input.Wrapper id="music-event" required>
                  <InputBase
                    component="select"
                    id="music-event"
                    // @ts-ignore
                    value={tempValue.event ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        eventType: "MUSIC",
                        event: e.target.value,
                      });
                    }}
                  >
                    {event.music.map((d, i) => (
                      <option
                        key={i}
                        value={d.toLowerCase().replace(/[^a-z]/g, "-")}
                      >
                        {d}
                      </option>
                    ))}
                  </InputBase>
                </Input.Wrapper>

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

                <Input.Wrapper id="gender" required>
                  <InputBase
                    component="select"
                    id="gender"
                    // @ts-ignore
                    value={tempValue.gender ?? "male"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

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
                <Input.Wrapper id="dance-event" required>
                  <InputBase
                    component="select"
                    id="dance-event"
                    // @ts-ignore
                    value={tempValue.event ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        eventType: "DANCE",
                        event: e.target.value,
                      });
                    }}
                  >
                    {event.dance.map((d, i) => (
                      <option
                        key={i}
                        value={d.toLowerCase().replace(/[^a-z]/g, "-")}
                      >
                        {d}
                      </option>
                    ))}
                  </InputBase>
                </Input.Wrapper>

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

                <Input.Wrapper id="gender" required>
                  <InputBase
                    component="select"
                    id="gender"
                    // @ts-ignore
                    value={tempValue.gender ?? "male"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

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
                <Input.Wrapper id="theatre-event" required>
                  <InputBase
                    component="select"
                    id="theatre-event"
                    // @ts-ignore
                    value={tempValue.event ?? ""}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        eventType: "THEATRE",
                        event: e.target.value,
                      });
                    }}
                  >
                    {event.theatre.map((d, i) => (
                      <option
                        key={i}
                        value={d.toLowerCase().replace(/[^a-z]/g, "-")}
                      >
                        {d}
                      </option>
                    ))}
                  </InputBase>
                </Input.Wrapper>

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

                <Input.Wrapper id="gender" required>
                  <InputBase
                    component="select"
                    id="gender"
                    // @ts-ignore
                    value={tempValue.gender ?? "male"}
                    onChange={(e) => {
                      setTempValue({
                        ...tempValue,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

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
                      <td className="px-8">{d.eventType.replace(/_/g, " ")}</td>
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

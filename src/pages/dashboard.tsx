import { Button, Radio } from "@mantine/core";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ParticipationDetails } from "../components/ParticipationDetails";
import Participants from "../components/Participants";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

const UploadPhoto = async (file: File | null) => {
  try {
    if (file) {
      const photoUrl = await axios.post("/api/s3-upload-url", {
        // @ts-ignore
        name: file.name,
        // @ts-ignore
        type: file.type,
      });
      const { data } = await axios.put(photoUrl.data.url, file, {
        headers: {
          "Content-tvpe": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return data.url;
    }
  } catch (err) {
    console.error(err);
  }
};

const Dashboard = () => {
  const { isAuth, user, isLoading } = useAuth();
  console.log(user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!isAuth && !isLoading) {
  //     console.log("no login");
  //     console.log({ isAuth, isLoading });
  //   } else {
  //     console.log("login");
  //     console.log({ isAuth, isLoading });
  //   }
  // }, [isAuth, router, isLoading]);

  const [contingent1, setContingent1] = useState<any>({
    id: uuid(),
  });
  const [contingent2, setContingent2] = useState<any>({
    id: uuid(),
  });
  const [participationDetails, setParticipationDetails] = useState<any>();
  const [data, setData] = useState({});

  const [totalContingent, setTotalContingent] = useState(1);
  const addContingent = () => {
    if (totalContingent === 1) {
      setTotalContingent(totalContingent + 1);
    } else {
      showNotification({
        title: "Error",
        message: "You can only add 2 contingents",
        color: "red",
        autoClose: 3 * 1000,
      });
    }
  };
  const removeContingent = () => {
    if (totalContingent === 2) {
      setTotalContingent(totalContingent - 1);
      setContingent2({});
    } else {
      showNotification({
        title: "Error",
        message: "You can only remove 1 contingent",
        color: "red",
        autoClose: 3 * 1000,
      });
    }
  };
  return (
    <div className="min-h-screen overflow-hidden bg-custom-cream text-custom-purple">
      <NavBar />
      <div className="m-auto mb-12 rounded-xl bg-white py-6 px-12 md:max-w-7xl">
        <form className="">
          <div className="flex flex-wrap items-center gap-12">
            <span className="text-2xl font-bold">Dashboard</span>
            <span className="text-md font-semibold">
              University/Institute: {user?.name}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-12">
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-lg font-bold">
                  Contingent In-Charge I
                </span>
                <Button
                  className="hover rounded-xl bg-custom-purple text-custom-cream hover:bg-custom-purple"
                  onClick={addContingent}
                >
                  <MdAddCircleOutline
                    className="mr-2"
                    size={18}
                    color="#FCEDDC"
                  />
                  Add Another
                  <br />
                  Contingent
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="name"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="email"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center justify-between lg:flex">
                  <label
                    htmlFor="mobile-num"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Mobile No.:
                  </label>
                  <input
                    id="mobile-num"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        mobile: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="gender"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Gender:
                  </label>
                  <select
                    id="gender"
                    defaultValue="DEFAULT"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="DEFAULT" disabled hidden></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="address"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Upload Your Photo"
                    styles={{
                      placeholder: {
                        color: "#2E1739",
                        fontWeight: "bold",
                      },
                      input: {
                        border: "2px solid #2E1739",
                        backgroundColor: "#FFD19F",
                        color: "#2E1739",
                        fontWeight: "bold",
                      },
                    }}
                    icon={<BiCloudUpload size={24} color="#2E1739" />}
                    onChange={async (e) => {
                      const url = await UploadPhoto(e);
                      setContingent1({
                        ...contingent1,
                        photoUrl: url,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`flex-1 ${totalContingent === 1 ? "hidden" : ""}`}>
              <div className="flex justify-between">
                <span className="text-lg font-bold">
                  Contingent In-Charge II
                </span>
                <Button
                  className="hover rounded-xl bg-custom-red text-custom-cream hover:bg-custom-red"
                  onClick={removeContingent}
                >
                  <MdRemoveCircle className="mr-2" size={18} color="#FCEDDC" />
                  Remove
                  <br />
                  Contingent
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="name"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="email"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center justify-between lg:flex">
                  <label
                    htmlFor="mobile-num"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Mobile No.:
                  </label>
                  <input
                    id="mobile-num"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        mobile: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="gender"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Gender:
                  </label>
                  <select
                    id="gender"
                    defaultValue="DEFAULT"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="DEFAULT" disabled hidden></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>

                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="address"
                    className="w-[20%] font-semibold text-custom-purple"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Upload Your Photo"
                    styles={{
                      placeholder: {
                        color: "#2E1739",
                        fontWeight: "bold",
                      },
                      input: {
                        border: "2px solid #2E1739",
                        backgroundColor: "#FFD19F",
                        color: "#2E1739",
                        fontWeight: "bold",
                      },
                    }}
                    icon={<BiCloudUpload size={24} color="#2E1739" />}
                    onChange={async (e) => {
                      const url = await UploadPhoto(e);
                      setContingent2({
                        ...contingent2,
                        photoUrl: url,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* strength details */}
          <div className="my-12">
            <div className="m-auto flex flex-wrap justify-evenly gap-3 rounded-lg bg-[#FFD19F] p-2 font-bold text-custom-purple md:w-10/12">
              <div className="flex items-center gap-4">
                <label id="contingent-strength">
                  Enter Contingent Strength
                </label>
                <select
                  id="contingent-strength"
                  defaultValue="DEFAULT"
                  className="border-spacing-2 rounded-lg border-2 border-custom-purple bg-custom-cream p-2"
                  onChange={(e) => {
                    setData({
                      ...data,
                      contingentStrength: parseInt(e.target.value),
                      totalAmount: parseInt(e.target.value) * 2000,
                    });
                  }}
                >
                  <option value="DEFAULT" disabled hidden></option>
                  {[...Array(49)].map((k, v) => (
                    <option
                      key={v + 1}
                      value={v + 1}
                      className=" bg-custom-purple text-white"
                    >
                      {v + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label id="contingent-strength-male">Enter Total Male</label>
                <select
                  id="contingent-strength-male"
                  defaultValue="DEFAULT"
                  className="border-spacing-2 rounded-lg border-2 border-custom-purple bg-custom-cream p-2"
                  onChange={(e) => {
                    setData({
                      ...data,
                      // @ts-ignore
                      totalContingentMale: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="DEFAULT" disabled hidden></option>
                  {[...Array(50)].map((k, v) => (
                    <option
                      value={v}
                      key={v}
                      className=" bg-custom-purple text-white"
                    >
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label id="contingent-strength-female">
                  Enter Total Female
                </label>
                <select
                  id="contingent-strength-female"
                  defaultValue="DEFAULT"
                  className="border-spacing-2 rounded-lg border-2 border-custom-purple bg-custom-cream p-2"
                  onChange={(e) => {
                    setData({
                      ...data,
                      // @ts-ignore
                      totalContingentFemale: parseInt(e.target.value),
                    });
                  }}
                >
                  <option value="DEFAULT" disabled hidden></option>
                  {[...Array(50)].map((k, v) => (
                    <option
                      value={v}
                      key={v}
                      className=" bg-custom-purple text-white"
                    >
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="mt-3 flex w-full justify-center text-xs text-custom-red md:text-sm">
              <span className="pr-2 font-bold">NOTE: </span> Total Contingent
              Strength , Male & Female count should be inclusive of Contingent
              In-Charge(s).
            </span>
          </div>

          {/* Travel details */}
          <div>
            <span className="text-lg font-bold">Travel Details</span>
            <div className="mt-4 gap-12 md:flex">
              <div className="w-full md:w-6/12">
                <span className="text-lg font-bold">Arrival</span>
                <div className="flex flex-col gap-2">
                  <div className="w-full items-center lg:flex">
                    <label
                      htmlFor="arrival-date"
                      className="w-[28%] font-semibold text-custom-purple"
                    >
                      Date of arrival:
                    </label>
                    <input
                      id="arrival-date"
                      type="date"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      onChange={(e) => {
                        setData({
                          ...data,
                          arrivalDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full items-center lg:flex">
                    <label
                      htmlFor="arrival-time"
                      className="w-[28%] font-semibold text-custom-purple"
                    >
                      Time of arrival:
                    </label>
                    <input
                      id="arrival-time"
                      type="time"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      onChange={(e) => {
                        setData({
                          ...data,
                          arrivalTime: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full items-center font-semibold text-custom-purple lg:flex">
                    <label htmlFor="arrival-time" className="w-[28%]">
                      Mode of Arrival:
                    </label>
                    <Radio.Group
                      name="mode-of-arrival"
                      onChange={(e) => {
                        setData({
                          ...data,
                          arrivalMode: e,
                        });
                      }}
                    >
                      <Radio value="BUS" label="Bus" />
                      <Radio value="TRAIN" label="Train" />
                      <Radio value="FLIGHT" label="Flight" />
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12">
                <span className="text-lg font-bold">Departure</span>
                <div className="flex flex-col gap-2">
                  <div className="w-full items-center lg:flex">
                    <label
                      htmlFor="departure-date"
                      className="w-[37%] font-semibold text-custom-purple"
                    >
                      Date of Departure:
                    </label>
                    <input
                      id="departure-date"
                      type="date"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      onChange={(e) => {
                        setData({
                          ...data,
                          // @ts-ignore
                          departureDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full items-center lg:flex">
                    <label
                      htmlFor="departure-time"
                      className="w-[37%] font-semibold text-custom-purple"
                    >
                      Time of Departure:
                    </label>
                    <input
                      id="departure-time"
                      type="time"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      onChange={(e) => {
                        setData({
                          ...data,
                          // @ts-ignore
                          departureTime: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full items-center font-semibold text-custom-purple lg:flex">
                    <label htmlFor="arrival-time" className="w-[37%]">
                      Mode of Departure:
                    </label>
                    <Radio.Group
                      name="mode-of-departure"
                      onChange={(e) => {
                        setData({
                          ...data,
                          // @ts-ignore
                          departureMode: e,
                        });
                      }}
                    >
                      <Radio value="BUS" label="Bus" />
                      <Radio value="TRAIN" label="Train" />
                      <Radio value="FLIGHT" label="Flight" />
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </div>

            {/* Participation Details */}
            <div className="mt-12">
              <span className="text-lg font-bold">Participation Details</span>
              {/* <ParticipationDetails
                participationDetails={participationDetails}
                setParticipationDetails={setParticipationDetails}
              /> */}
              <Participants />
            </div>

            <div className="mt-12 w-full md:w-9/12">
              <span className="text-lg font-bold">Uploads</span>
              <div className="flex w-full items-center justify-between font-semibold">
                <div>
                  <p>
                    Upload Eligibility Certificates of All Participants and
                    Accompanists
                  </p>
                  <p className="-mt-2 text-xs text-custom-red">
                    NOTE: Submit all the documents in ONE Zip or PDF File.
                  </p>
                </div>
                <FileInput
                  accept="application/pdf,application/zip"
                  placeholder="Upload Zip/PDF"
                  styles={{
                    placeholder: {
                      color: "#2E1739",
                      fontWeight: "bold",
                    },
                    input: {
                      border: "2px solid #2E1739",
                      backgroundColor: "#FFD19F",
                      color: "#2E1739",
                      fontWeight: "bold",
                    },
                  }}
                  icon={<BiCloudUpload size={24} color="#2E1739" />}
                  onChange={async (e) => {
                    const url = await UploadPhoto(e);
                    setData({
                      ...data,
                      eligibilityCertificatesUrl: url,
                    });
                  }}
                />
              </div>
              <div className="flex w-full items-center justify-between font-semibold">
                <div>
                  <p>
                    Upload Curriculam Vitae of All Participants and Accompanists
                  </p>
                  <p className="-mt-2 text-xs text-custom-red">
                    NOTE: Submit all the documents in ONE Zip or PDF File.
                  </p>
                </div>
                <FileInput
                  accept="application/pdf,application/zip"
                  placeholder="Upload Zip/PDF"
                  styles={{
                    placeholder: {
                      color: "#2E1739",
                      fontWeight: "bold",
                    },
                    input: {
                      border: "2px solid #2E1739",
                      backgroundColor: "#FFD19F",
                      color: "#2E1739",
                      fontWeight: "bold",
                    },
                  }}
                  icon={<BiCloudUpload size={24} color="#2E1739" />}
                  onChange={async (e) => {
                    const url = await UploadPhoto(e);
                    setData({
                      ...data,
                      curriculumVitaeUrl: url,
                    });
                  }}
                />
              </div>
              <div className="mt-12">
                <p className="text-lg font-bold">Registration Fee</p>
                <p className="-mt-2 text-xs font-semibold text-custom-red">
                  NOTE: Rs. 2000 per person is the registration fee.
                </p>
                <p className="font-bold">
                  Total Fee Amount to be Paid (in Rs.): Rs.
                  <span className="my-1 ml-2 rounded bg-custom-cream p-1 md:ml-12 md:px-4 md:py-2">
                    {
                      // @ts-ignore
                      data.totalAmount
                    }
                  </span>{" "}
                  only
                </p>
              </div>
            </div>

            <div className="mt-12">
              <span className="text-lg font-bold">Mode of Payment</span>
              <p className="text-sm font-bold">
                Only NEFT/RTGS is accceptable.
              </p>
              <p className="text-sm">
                <span className="font-semibold">A/C Name:</span> KIIT STUDENT
                ACTIVITY CENTER
                <br />
                <span className="font-semibold">A/C Number: </span> 50258662673
                <br />
                <span className="font-semibold">Bank/Branch: </span> Indian
                Bank, KIIT BRANCH IFSC Code: IDIB000K717
                <br />
                <span className="font-semibold">Address: </span> Koel Campus,
                KIIT University, Patia, Bhubaneswar-751024
                <br />
              </p>
            </div>

            <div className="mt-12">
              <span className="text-lg font-bold">Payment Confirmation</span>
              <div className="mt-4 w-full items-center justify-between md:flex">
                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="Transaction"
                    className="w-[12%] font-semibold text-custom-purple"
                  >
                    Transaction no:
                  </label>
                  <div className="my-1 mr-6 w-full md:w-auto">
                    <input
                      id="Transaction"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      onChange={(e) => {
                        setData({
                          ...data,
                          transactionNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-full md:w-auto">
                    <FileInput
                      accept="application/pdf"
                      placeholder="Upload  Scanned/SoftCopy of the Slip"
                      icon={<BiCloudUpload size={24} color="#2E1739" />}
                      styles={{
                        placeholder: {
                          color: "#2E1739",
                          fontWeight: "bold",
                        },
                        input: {
                          border: "2px solid #2E1739",
                          backgroundColor: "#FFD19F",
                          color: "#2E1739",
                          fontWeight: "bold",
                        },
                      }}
                      onChange={async (e) => {
                        const url = await UploadPhoto(e);
                        setData({
                          ...data,
                          transactionPhotoUrl: url,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex w-full justify-end gap-6">
              <Button
                onClick={async () => {
                  const token = Cookies.get("token");
                  let allData;
                  if (totalContingent === 2) {
                    allData = {
                      ...data,
                      ContingentInCharge: [contingent1, contingent2],
                      // ParticipationDetails: participationDetails
                    };
                  } else {
                    allData = {
                      ...data,
                      ContingentInCharge: [contingent1],
                      // ParticipationDetails: participationDetails
                    };
                  }

                  try {
                    const res = await axios.post("/api/saveResponse", allData, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    console.log(res);
                    showNotification({
                      title: "Data Added Successfully",
                      message: "Your data has been added successfully",
                      color: "green",
                      autoClose: 3 * 1000,
                    });
                  } catch (err) {
                    showNotification({
                      title: "ERROR",
                      message: "Unable to save data",
                      color: "red",
                      autoClose: 3 * 1000,
                    });
                  }

                  //   try {
                  //     const photoUrl1 = await axios.post("/api/s3-upload-url", {
                  //       // @ts-ignore
                  //       name: contingent1.photoUrl.name,
                  //       // @ts-ignore
                  //       type: contingent1.photoUrl.type,
                  //     });
                  //     let photoUrl2;
                  //     if (totalContingent === 2) {
                  //       photoUrl2 = await axios.post("/api/s3-upload-url", {
                  //         // @ts-ignore
                  //         name: contingent2.photoUrl.name,
                  //         // @ts-ignore
                  //         type: contingent2.photoUrl.type,
                  //       });
                  //     }
                  //     const eligibilityCertificatesUrl = await axios.post(
                  //       "/api/s3-upload-url",
                  //       {
                  //         // @ts-ignore
                  //         name: data.eligibilityCertificatesUrl.name,
                  //         // @ts-ignore
                  //         type: data.eligibilityCertificatesUrl.type,
                  //       }
                  //     );
                  //     const curriculumVitaeUrl = await axios.post(
                  //       "/api/s3-upload-url",
                  //       {
                  //         // @ts-ignore
                  //         name: data.curriculumVitaeUrl.name,
                  //         // @ts-ignore
                  //         type: data.curriculumVitaeUrl.type,
                  //       }
                  //     );
                  //     const transactionPhotoUrl = await axios.post(
                  //       "/api/s3-upload-url",
                  //       {
                  //         // @ts-ignore
                  //         name: data.transactionPhotoUrl.name,
                  //         // @ts-ignore
                  //         type: data.transactionPhotoUrl.type,
                  //       }
                  //     );
                  //     // @ts-ignore
                  //     await UploadPhoto(photoUrl1.data.url, contingent1.photoUrl);
                  //     if (contingent2 === 2) {
                  //       await UploadPhoto(
                  //         photoUrl2?.data.url,
                  //         // @ts-ignore
                  //         contingent2.photoUrl
                  //       );
                  //     }
                  //     await UploadPhoto(
                  //       eligibilityCertificatesUrl.data.url,
                  //       // @ts-ignore
                  //       data.eligibilityCertificatesUrl
                  //     );
                  //     await UploadPhoto(
                  //       curriculumVitaeUrl.data.url,
                  //       // @ts-ignore
                  //       data.curriculumVitaeUrl
                  //     );
                  //     await UploadPhoto(
                  //       transactionPhotoUrl.data.url,
                  //       // @ts-ignore
                  //       data.transactionPhotoUrl
                  //     );
                  //     setData({
                  //       ...data,
                  //       eligibilityCertificatesUrl:
                  //         eligibilityCertificatesUrl.data.url,
                  //       curriculumVitaeUrl: curriculumVitaeUrl.data.url,
                  //       transactionPhotoUrl: transactionPhotoUrl.data.url,
                  //     });
                  //     setContingent1({
                  //       ...contingent1,
                  //       photoUrl: photoUrl1.data.url,
                  //     });
                  //     setContingent2({
                  //       ...contingent2,
                  //       // @ts-ignore
                  //       photoUrl: photoUrl2.data.url,
                  //     });UploadPhoto
                  //     const participationDetailsCopy = participationDetails;
                  //     participationDetailsCopy.map(async (data) => {
                  //       const photoUrl = await axios.post("/api/s3-upload-url", {
                  //         // @ts-ignore
                  //         name: data.photoUrl.name,
                  //         // @ts-ignore
                  //         type: data.photoUrl.type,
                  //       });
                  //       // @ts-ignore
                  //       await UploadPhoto(photoUrl.data.url, data.photoUrl);
                  //       // @ts-ignore
                  //       data.photoUrl = photoUrl.data.url;
                  //     });
                  //     setParticipationDetails(participationDetailsCopy);
                  //     let allData;
                  //     if (totalContingent === 1) {
                  //       allData = {
                  //         ...data,
                  //         participationDetails,
                  //         contingent: [contingent1],
                  //       };
                  //     } else {
                  //       allData = {
                  //         ...data,
                  //         participationDetails,
                  //         contingent: [contingent1, contingent2],
                  //       };
                  //     }
                  //     const res = await axios.post("/api/saveResponse", allData);
                  //     console.log(res);
                  //     showNotification({
                  //       title: "Data Added Successfully",
                  //       message: "Your data has been added successfully",
                  //       color: "green",
                  //       autoClose: 3 * 1000,
                  //     });
                  //     router.push("/");
                  //   } catch (err) {
                  //     console.log(err);
                  //     showNotification({
                  //       title: "Error",
                  //       message: "Please fill all the data and try again.",
                  //       color: "red",
                  //       autoClose: 3 * 1000,
                  //     });
                  //   }
                }}
              >
                Save Form
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

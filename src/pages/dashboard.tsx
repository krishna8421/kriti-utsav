import Head from "next/head";
import { Button, Radio, LoadingOverlay } from "@mantine/core";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import Participants from "../components/Participants";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { v1 as uuid } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { participationDetailsAtom } from "../store/participationDetails";
import { useAtom } from "jotai";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [reload, setReload] = useState(false);
  const reloadData = () => setReload(!reload);
  const [visible, setVisible] = useState(false);

  const [contingent1, setContingent1] = useState<any>({});
  const [contingent2, setContingent2] = useState<any>({});
  const [participationDetails, setParticipationDetails] = useAtom(
    participationDetailsAtom
  );

  const [data, setData] = useState({});
  const [totalContingent, setTotalContingent] = useState(1);

  useEffect(() => {
    setVisible(true);
    const getUserData = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.UserResponse);
        setParticipationDetails(
          res.data.UserResponse?.ParticipationDetails ?? []
        );
        setContingent1(
          res.data.UserResponse?.ContingentInCharge[0] ?? {
            id: uuid(),
          }
        );
        setContingent2(
          res.data.UserResponse?.ContingentInCharge[1] ?? {
            id: uuid(),
          }
        );
        setVisible(false);
      } catch (err) {
        // showNotification({
        //   title: "Error",
        //   message:
        //     "Unable to fetch Data, Please check your network connection and try again",
        //   color: "red",
        //   autoClose: 3 * 1000,
        // });
        setVisible(false);
      }
    };
    getUserData();
  }, [reload]);

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
  const UploadPhoto = async (file: File | null) => {
    try {
      if (file) {
        // @ts-ignore
        const storageRef = ref(
          storage,
          // @ts-ignore
          `/${user?.id}/${file.name.trim().replace(/\s/g, "-")}`
        );
        await uploadBytes(storageRef, file).then(() => {
          showNotification({
            title: "Success",
            message: "File Uploaded Successfully",
            color: "green",
            autoClose: 3 * 1000,
          });
        });
        const url = await getDownloadURL(storageRef);
        return url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-custom-cream text-custom-purple">
      <Head>
        <title>KRITI UTSAV - Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="36th Inter University East Zone Youth Festival hosted by Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar from 23rd to 27th December 2022 under the aegies of Association of Indian Universities(AIU)."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://kritiutsav.kiit.ac.in/"></meta>
        <meta property="og:title" content="KRITI UTSAV"></meta>
        <meta
          property="og:description"
          content="36th Inter University East Zone Youth Festival hosted by Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar from 23rd to 27th December 2022 under the aegies of Association of Indian Universities(AIU)."
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <NavBar />
      <div className="m-auto mb-12 rounded-xl bg-white py-6 px-12 md:max-w-7xl">
        <form>
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
                  Contingent In-Charge
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
                    value={contingent1?.name ? contingent1.name : ""}
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
                    value={contingent1?.email ? contingent1.email : ""}
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
                    value={contingent1?.mobile ? contingent1.mobile : ""}
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
                    value={contingent1?.gender ? contingent1.gender : "DEFAULT"}
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
                    value={contingent1?.address ? contingent1.address : ""}
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder={
                      //@ts-ignore
                      contingent1.photoUrl
                        ? //@ts-ignore
                          contingent1.photoUrl
                            .trim()
                            .split("o/")[1]
                            .split("?")[0]
                            .split("%2F")[1]
                        : "Upload Your Photo"
                    }
                    // placeholder="Upload Your Photo"
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
                  />{" "}
                  <div className="text-sm font-semibold text-red-700">
                    ( * uploaded photo size should not exceed 1 MB )
                  </div>
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
                  Remove Contingent
                  <br />
                  In - Charge II
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
                    value={contingent2?.name ? contingent2.name : ""}
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
                    value={contingent2?.email ? contingent2.email : ""}
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
                    value={contingent2?.mobile ? contingent2.mobile : ""}
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
                    value={contingent2?.gender ? contingent2.gender : "DEFAULT"}
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
                    value={contingent2?.address ? contingent2.address : ""}
                    className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder={
                      //@ts-ignore
                      contingent2.photoUrl
                        ? //@ts-ignore
                          contingent2.photoUrl
                            .trim()
                            .split("o/")[1]
                            .split("?")[0]
                            .split("%2F")[1]
                        : "Upload Your Photo"
                    }
                    // placeholder="Upload Your Photo"
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
                  <div className="text-sm font-semibold text-red-700">
                    ( * uploaded photo size should not exceed 1 MB )
                  </div>
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
                  value={
                    // @ts-ignore
                    data?.contingentStrength
                      ? // @ts-ignore
                        data.contingentStrength
                      : "DEFAULT"
                  }
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
                  value={
                    // @ts-ignore
                    data?.totalContingentMale
                      ? // @ts-ignore
                        data.totalContingentMale
                      : "DEFAULT"
                  }
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
                  className="border-spacing-2 rounded-lg border-2 border-custom-purple bg-custom-cream p-2"
                  value={
                    // @ts-ignore
                    data?.totalContingentFemale
                      ? // @ts-ignore
                        data.totalContingentFemale
                      : "DEFAULT"
                  }
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
                      // @ts-ignore
                      value={data?.arrivalDate ? data.arrivalDate : ""}
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
                      // @ts-ignore
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      // @ts-ignore
                      value={data?.arrivalTime ? data.arrivalTime : ""}
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
                      // @ts-ignore
                      value={data?.arrivalMode}
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
                      // @ts-ignore
                      value={data?.departureDate ? data.departureDate : ""}
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
                      // @ts-ignore
                      value={data?.departureTime ? data.departureTime : ""}
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
                      // @ts-ignore
                      value={data?.departureMode}
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
              <div className="text-lg font-bold">
                Participation Details{" "}
                <span className="text-sm font-semibold text-red-700">
                  ( * uploaded photo size should not exceed 1 MB )
                </span>
              </div>
              <Participants />
            </div>

            <div className="mt-12 w-full md:w-9/12">
              <div className="text-lg font-bold">
                Uploads{" "}
                <span className="text-sm font-semibold text-red-700">
                  ( * uploaded document size should not exceed 5 MB )
                </span>
              </div>
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
                  placeholder={
                    //@ts-ignore
                    data?.eligibilityCertificatesUrl
                      ? //@ts-ignore
                        data.eligibilityCertificatesUrl
                          .trim()
                          .split("o/")[1]
                          .split("?")[0]
                          .split("%2F")[1]
                      : "Upload Zip/PDF"
                  }
                  // placeholder="Upload Zip/PDF"
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
                  placeholder={
                    //@ts-ignore
                    data?.curriculumVitaeUrl
                      ? //@ts-ignore
                        data.curriculumVitaeUrl
                          .trim()
                          .split("o/")[1]
                          .split("?")[0]
                          .split("%2F")[1]
                      : "Upload Zip/PDF"
                  }
                  // placeholder="Upload Zip/PDF"
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
                  <span className="my-1 mx-2 rounded bg-custom-cream p-1 md:ml-12 md:px-4 md:py-2">
                    {
                      // @ts-ignore
                      data?.totalAmount
                    }
                  </span>
                  only
                </p>
              </div>
            </div>

            <div className="mt-12 text-lg font-semibold">
              <span className=" text-xl font-bold md:text-2xl">
                Mode of Payment
              </span>
              <p className="font-bold">Only NEFT/RTGS is accceptable.</p>
              <p>
                <span className="font-bold">A/C Name:</span> KIIT STUDENT
                ACTIVITY CENTER
                <br />
                <span className="font-bold">A/C Number: </span> 50258662673
                <br />
                <span className="font-bold">Bank/Branch: </span> Indian Bank,
                KIIT BRANCH IFSC Code: IDIB000K717
                <br />
                <span className="font-bold">Address: </span> Koel Campus, KIIT
                University, Patia, Bhubaneswar-751024
                <br />
              </p>
            </div>

            <div className="mt-12">
              <div className="text-lg font-bold">
                Payment Confirmation{" "}
                <span className="text-sm font-semibold text-red-700">
                  ( * uploaded document size should not exceed 50 kb )
                </span>
              </div>
              <div className="mt-4 w-full items-center justify-between md:flex">
                <div className="w-full items-center lg:flex">
                  <label
                    htmlFor="Transaction"
                    className="w-[15%] font-semibold text-custom-purple"
                  >
                    UTR / Transaction no:
                  </label>
                  <div className="my-1 mr-6 w-full md:w-auto">
                    <input
                      id="Transaction"
                      className="w-full border-spacing-2 rounded-lg border-2 border-custom-purple bg-[#FFDDB8] p-2"
                      // @ts-ignore
                      value={
                        // @ts-ignore
                        data?.transactionNumber ? data?.transactionNumber : ""
                      }
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
                      placeholder={
                        //@ts-ignore
                        data?.transactionPhotoUrl
                          ? //@ts-ignore
                            data.transactionPhotoUrl
                              .trim()
                              .split("o/")[1]
                              .split("?")[0]
                              .split("%2F")[1]
                          : "Upload  Scanned/SoftCopy of the Slip"
                      }
                      // placeholder="Upload  Scanned/SoftCopy of the Slip"
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
            <div className="mt-12 flex w-full items-center justify-end gap-6">
              <div className="text-xl font-bold text-custom-purple">
                Registration closed
              </div>
              <Button
                disabled={true}
                className="rounded-lg border-custom-purple bg-custom-purple text-xl font-bold text-white hover:border-2 hover:bg-custom-cream hover:text-custom-purple md:h-12 md:w-2/12"
                onClick={async () => {
                  setVisible(true);
                  const token = Cookies.get("token");
                  const allData = {
                    ...data,
                    ContingentInCharge: [contingent1, contingent2],
                    ParticipationDetails: participationDetails,
                  };
                  try {
                    await axios.post("/api/saveResponse", allData, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    showNotification({
                      title: "Data Added Successfully",
                      message: "Your data has been added successfully",
                      color: "green",
                      autoClose: 3 * 1000,
                    });
                    setVisible(false);
                    reloadData();
                  } catch (err) {
                    showNotification({
                      title: "ERROR",
                      message: "Unable to save data",
                      color: "red",
                      autoClose: 3 * 1000,
                    });
                    setVisible(false);
                    reloadData();
                  }
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

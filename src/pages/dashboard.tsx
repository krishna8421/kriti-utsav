import { Button, InputBase, NumberInput, Radio } from "@mantine/core";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { Input } from "@mantine/core";
import InputMask from "react-input-mask";
import { FileInput } from "@mantine/core";
import { BiCloudUpload } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ParticipationDetails } from "../components/ParticipationDetails";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { MdArrowDropDown } from "react-icons/md";
import Cookies from "js-cookie";

const UploadPhoto = async (url: string, file: any) => {
  await axios.put(url, file, {
    headers: {
      "Content-tvpe": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const Dashboard = () => {
  const { isAuth, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      router.push("/login");
    }
  }, [isAuth, router, isLoading]);

  const [contingent1, setContingent1] = useState({});
  const [contingent2, setContingent2] = useState({});
  const [participationDetails, setParticipationDetails] = useState([]);
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
              <div className="flex flex-col gap-2">
                <Input.Wrapper id="name" required label="Name">
                  <Input
                    id="name"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="email" required label="Email">
                  <Input
                    id="email"
                    placeholder="Your email"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        email: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mobile-num" required label="Mobile Number">
                  <InputBase
                    id="mobile-num"
                    placeholder="Your Mobile Number"
                    component={InputMask}
                    mask="+91 99999 99999"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        mobile: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="gender" required label="Gender">
                  <InputBase
                    component="select"
                    id="gender"
                    rightSection={<MdArrowDropDown size={14} />}
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

                <Input.Wrapper id="address" required label="Address">
                  <Input
                    id="address"
                    placeholder="Your Address"
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        address: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>
                <div className="flex justify-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Upload Your Photo"
                    styles={{
                      input: {
                        border: "2px solid #2E1739",
                      },
                    }}
                    icon={<BiCloudUpload size={14} />}
                    onChange={(e) => {
                      setContingent1({
                        ...contingent1,
                        photoUrl: e,
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
              <div className="flex flex-col gap-2">
                <Input.Wrapper id="name" required label="Name">
                  <Input
                    id="name"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        name: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="email" required label="Email">
                  <Input
                    id="email"
                    placeholder="Your email"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        email: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="mobile-num" required label="Mobile Number">
                  <InputBase
                    id="mobile-num"
                    placeholder="Your Mobile Number"
                    component={InputMask}
                    mask="+91 99999 99999"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        mobile: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>

                <Input.Wrapper id="gender" required label="Gender">
                  <InputBase
                    component="select"
                    id="gender"
                    rightSection={<MdArrowDropDown size={14} />}
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

                <Input.Wrapper id="address" required label="Address">
                  <Input
                    id="address"
                    placeholder="Your Address"
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        address: e.target.value,
                      });
                    }}
                  />
                </Input.Wrapper>
                <div className="flex justify-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Upload Your Photo"
                    styles={{
                      input: {
                        border: "2px solid #2E1739",
                      },
                    }}
                    icon={<BiCloudUpload size={14} />}
                    onChange={(e) => {
                      setContingent2({
                        ...contingent2,
                        photoUrl: e,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-12">
            <div className="m-auto flex flex-wrap justify-center gap-3 rounded-lg bg-custom-cream px-4 py-2 text-sm font-semibold text-custom-purple">
              <div className="flex items-center gap-4">
                <label id="contingent-strength">
                  Enter Contingent Strength
                </label>
                <NumberInput
                  id="contingent-strength"
                  onChange={(e) => {
                    setData({
                      ...data,
                      contingentStrength: e,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <label id="contingent-strength">Enter Total Male</label>
                <NumberInput
                  id="contingent-strength"
                  onChange={(e) => {
                    setData({
                      ...data,
                      // @ts-ignore
                      totalContingentMale: e,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <label id="contingent-strength">Enter Total Female</label>
                <NumberInput
                  id="contingent-strength"
                  onChange={(e) => {
                    setData({
                      ...data,
                      // @ts-ignore
                      totalContingentFemale: e,
                    });
                  }}
                />
              </div>
            </div>
            <span className="mt-3 flex w-full justify-center text-xs text-custom-red">
              NOTE: Total Contingent Strength , Male & Female count should be
              inclusive of Contingent In-Charge(s).
            </span>
          </div>

          <div>
            <span className="text-lg font-bold">Travel Details</span>
            <div className="mt-4 flex flex-wrap gap-12">
              <div className="flex-1">
                <span className="text-lg font-bold">Arrival</span>
                <div className="flex flex-col gap-2">
                  <Input.Wrapper
                    id="arrival-date"
                    required
                    label="Date of arrival"
                  >
                    <InputBase
                      id="arrival-date"
                      placeholder="DD/MM/YYYY"
                      component={InputMask}
                      mask="99/99/9999"
                      onChange={(e) => {
                        setData({
                          arrivalDate: e.target.value,
                        });
                      }}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    id="arrival-time"
                    required
                    label="Time of arrival"
                  >
                    <InputBase
                      id="arrival-time"
                      placeholder="HH:MM"
                      component={InputMask}
                      mask="99:99"
                      onChange={(e) => {
                        setData({
                          ...data,
                          arrivalTime: e.target.value,
                        });
                      }}
                    />
                  </Input.Wrapper>
                  <Radio.Group
                    name="mode-of-arrival"
                    label="Mode of Arrival"
                    onChange={(e) => {
                      setData({
                        ...data,
                        arrivalMode: e,
                      });
                    }}
                  >
                    <Radio value="bus" label="Bus" />
                    <Radio value="train" label="Train" />
                    <Radio value="flight" label="Flight" />
                  </Radio.Group>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-lg font-bold">Departure</span>
                <div className="flex flex-col gap-2">
                  <Input.Wrapper
                    id="departure-date"
                    required
                    label="Date of Departure"
                  >
                    <InputBase
                      id="departure-date"
                      placeholder="DD/MM/YYYY"
                      component={InputMask}
                      mask="99/99/9999"
                      onChange={(e) => {
                        setData({
                          ...data,
                          // @ts-ignore
                          departureDate: e.target.value,
                        });
                      }}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    id="departure-time"
                    required
                    label="Time of Departure"
                  >
                    <InputBase
                      id="departure-time"
                      placeholder="HH:MM"
                      component={InputMask}
                      mask="99:99"
                      onChange={(e) => {
                        setData({
                          ...data,
                          // @ts-ignore
                          departureTime: e.target.value,
                        });
                      }}
                    />
                  </Input.Wrapper>
                  <Radio.Group
                    name="mode-of-departure"
                    label="Mode of Departure"
                    onChange={(e) => {
                      setData({
                        ...data,
                        // @ts-ignore
                        departureMode: e,
                      });
                    }}
                  >
                    <Radio value="bus" label="Bus" />
                    <Radio value="train" label="Train" />
                    <Radio value="flight" label="Flight" />
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <span className="text-lg font-bold">Participation Details</span>
              <ParticipationDetails
                participationDetails={participationDetails}
                setParticipationDetails={setParticipationDetails}
              />
            </div>

            <div className="mt-12">
              <span className="text-lg font-bold">Uploads</span>
              <div className="flex items-center gap-12">
                <div>
                  <p>
                    Upload Eligibility Certificates of All Participants and
                    Accompanists
                  </p>
                  <p className="text-xs font-bold text-custom-red">
                    NOTE: Submit all the documents in ONE Zip or PDF File.
                  </p>
                </div>
                <FileInput
                  accept="application/pdf,application/zip"
                  placeholder="Upload Zip/PDF"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  onChange={(e) => {
                    setData({
                      ...data,
                      eligibilityCertificatesUrl: e,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-12">
                <div>
                  <p>
                    Upload Curriculam Vitae of All Participants and Accompanists
                  </p>
                  <p className="text-xs font-bold text-custom-red">
                    NOTE: Submit all the documents in ONE Zip or PDF File.
                  </p>
                </div>
                <FileInput
                  accept="application/pdf,application/zip"
                  placeholder="Upload Zip/PDF"
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  icon={<BiCloudUpload size={14} />}
                  onChange={(e) => {
                    setData({
                      ...data,
                      curriculumVitaeUrl: e,
                    });
                  }}
                />
              </div>
              <div className="mt-12">
                <p className="font-bold">
                  Total Fee Amount to be Paid (in Rs.): Rs.{2000 * 2}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <span className="text-lg font-bold">Mode of Payment</span>
              <p className="text-xs font-bold">
                Only NEFT/RTGS is accceptable.
              </p>
              <p className="text-sm">
                A/C Name: KIIT STUDENT ACTIVITY CENTER
                <br />
                A/C Number: 50258662673
                <br />
                Bank/Branch: Indian Bank, KIIT BRANCH IFSC Code: IDIB000K717
                <br />
                Address: Koel Campus, KIIT University, Patia, Bhubaneswar-751024
                <br />
              </p>
            </div>

            <div className="mt-12">
              <span className="text-lg font-bold">Payment Confirmation</span>
              <div className="mt-4 flex flex-wrap items-center gap-16">
                <div className="flex items-center gap-4">
                  <label id="Transaction">UTR/ Transaction no:</label>
                  <Input
                    required
                    id="Transaction"
                    placeholder="Enter here"
                    onChange={(e) => {
                      setData({
                        ...data,
                        transactionNumber: e.target.value,
                      });
                    }}
                  />
                </div>
                <FileInput
                  accept="application/pdf"
                  placeholder="Upload  Scanned/SoftCopy of the Slip"
                  icon={<BiCloudUpload size={14} />}
                  styles={{
                    input: {
                      border: "2px solid #2E1739",
                    },
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      transactionPhotoUrl: e,
                    });
                  }}
                />
              </div>
            </div>
            <div className="mt-12 flex w-full justify-end gap-6">
              <Button
                className="bg-custom-red hover:bg-custom-red"
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/");
                }}
              >
                Login
              </Button>
              <Button
                onClick={async () => {
                  // console.log({
                  //   ...data,
                  //   participationDetails,
                  //   contingent: [contingent1, contingent2],
                  // });
                  // return

                  try {
                    const photoUrl1 = await axios.post("/api/s3-upload-url", {
                      // @ts-ignore
                      name: contingent1.photoUrl.name,
                      // @ts-ignore
                      type: contingent1.photoUrl.type,
                    });
                    let photoUrl2;
                    if (totalContingent === 2) {
                      photoUrl2 = await axios.post("/api/s3-upload-url", {
                        // @ts-ignore
                        name: contingent2.photoUrl.name,
                        // @ts-ignore
                        type: contingent2.photoUrl.type,
                      });
                    }
                    const eligibilityCertificatesUrl = await axios.post(
                      "/api/s3-upload-url",
                      {
                        // @ts-ignore
                        name: data.eligibilityCertificatesUrl.name,
                        // @ts-ignore
                        type: data.eligibilityCertificatesUrl.type,
                      }
                    );
                    const curriculumVitaeUrl = await axios.post(
                      "/api/s3-upload-url",
                      {
                        // @ts-ignore
                        name: data.curriculumVitaeUrl.name,
                        // @ts-ignore
                        type: data.curriculumVitaeUrl.type,
                      }
                    );
                    const transactionPhotoUrl = await axios.post(
                      "/api/s3-upload-url",
                      {
                        // @ts-ignore
                        name: data.transactionPhotoUrl.name,
                        // @ts-ignore
                        type: data.transactionPhotoUrl.type,
                      }
                    );

                    // @ts-ignore
                    await UploadPhoto(photoUrl1.data.url, contingent1.photoUrl);
                    if (contingent2 === 2) {
                      await UploadPhoto(
                        photoUrl2?.data.url,
                        // @ts-ignore
                        contingent2.photoUrl
                      );
                    }
                    await UploadPhoto(
                      eligibilityCertificatesUrl.data.url,
                      // @ts-ignore
                      data.eligibilityCertificatesUrl
                    );
                    await UploadPhoto(
                      curriculumVitaeUrl.data.url,
                      // @ts-ignore
                      data.curriculumVitaeUrl
                    );
                    await UploadPhoto(
                      transactionPhotoUrl.data.url,
                      // @ts-ignore
                      data.transactionPhotoUrl
                    );
                    setData({
                      ...data,
                      eligibilityCertificatesUrl:
                        eligibilityCertificatesUrl.data.url,
                      curriculumVitaeUrl: curriculumVitaeUrl.data.url,
                      transactionPhotoUrl: transactionPhotoUrl.data.url,
                    });

                    setContingent1({
                      ...contingent1,
                      photoUrl: photoUrl1.data.url,
                    });
                    setContingent2({
                      ...contingent2,
                      // @ts-ignore
                      photoUrl: photoUrl2.data.url,
                    });
                    const participationDetailsCopy = participationDetails;

                    participationDetailsCopy.map(async (data) => {
                      const photoUrl = await axios.post("/api/s3-upload-url", {
                        // @ts-ignore
                        name: data.photoUrl.name,
                        // @ts-ignore
                        type: data.photoUrl.type,
                      });
                      // @ts-ignore
                      await UploadPhoto(photoUrl.data.url, data.photoUrl);
                      // @ts-ignore
                      data.photoUrl = photoUrl.data.url;
                    });

                    setParticipationDetails(participationDetailsCopy);

                    let allData;
                    if (totalContingent === 1) {
                      allData = {
                        ...data,
                        participationDetails,
                        contingent: [contingent1],
                      };
                    } else {
                      allData = {
                        ...data,
                        participationDetails,
                        contingent: [contingent1, contingent2],
                      };
                    }

                    const res = await axios.post("/api/saveResponse", allData);
                    console.log(res);
                    showNotification({
                      title: "Data Added Successfully",
                      message: "Your data has been added successfully",
                      color: "green",
                      autoClose: 3 * 1000,
                    });
                    router.push("/");
                  } catch (err) {
                    console.log(err);
                    showNotification({
                      title: "Error",
                      message: "Please fill all the data and try again.",
                      color: "red",
                      autoClose: 3 * 1000,
                    });
                  }
                }}
              >
                Submit Form
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

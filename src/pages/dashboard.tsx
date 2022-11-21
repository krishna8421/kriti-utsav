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
import { useRouter } from "next/router";

const Dashboard = () => {
  const { isAuth, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth && !isLoading) {
      router.push("/login");
    }
  }, [isAuth, router, isLoading]);

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
                <Button className="hover rounded-xl bg-custom-purple text-custom-cream hover:bg-custom-purple">
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
                  <Input id="name" placeholder="Your Name" />
                </Input.Wrapper>

                <Input.Wrapper id="email" required label="Email">
                  <Input id="email" placeholder="Your email" />
                </Input.Wrapper>

                <Input.Wrapper id="mobile-num" required label="Mobile Number">
                  <InputBase
                    id="mobile-num"
                    placeholder="Your Mobile Number"
                    component={InputMask}
                    mask="99/99/9999"
                  />
                </Input.Wrapper>

                <Input.Wrapper id="gender" required label="Gender">
                  <InputBase component="select" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </InputBase>
                </Input.Wrapper>

                <Input.Wrapper id="address" required label="Address">
                  <Input id="address" placeholder="Your Address" />
                </Input.Wrapper>
                <div className="flex justify-end">
                  <FileInput
                    accept="image/png,image/jpeg,image/jpg"
                    placeholder="Upload Your Photo"
                    icon={<BiCloudUpload size={14} />}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-lg font-bold">
                  Contingent In-Charge II
                </span>
                <Button className="hover rounded-xl bg-custom-red text-custom-cream hover:bg-custom-red">
                  <MdRemoveCircle className="mr-2" size={18} color="#FCEDDC" />
                  Remove
                  <br />
                  Contingent
                </Button>
              </div>
            </div>
          </div>
          <div className="m-auto my-12 flex flex-wrap justify-center gap-3 rounded-lg bg-custom-cream px-4 py-2 text-sm font-semibold text-custom-purple">
            <div className="flex items-center gap-4">
              <label id="contingent-strength">Enter Contingent Strength</label>
              <NumberInput id="contingent-strength" />
            </div>
            <div className="flex items-center gap-4">
              <label id="contingent-strength">Enter Total Male</label>
              <NumberInput id="contingent-strength" />
            </div>
            <div className="flex items-center gap-4">
              <label id="contingent-strength">Enter Total Female</label>
              <NumberInput id="contingent-strength" />
            </div>
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
                    />
                  </Input.Wrapper>
                  <Radio.Group name="mode-of-arrival" label="Mode of Arrival">
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
                    />
                  </Input.Wrapper>
                  <Radio.Group
                    name="mode-of-departure"
                    label="Mode of Departure"
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
                  icon={<BiCloudUpload size={14} />}
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
                  <label id="email">UTR/ Transaction no:</label>
                  <Input required id="email" placeholder="Enter here" />
                </div>
                <FileInput
                  accept="application/pdf"
                  placeholder="Upload  Scanned/SoftCopy of the Slip"
                  icon={<BiCloudUpload size={14} />}
                />
              </div>
            </div>
            <div className="mt-12 flex w-full justify-end">
              <Button>Submit Form</Button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

import { Button } from "@mantine/core";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { MdAddCircleOutline } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-custom-cream text-custom-purple">
      <NavBar />
      <div className="m-auto mb-12 rounded-xl bg-white py-6 px-12 md:max-w-7xl">
        <form className="">
          <div className="flex flex-wrap items-center gap-12">
            <span className="text-2xl font-bold">Dashboard</span>
            <span className="text-md font-semibold">
              University/Institute: {}
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
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

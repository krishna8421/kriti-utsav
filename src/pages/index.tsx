import { type NextPage } from "next";
import Image from "next/image";
import { EventImage } from "../components/EventImage";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  const description = {
    music: [
      "Classical Vocal Solo (Hindustani or Karnatak)",
      "Classical Instrumental Solo (Percussion)",
      "Classical Instrumental Solo (Non-Percussion)",
      "Light Vocal (Indian)",
      "Western Vocal (Solo)",
      "Group Song (Indian)",
      "Group Song (Western)",
      "Folk Orchestra",
      "Western Instrumental (Solo)",
    ],
    theatre: [],
    dance: [],
    literary: [],
    fineArts: [],
  };

  return (
    <div className="min-h-screen bg-custom-cream overflow-hidden">
      <NavBar />
      <div className="m-auto md:max-w-7xl">
        <main className="flex flex-wrap justify-center gap-8 py-8">
          <div className="relative h-[300px] w-[300px] sm:h-[530px] sm:w-[530px]">
            <Image
              src="/home-main-image.png"
              alt="Home main image"
              fill
              className="absolute"
            />
          </div>
          <div className="mt-8 w-min lg:mt-28">
            <h1 className="text-center font-extrabold text-custom-purple">
              36TH INTER UNIVERSITY EAST ZONE YOUTH FESTIVAL
            </h1>
            <h3 className="mb-12 text-center text-lg font-bold text-custom-purple">
              23rd - 27th December 2022
            </h3>
            <div className="relative h-[100px] w-[325px] sm:h-[160px] sm:w-[520px]">
              <Image
                src="/home-about-image.png"
                alt="Home about image"
                fill
                className="absolute"
              />
            </div>
          </div>
        </main>
      </div>
      <Image
        src="/border-image.png"
        alt="Border image"
        width={1920}
        height={400}
        quality={100}
      />
      <div className="bg-custom-red">
        <div className="m-auto flex flex-col items-center md:max-w-7xl pb-12">
          <span className="text-4xl font-bold text-custom-cream">EVENTS</span>
          <div className="flex flex-wrap justify-center gap-12">
            <EventImage
              src="event-music.png"
              alt="Dance event"
              name="Music"
              description={description.music}
            />
            <EventImage
              src="event-fineArts.png"
              alt="Fine Arts event"
              name="Fine Arts"
              description={description.fineArts}
            />
            <EventImage
              src="event-theatre.png"
              alt="Theatre event"
              name="Theatre"
              description={description.theatre}
            />
            <EventImage
              src="event-dance.png"
              alt="Dance event"
              name="Dance"
              description={description.dance}
            />
            <EventImage
              src="event-literary.png"
              alt="Literary event"
              name="Literary"
              description={description.literary}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

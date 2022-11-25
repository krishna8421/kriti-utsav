import { type NextPage } from "next";
import Image from "next/image";
import { EventImage } from "../components/EventImage";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { event } from "../constants/data";

const Home: NextPage = () => {
  const refEvents = useRef<null | HTMLDivElement>(null);
  const refContact = useRef<null | HTMLDivElement>(null);

  const handleEventsClick = () => {
    refEvents.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    refContact.current?.scrollIntoView({ behavior: "smooth" });
  };

  const router = useRouter();

  useEffect(() => {
    if (router.query.tab === "events") {
      handleEventsClick();
    } else if (router.query.tab === "contact") {
      handleContactClick();
    }
  }, [router]);

  return (
    <div className="min-h-screen overflow-hidden bg-custom-cream">
      <NavBar
        handleEventsClick={handleEventsClick}
        handleContactClick={handleContactClick}
      />
      <div className="m-auto md:max-w-6xl">
        <main className="flex w-full flex-wrap justify-center gap-4 py-6 md:gap-20">
          <div className="relative h-[250px] w-[250px] sm:h-[500px] sm:w-[500px]">
            <Image
              src="/home-main-image.png"
              alt="Home main image"
              fill
              className="absolute"
            />
          </div>
          <div className="mt-6 w-min lg:mt-12">
            <h1 className="text-center text-3xl font-extrabold text-custom-purple">
              36TH INTER UNIVERSITY EAST ZONE YOUTH FESTIVAL
            </h1>
            <h3 className="mb-8 text-center text-lg font-bold text-custom-purple">
              23rd - 27th December 2022
            </h3>
            <h3 className="mb-12 text-center text-lg font-bold text-custom-red">
              Registrations will be live soon!
            </h3>
            <div className="relative h-[80px] w-[260px] sm:h-[140px] sm:w-[455px]">
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
      {/* <div className="relative h-[80px] w-[260px] sm:h-[400px] sm:w-screen"> */}
      <Image
        src="/border-image.png"
        alt="Border image"
        width={1920}
        height={400}
        quality={100}
        // fill
        // className="absolute"
      />
      {/* </div> */}
      <div className="bg-custom-red">
        <div
          className="m-auto flex flex-col items-center pb-12 md:max-w-7xl"
          ref={refEvents}
        >
          <span className="text-4xl font-bold text-custom-cream">EVENTS</span>
          <div className="flex flex-wrap justify-center gap-12">
            <EventImage
              src="event-music.png"
              alt="Dance event"
              name="Music"
              description={event.music}
            />
            <EventImage
              src="event-fineArts.png"
              alt="Fine Arts event"
              name="Fine Arts"
              description={event.fineArts}
            />
            <EventImage
              src="event-theatre.png"
              alt="Theatre event"
              name="Theatre"
              description={event.theatre}
            />
            <EventImage
              src="event-dance.png"
              alt="Dance event"
              name="Dance"
              description={event.dance}
            />
            <EventImage
              src="event-literary.png"
              alt="Literary event"
              name="Literary"
              description={event.literary}
            />
          </div>
        </div>
      </div>
      <div ref={refContact}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

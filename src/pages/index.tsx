import { type NextPage } from "next";
import Image from "next/image";
import { EventImage } from "../components/EventImage";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { event } from "../constants/data";
import Head from "next/head";

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
      <Head>
        <title>KRITI UTSAV</title>
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
      <NavBar
        handleEventsClick={handleEventsClick}
        handleContactClick={handleContactClick}
      />
      <div className="m-auto md:max-w-7xl">
        <main className="flex w-full flex-wrap justify-center gap-4 py-6 md:gap-20">
          <div className="relative h-[250px] w-[250px] sm:h-[500px] sm:w-[500px]">
            <Image
              src="/header-circle.png"
              alt="Home main image"
              fill
              className="animate-spin-slow"
            />
            <div className="absolute right-8 top-[25%] h-32 w-9/12 md:top-[27%] md:right-16 md:h-60">
              <Image src="/header-logo.png" alt="Home main image" fill />
            </div>
          </div>
          <div className="mt-6 w-min lg:mt-12">
            <h1 className="text-center text-3xl font-extrabold text-custom-purple">
              36TH INTER UNIVERSITY EAST ZONE YOUTH FESTIVAL
            </h1>
            <h3 className="mb-8 text-center text-lg font-bold text-custom-purple">
              23rd - 27th December 2022
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

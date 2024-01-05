import React from "react";
import { BsPaintBucket } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import about from "../../assets/landingTwo.jpeg";

const About = () => (
  <div className="lg:mt-20">
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-red [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-red">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-md font-semibold leading-7 text-red">
                My Vision
              </p>
              <h1 className="mt-2 text-xl lx:text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">
                Welcome to Forloops Studio
              </h1>
              <p className="mt-6 text-sm sm:text-xl lg:text-xl leading-8 text-white">
                Hey there, music enthusiasts and creative minds! I'm thrilled to
                welcome you to Forloops Studio, a space where the rhythm of
                music meets the pulse of creativity. My vision goes beyond just
                creating a music website; it's about fostering a community where
                artists and fans connect on a deeper level. I am on a mission to
                provide a platform that's not only visually appealing but also
                intuitive, making it a breeze for you to explore, create, and
                engage.
              </p>
            </div>
          </div>
        </div>
        <div className="ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-sm bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src={about}
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base sm:text-lg leading-7 text-white lg:max-w-lg">
              <p>
                Hi, I'm Yonela Johannes, the mind behind the code and creativity
                for Forloops Studio. With a passion for both music and
                technology, I embarked on the journey to build a platform that
                seamlessly blends the two worlds. My focus is on crafting a
                website that's not just functional but a joy to use.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-500">
                About FL Studio
              </h2>
              <p className="text-sm md:text-xl mt-6">
                The name "Forloops Studio" was born out of a fusion of musical
                loops and the coding language's "for" function, symbolizing an
                iterative journey of creativity. Our chosen colors—red, white,
                and dark grey—aren't just aesthetics. Red embodies passion,
                white signifies simplicity, and dark grey adds a touch of
                sophistication. Together, they represent our commitment to a
                dynamic and elegant business approach.
              </p>
              <ul
                role="list"
                className="mt-8 text-sm md:text-xl space-y-8 text-gray-600"
              >
                <li className="flex gap-x-3">
                  <BsPaintBucket
                    className="mt-1 h-5 w-5 flex-none text-red"
                    aria-hidden="true"
                  />
                  <span className="text-gray-400">
                    <strong className="font-semibold text-white text-md md:text-xl">
                      Clean and Elegant Design:{" "}
                    </strong>
                    Forloops Studio boasts a sleek and elegant design that
                    reflects our commitment to aesthetics and user experience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <AiOutlineSetting
                    className="mt-1 h-5 w-5 flex-none text-red"
                    aria-hidden="true"
                  />
                  <span className="text-gray-400">
                    <strong className="font-semibold text-white text-md md:text-xl">
                      Functionality at Its Core:{" "}
                    </strong>
                    Users can easily sign up, artists can showcase their talent
                    by uploading songs and albums, and our dedicated admin team
                    ensures smooth management of content.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <BiMessageSquareDetail
                    className="mt-1 h-5 w-5 flex-none text-red"
                    aria-hidden="true"
                  />
                  <span className="text-gray-400">
                    <strong className="font-semibold text-white text-md md:text-xl">
                      Engaging Blogs:{" "}
                    </strong>
                    Recognizing the power of storytelling, we're weaving a
                    narrative through our blogs. Stay tuned for updates,
                    insights, and behind-the-scenes glimpses
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-sm md:text-xl text-gray-300">
                <i>
                  Remember, this is not just a website; it's a shared space for
                  artists to flourish, for fans to discover, and for everyone to
                  celebrate the artistry that makes life vibrant. We're here to
                  create, connect, and make beautiful waves in the world of
                  music. Whether you're a seasoned artist, an avid listener, or
                  someone simply curious about the magic of Forloops Studio,
                  you're not just joining a platform; you're becoming a vital
                  note in our melody. Stay tuned for the upcoming beats, music,
                  stories, and innovations. Together, let's compose a symphony
                  of success and creativity. Here's to the journey ahead—filled
                  with endless loops of inspiration, collaboration, and
                  boundless possibilities.
                </i>
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">
                Join My Journey
              </h2>
              <p className="mt-6 text-sm md:text-xl">
                Forloops Studio is more than a platform; it's a community. Join
                us as we explore the realms of music, creativity, and beyond.
                Whether you're an artist, a fan, or someone passionate about the
                intersection of art and technology, there's a place for you
                here. I'm excited about the possibilities, and I invite you to
                be a part of the Forloops Studio story. Cheers to music, code,
                and endless creativity!
                <br />
                <br />
                Yonela Johannes <br />
                <span className="font-semibold text-gray-400">
                  Founder, Forloops Studio
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;

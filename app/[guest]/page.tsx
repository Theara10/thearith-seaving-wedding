// app/[guest]/page.tsx - Dynamic route for each guest with Firebase integration
"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getGuestBySlug,
  Guest,
} from "../../lib/guestUtils";
import MainLayout from "../../components/layout/MainLayout";
import Hero from "../../components/Hero";

// Guest Entry Component
const GuestEntry = ({
  guest,
  onEnter,
}: {
  guest: Guest;
  onEnter: (guest: Guest) => void;
}) => {
  const handleEnter = () => {
    onEnter(guest);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center px-4">

    <div
      className="min-h-screen flex justify-center items-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif+Khmer:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Moul&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap");
        .khmer-font {
          font-family: "Moul", serif;
        }

        .kantumruy-font {
          font-family: "Kantumruy Pro", sans-serif;
        }

        .playfair-font {
          font-family: "Playfair Display", serif;
        }

        .traditional-border {
          background-image: radial-gradient(
              circle at 20px 20px,
              #daa520 2px,
              transparent 2px
            ),
            radial-gradient(circle at 20px 20px, #daa520 2px, transparent 2px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
        }

        .gold-shimmer {
          background: linear-gradient(
            45deg,
            #daa520,
            #ffd700,
            #b8860b,
            #daa520
          );
          background-size: 300% 300%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .book-shadow {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.2),
            0 0 0 1px rgba(218, 165, 32, 0.3);
        }

        .invitation-shadow {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(218, 165, 32, 0.2);
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite ease-in-out;
        }
      `}</style>

      <div className="lg:max-w-[40%] h-[80%] w-full relative z-10 opacity-80 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-3xl invitation-shadow sm:p-4 md:p-8 lg:p-8 text-center overflow-hidden border-4 border-white shadow-2xl">
        {/* Ornate Corner Decorations - Top Left */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <img
            src="/flower-left.png"
            alt="Corner Decoration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Ornate Corner Decorations - Top Right */}
        <div className="absolute top-0 right-0 w-32 h-32 transform rotate-90">
          <img
            src="/flower-left.png"
            alt="Corner Decoration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Inner Border Frame */}
        <div className="absolute inset-6 border-2 border-pink-200 rounded-2xl"></div>

        <div className="relative z-10 mt-4">
          {/* Header with bilingual title */}
          <div className="mb-8">
            <h1 className="khmer-font text-xl lg:text-3xl font-bold text-yellow-600 mb-2 mt-14 md:mt-4">
              សិរីសួស្តីអាពាហ៍ពិពាហ៍
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <svg
                className="w-8 h-8 text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 2C12 2 9 5 9 9C9 11.21 10.79 13 13 13C15.21 13 17 11.21 17 9C17 5 14 2 14 2M12 2C12 2 15 5 15 9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            <h2 className="text-md lg:text-xl font-serif text-yellow-600 tracking-wider">
              THE WEDDING INVITATION
            </h2>
          </div>

          <div className="mb-8 relative flex justify-center">
            <img
              src="/name.png"
              alt="Couple Names"
              className="h-32 lg:h-40 object-contain"
            />
          </div>

          {/* Invitation subtitle in Khmer */}
          <h3 className="khmer-font text-xl lg:text-2xl kantumruy-font font-medium text-yellow-600 mb-8">
            សូមគោរពអញ្ជើញ
          </h3>

          {/* Guest Name Book */}
          <div className="relative mx-auto mb-8 max-w-fit">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-6 border-2 border-yellow-300 shadow-lg relative overflow-hidden">
              <h3 className="playfair-font text-2xl lg:text-3xl font-semibold text-gray-800 tracking-wide">
                {guest.name}
              </h3>
            </div>
          </div>

          {/* Email Info */}
          {/* {guest.email && (
            <div className="text-xs text-gray-500 mb-8 italic">
              Invitation sent to: {guest.email}
            </div>
          )} */}

          {/* Event Details in Khmer */}
          {/* <div className="bg-white bg-opacity-50 rounded-xl p-6 mb-8 mx-auto max-w-lg border border-yellow-200">
            <p className="khmer-font text-base lg:text-md text-gray-800 leading-relaxed">
              ថ្ងៃទី ១០ខែ មករា ឆ្នាំ២០២៦ ម៉ោង ៤:០០ ល្ងាច
              <br />
              ស្ថិតនៅតាមខណ្ឌចំការមន ក្រុងភ្នំពេញអត្តសញ្ញាណ
              <br />
              សង្កាត់ឃ្មួញ ក្រុងតាខ្មៅ ខេត្តកណ្តាល
            </p>
          </div> */}

          {/* View Details Button */}
          <button
            onClick={handleEnter}
            className="w-fit border-1 mt-4 border-yellow-500  text-gray-800 py-4 px-8 rounded-xl playfair-font text-lg font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-white hover:transform hover:-translate-y-1 hover:shadow-lg active:transform active:translate-y-0 relative overflow-hidden group animate-pulse-gentle"
          >
            <span className="absolute inset-0  opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative z-10 kantumruy-font">បើកធៀប</span>
          </button>

          {/* Closing Message */}
          <div className="mt-8 playfair-font text-base text-gray-700 italic py-10">
            <p>We can&apos;t wait to celebrate with you! 💕</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 404 Component for invalid guest URLs
const GuestNotFound = ({ guestSlug }: { guestSlug: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-serif text-gray-800 mb-4">
            Invitation Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn&apos;t find an invitation for {guestSlug}.
          </p>
          <p className="text-sm text-gray-500">
            Please check your invitation link or contact Rasmi & Alex if you
            believe this is an error.
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your invitation...</p>
      </div>
    </div>
  );
};

// Error Component
const ErrorScreen = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-serif text-gray-800 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We encountered an error while loading your invitation.
          </p>
          <p className="text-sm text-gray-500 mb-4">Error: {error}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors duration-200"
          >
            Try Again
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const GuestPage = () => {
  const params = useParams();
  const guestSlug = params.guest as string;
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [, setCurrentGuest] = useState<Guest | null>(null);

  // Fetch guest data from Firebase
  const fetchGuest = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const guestData = await getGuestBySlug(slug);
      setGuest(guestData);
    } catch (err) {
      console.error("Error fetching guest:", err);
      setError("Failed to load guest information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch guest data on component mount
  useEffect(() => {
    if (guestSlug) {
      fetchGuest(guestSlug);
    }
  }, [guestSlug]);

  const handleGuestEntry = (guestData: Guest) => {
    setCurrentGuest(guestData);
    setShowContent(true);
  };

  const handleRetry = () => {
    if (guestSlug) {
      fetchGuest(guestSlug);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Invitation - Rasmi & Alex&apos;s Wedding</title>
          <meta name="description" content="Loading wedding invitation..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LoadingScreen />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Head>
          <title>Error - Rasmi & Alex&apos;s Wedding</title>
          <meta
            name="description"
            content="Error loading wedding invitation."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ErrorScreen error={error} onRetry={handleRetry} />
      </>
    );
  }

  // Show 404 if guest not found
  if (!guest) {
    return (
      <>
        <Head>
          <title>Invitation Not Found - Rasmi & Alex&apos;s Wedding</title>
          <meta name="description" content="Wedding invitation not found." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GuestNotFound guestSlug={guestSlug} />
      </>
    );
  }

  // Show guest entry screen if user hasn&apos;t entered yet
  if (!showContent) {
    return (
      <>
        <Head>
          <title>
            {guest.name} - You&apos;re Invited to Rasmi & Alex&apos;s Wedding
          </title>
          <meta
            name="description"
            content={`${guest.name}, you&apos;re invited to celebrate Rasmi & Alex&apos;s wedding!`}
          />
          <meta
            property="og:title"
            content={`${guest.name} - You&apos;re Invited!`}
          />
          <meta
            property="og:description"
            content={`${guest.name}, you&apos;re invited to celebrate Rasmi & Alex&apos;s wedding!`}
          />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GuestEntry guest={guest} onEnter={handleGuestEntry} />
      </>
    );
  }

  // Show main wedding content after guest enters
  return (
    <MainLayout>
      <Head>
        <title>{guest.name} - Rasmi & Alex&apos;s Wedding</title>
        <meta
          name="description"
          content={`Welcome ${guest.name}! Join us for the wedding celebration of Rasmi & Alex.`}
        />
        <meta
          property="og:title"
          content={`${guest.name} - Rasmi & Alex&apos;s Wedding`}
        />
        <meta
          property="og:description"
          content={`Welcome ${guest.name}! Join us for the wedding celebration of Rasmi & Alex.`}
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Personalized welcome message */}
      {/* <div className="bg-rose-50 py-4 text-center border-b">
        <p className="text-rose-700 font-medium">
          Welcome, {guest.name}! We&apos;re so excited you&apos;re here! 🎉
        </p>
        {guest.plusOne && (
          <p className="text-rose-600 text-sm mt-1">
            Don&apos;t forget to RSVP for your plus one too!
          </p>
        )}
      </div> */}

      <Hero />
      {/* <OurStory />
      <Gallery />
      <VenueMap />
      <Payment /> */}
      {/* Pass guest info to RSVP form for pre-filling */}
      {/* <RSVPForm guestInfo={guest} /> */}

      {/* Image Gallery Section */}
      <div
        className="min-h-screen p-6 flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="max-w-lg w-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 opacity-90 rounded-3xl invitation-shadow border-4 border-white shadow-2xl overflow-hidden relative z-10">
          {/* Ornate Corner Decorations - Top Left */}
          <div className="absolute top-0 left-0 w-32 h-32 z-10">
            <img
              src="/flower-left.png"
              alt="Corner Decoration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ornate Corner Decorations - Top Right */}
          <div className="absolute top-0 right-0 w-32 h-32 transform rotate-90 z-10">
            <img
              src="/flower-left.png"
              alt="Corner Decoration"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="px-4 py-16">
            <h2 className="text-3xl text-yellow-600 font-serif text-center  mb-12 battambong-font">
              កម្រងរូបភាព
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div
                  key={num}
                  className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-200 bg-gradient-to-br from-pink-100 to-pink-200"
                >
                  <img
                    src={`/images/${num}.jpg`}
                    alt={`Wedding Photo ${num}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuestPage;

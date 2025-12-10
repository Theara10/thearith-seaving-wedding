"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface WeddingInvitationProps {
  groomName?: string;
  brideName?: string;
  groomNameEn?: string;
  brideNameEn?: string;
  weddingDate?: string;
  ceremonyTime?: string;
  receptionTime?: string;
  partyTime?: string;
  venue?: string;
  coordinates?: string;
  mapEmbedUrl?: string;
  groomImage?: string;
  brideImage?: string;
  groomParents?: { father: string; mother: string };
  brideParents?: { father: string; mother: string };
  paymentQRs?: { aba: string; acleda: string };
}

// New agenda data from the uploaded image
interface NewAgendaItem {
  time: string;
  event: string;
}

interface NewDaySchedule {
  dateKhmer: string;
  items: NewAgendaItem[];
}

const newWeddingSchedule: NewDaySchedule[] = [
  {
    dateKhmer: "កម្មវិធីថ្ងៃទី១ ថ្ងៃសុក្រ ទី០២ ខែមករា ឆ្នាំ២០២៦",
    items: [
      { time: "02:00 រសៀល", event: "ពិធីសែនក្រុងពាលី" },
      { time: "03:30 រសៀល", event: "ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត" },
      { time: "05:00 រសៀល", event: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច" },
    ],
  },
  {
    dateKhmer: "កម្មវិធីថ្ងៃទី២ ថ្ងៃសៅរ៍ ទី០៣ ខែមករា ឆ្នាំ២០២៦",
    items: [
      { time: "06:30 ព្រឹក", event: "ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែរជំនួន" },
      {
        time: "07:00 ព្រឹក",
        event:
          "ពិធីហែរជំនួនកំណាត់ចូលរោងជ័យ និយាយជើងការ រៀបរាប់ផ្លែឈើ និងពិសាអាហារពេលព្រឹក",
      },
      { time: "08:30 ព្រឹក", event: "ពិធីបំពាក់ចិញ្ចៀន" },
      {
        time: "09:30 ព្រឹក",
        event: "ពិធីកាត់សក់បង្គក់សិរី កូនប្រុស-កូនស្រី ថតរូបជួបជុំគ្រួសារ",
      },
      {
        time: "11:00 ព្រឹក",
        event: "ពិធីសំពះផ្ទឹមចងដៃ បង្វិលពពិល និង ព្រះថោងតោងស្បៃ",
      },
      {
        time: "12:00 ថ្ងៃត្រង់",
        event: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់ បញ្ចប់កិច្ចអាពាហ៍ពិពាហ៍",
      },
      {
        time: "05:00 ល្ងាច",
        event:
          "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារនៅ គេហដ្ធានខាងស្រីដោយមេត្រីភាព។ សូមអរគុណ !",
      },
    ],
  },
];

const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  groomName = "សិទ្ធ សុធារិទ្ធ",
  brideName = "ឡាយ សៀវអុីញ",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d15638.000329745311!2d104.81044285!3d11.51594065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2skh!4v1765382330032!5m2!1sen!2skh",
  groomImage = "/groom.png",
  brideImage = "/bride.png",
  groomParents = { father: "លោក អុឹម គឹមសាន", mother: "លោកស្រី ចិនសុផល" },
  brideParents = { father: "លោក ណុប ប៊ុនលី", mother: "លោកស្រី គួច ងិងណៃ" },
}) => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div
      className="flex flex-col w-full bg-cover  bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: "url('/bg2.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&display=swap");

        .kantumruy-font {
          font-family: "Kantumruy Pro", sans-serif;
        }

        .battambang-font {
          font-family: "Battambang", cursive;
        }

        .invitation-shadow {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(218, 165, 32, 0.2);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Page 4: Couple Photos */}
      <div className="min-h-screen p-6 flex items-center justify-center relative z-10">
        <div className="max-w-lg w-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 opacity-90 rounded-3xl invitation-shadow border-4 border-white shadow-2xl overflow-hidden relative">
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

          {/* Inner Border Frame */}
          {/* <div className="absolute inset-6 border-2 border-pink-200 rounded-2xl pointer-events-none z-10"></div> */}

          <div className="px-8 py-4">
            <div className="mb-6 mt-10">
              <div className="text-center space-y-3 battambang-font">
                <div className="flex flex-row space-y-2 justify-between px-4">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {groomParents.father}
                      </span>{" "}
                    </p>

                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {groomParents.mother}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {brideParents.father}
                      </span>{" "}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">
                        {brideParents.mother}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-lg font-bold text-yellow-600 mt-4">
                  មានកិត្តិយសូមគោរពអញ្ជើញ
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និង
                  ប្រិយមិត្តអញ្ជើញចូលរួមជាអភិបតីនិងជាភ្ញៀវកិត្តិយ
                  ពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ
                </p>
              </div>
            </div>
          </div>

          {/* Couple Photos */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Groom */}
              <div className="text-center battambang-font">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-200 mb-3 bg-gradient-to-br from-blue-100 to-blue-200">
                  {groomImage ? (
                    <Image
                      src={groomImage}
                      alt="Groom"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🤵
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-800">កូនប្រុសនាម</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {groomName}
                </p>
              </div>

              {/* Bride */}
              <div className="text-center battambang-font">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-200 mb-3 bg-gradient-to-br from-pink-100 to-pink-200">
                  {brideImage ? (
                    <Image
                      src={brideImage}
                      alt="Bride"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👰
                    </div>
                  )}
                </div>
                <p className="text-lg  text-gray-800">កូនស្រីនាម</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {brideName}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="px-8 pb-8 text-center space-y-4 battambang-font">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-lg border-2 border-amber-200">
              <p className="text-base lg:text-md text-[#6B7B5E] leading-relaxed">
                ថ្ងៃសៅរ៍ទី០៣ ខែមករា ឆ្នាំ២០២៦ ម៉ោង ៥:០០ រសៀល
                <br />
                ស្ថិតនៅគេហដ្ធានខាងស្រី ភូមិព្រែកហូរកើត១ សង្កាត់ព្រែកហូរ
                ក្រុងតាខ្មៅ ខេត្តកណ្តាល
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =============================================== */}

      {/* =============================================== */}
      {/* NEW SECTION: Wedding Agenda from uploaded image */}
      {/* =============================================== */}
      <div className="min-h-screen p-6 flex items-center justify-center relative z-10">
        <div className="max-w-lg w-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 opacity-90 rounded-3xl invitation-shadow border-4 border-white shadow-2xl overflow-hidden relative">
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

          {/* Ornate Corner Decorations - Bottom Left */}
          <div className="absolute bottom-0 left-0 w-32 h-32 transform rotate-[-90deg] z-10">
            <img
              src="/flower-left.png"
              alt="Corner Decoration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ornate Corner Decorations - Bottom Right */}
          <div className="absolute bottom-0 right-0 w-32 h-32 transform rotate-180 z-10">
            <img
              src="/flower-left.png"
              alt="Corner Decoration"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10 py-12 px-6">
            {/* Header */}
            <div className="text-center mb-8 mt-6">
              <h1
                className="text-2xl md:text-3xl font-bold mb-2 battambang-font"
                style={{ color: "#C9A227" }}
              >
                កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
              </h1>
            </div>

            {/* Day Tabs */}
            <div className="flex justify-center gap-3 mb-8">
              {newWeddingSchedule.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 battambang-font ${
                    activeDay === index
                      ? "bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-200/50 scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-amber-200"
                  }`}
                >
                  ថ្ងៃទី {index + 1}
                </button>
              ))}
            </div>

            {/* Schedule Content */}
            <div className="">
              {/* Day Header */}
              <div className="text-center mb-6 pb-4 border-b-2 border-amber-200">
                <h2
                  className="text-lg md:text-xl font-bold battambang-font"
                  style={{ color: "#6B7B5E" }}
                >
                  {newWeddingSchedule[activeDay].dateKhmer}
                </h2>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                {/* Timeline line - positioned on the far left */}
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-300 via-amber-200 to-transparent rounded-full" />

                <div className="space-y-6">
                  {newWeddingSchedule[activeDay].items.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex gap-4 group"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.08}s both`,
                      }}
                    >
                      {/* Timeline Dot - positioned on the left line */}
                      <div className="absolute left-[-18px] top-1.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-sm group-hover:scale-125 transition-transform" />

                      {/* Time Badge */}
                      <div className="w-[90px] flex-shrink-0">
                        <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md battambang-font">
                          {item.time}
                        </span>
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 bg-gradient-to-br from-amber-50/80 to-rose-50/60 rounded-xl p-4 border border-amber-100/50 hover:shadow-md hover:border-amber-200 transition-all duration-300 group-hover:-translate-y-0.5">
                        <p className="text-gray-800 text-sm md:text-base leading-relaxed battambang-font">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 2: Schedule */}

      {/* Page 1: Main Invitation with Map & Payment */}
      <div className="min-h-screen p-6 flex items-center justify-center relative z-10 battambong-font">
        <div className="max-w-lg w-full bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 opacity-90 rounded-3xl invitation-shadow border-4 border-white shadow-2xl overflow-hidden relative">
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

          {/* Invitation Title */}
          <div className="px-8 pt-10 pb-4 text-center battambang-font">
            <h1 className="text-3xl font-bold text-yellow-600 mb-2 ">
              ទីតាំងកម្មវិធីមង្គល
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              ស្ថិតនៅគេហដ្ធានខាងស្រី ភូមិព្រែកហូរកើត១ សង្កាត់ព្រែកហូ ក្រុងតាខ្មៅ
              ខេត្តកណ្តាល
            </p>
          </div>

          {/* Map Section */}
          <div className="px-8 py-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-amber-200">
              <div className="aspect-video bg-gray-200 relative">
                {mapEmbedUrl ? (
                  // <iframe
                  //   src={mapEmbedUrl}
                  //   className="w-full h-full"
                  //   loading="lazy"
                  // />
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7821.032516917225!2d104.942002!3d11.442615!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDI2JzMzLjQiTiAxMDTCsDU2JzMxLjIiRQ!5e0!3m2!1skm!2skh!4v1765382502645!5m2!1skm!2skh"
                    width="600"
                    height="450"
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <MapPin className="w-12 h-12" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="px-8 py-6">
            <div className="text-center mb-4 battambang-font">
              <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                គណនីរួមជាមួយប្រពន្ធសំណប់ចិត្ត😊
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-amber-200 max-w-md w-full">
                <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/aba.jpg"
                    alt="Payment QR"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-500 itali battambang-font">
              អរគុណសម្រាប់ការចំណាយពេលវេលាចូលរួម សូមធ្វើដំណើរដោយសុវត្ថិភាព 🙏{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitation;

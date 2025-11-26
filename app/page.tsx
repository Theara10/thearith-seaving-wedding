// pages/index.tsx
"use client";
import type { NextPage } from "next";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  // You can set this to the specific guest&apos;s name based on URL params, props, or any other method
  // This would be dynamic based on your invitation syste

  // Show guest entry screen if user hasn&apos;t entered their name

  // Show main wedding content after guest enters their name
  return (
    <MainLayout>
      <Head>
        <title>Thearith & Seaving are Getting Married!</title>
        <meta
          name="description"
          content="Join us for the wedding celebration of Rasmi & Alex."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Welcome message for the guest */}
      <div className="bg-rose-50 py-4 text-center border-b">
        <p className="text-rose-700 font-medium">
          Welcome! We&apos;re so excited you&apos;re here! 🎉
        </p>
      </div>

      {/* Optional Navbar for navigating sections */}
      {/* <Navbar sections={[&apos;our-story&apos;, &apos;gallery&apos;, &apos;venue&apos;, &apos;rsvp&apos;]} /> */}

      <Hero />
    </MainLayout>
  );
};

export default Home;

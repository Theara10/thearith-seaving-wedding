// components/sections/OurStory.tsx
import Image from "next/image";
import React from "react";

interface StoryMilestone {
  title: string;
  date: string;
  description: string;
  icon?: string;
}

const OurStory: React.FC = () => {
  const milestones: StoryMilestone[] = [
    {
      title: "First Meeting",
      date: "March 2019",
      description:
        "We met at a coffee shop on a rainy Saturday morning. What started as a chance encounter turned into hours of conversation over endless cups of coffee.",
      icon: "☕",
    },
    {
      title: "First Date",
      date: "April 2019",
      description:
        "Our first official date was a picnic in Central Park. We talked until the stars came out, and we both knew something special was beginning.",
      icon: "🌟",
    },
    {
      title: "Moving In Together",
      date: "December 2020",
      description:
        "After a year of long-distance dating, we finally took the leap and moved in together. It was the best decision we ever made.",
      icon: "🏠",
    },
    {
      title: "The Proposal",
      date: "June 2023",
      description:
        "On a sunset beach walk in Santorini, surrounded by the most beautiful scenery, the question was finally popped. Of course, the answer was yes!",
      icon: "💍",
    },
  ];

  return (
    <section
      id="our-story"
      className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-pink-50 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-primary mb-6">
            Our Love Story
          </h2>
          <p className="text-xl text-brand-text max-w-2xl mx-auto">
            Every love story is beautiful, but ours is our favorite
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/ourstory.jpg"
              alt="Our Journey Together"
              width={800}
              height={500}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-lg md:text-xl font-medium">
                &quotIn all the world, there is no heart for me like yours&quot
              </p>
            </div>
          </div>
        </div>

        {/* Story Timeline */}
        <div className="mb-16">
          <h3 className="font-display text-2xl md:text-3xl text-brand-primary text-center mb-12">
            Our Journey Together
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-brand-primary/20 h-full hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div
                    className={`md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{milestone.icon}</span>
                        <div>
                          <h4 className="font-display text-xl text-brand-primary font-semibold">
                            {milestone.title}
                          </h4>
                          <p className="text-sm text-brand-primary/70 font-medium">
                            {milestone.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-brand-text leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <div className="text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl text-brand-primary mb-6">
              The Next Chapter
            </h3>
            <p className="text-lg text-brand-text leading-relaxed mb-6">
              After years of adventures, laughter, and growing together,
              we&apos;re ready to take the next step in our journey. We
              can&apos;t imagine celebrating this milestone without the people
              who have supported and loved us along the way.
            </p>
            <p className="text-xl text-brand-primary font-medium">
              We can&apos;t wait to celebrate with you! 💕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

// components/sections/Gallery.tsx
import Image from "next/image";
import React, { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  date?: string;
}

const images: GalleryImage[] = [
  {
    src: "/img3.jpg",
    alt: "Engagement photo at sunset",
    category: "Engagement",
    date: "June 2023",
  },
  {
    src: "/img3.jpg",
    alt: "Coffee date memories",
    category: "Casual",
    date: "March 2019",
  },
  {
    src: "/img3.jpg",
    alt: "Adventure in Santorini",
    category: "Travel",
    date: "June 2023",
  },
  {
    src: "/img3.jpg",
    alt: "The proposal moment",
    category: "Engagement",
    date: "June 2023",
  },
  {
    src: "/img3.jpg",
    alt: "Movie night at home",
    category: "Casual",
    date: "Winter 2020",
  },
  {
    src: "/img3.jpg",
    alt: "Beach vacation in Bali",
    category: "Travel",
    date: "Summer 2022",
  },
  {
    src: "/img3.jpg",
    alt: "Celebrating our engagement",
    category: "Engagement",
    date: "June 2023",
  },
  {
    src: "/img3.jpg",
    alt: "Cooking together",
    category: "Casual",
    date: "Spring 2021",
  },
  {
    src: "/img3.jpg",
    alt: "Mountain hiking adventure",
    category: "Travel",
    date: "Fall 2021",
  },
  {
    src: "/img3.jpg",
    alt: "Dancing in the living room",
    category: "Casual",
    date: "New Year 2022",
  },
  {
    src: "/img3.jpg",
    alt: "City break in Paris",
    category: "Travel",
    date: "Spring 2022",
  },
  {
    src: "/img3.jpg",
    alt: "Ring close-up shot",
    category: "Engagement",
    date: "June 2023",
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Engagement", "Casual", "Travel"];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.src === selectedImage.src
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-primary mb-6">
            Our Journey in Photos
          </h2>
          <p className="text-xl text-brand-text max-w-2xl mx-auto">
            Moments that tell our story, captured in time
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-brand-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-brand-primary hover:bg-brand-primary hover:text-white shadow-md hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium truncate">{image.alt}</p>
                {image.date && (
                  <p className="text-xs text-gray-200">{image.date}</p>
                )}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-brand-text">
              No photos found in this category.
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Main Image */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] max-h-[70vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>

                {/* Image Caption */}
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-medium text-brand-primary mb-2">
                    {selectedImage.alt}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-brand-text">
                    <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full">
                      {selectedImage.category}
                    </span>
                    {selectedImage.date && <span>{selectedImage.date}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

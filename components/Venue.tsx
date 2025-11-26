// components/sections/VenueMap.tsx
import React from "react";

const VenueMap: React.FC = () => {
  // Replace with your venue's Google Maps embed code
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2000000000003!2d-73.97604068459319!3d40.75774797932698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fef0fd5059%3A0x522158932568335!2sThe%20St.%20Regis%20New%20York!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus`; // Example URL for St. Regis New York

  return (
    <section id="venue" className="py-16 md:py-24 bg-white px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl md:text-5xl text-brand-primary mb-12">
          Wedding Venue
        </h2>
        <div className="mb-6">
          <h3 className="text-2xl font-display text-brand-text">
            The St. Regis New York
          </h3>
          <p className="text-lg text-brand-secondary">
            Two East 55th Street, New York, NY 10022
          </p>
          <a
            href="https://www.marriott.com/en-us/hotels/nycxr-the-st-regis-new-york/overview/" // Replace with actual venue link
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:text-brand-accent underline transition-colors"
          >
            Visit Venue Website
          </a>
        </div>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-brand-accent">
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Map"
          ></iframe>
        </div>
        <div className="mt-8 text-brand-text">
          <h4 className="text-xl font-display mb-2">Directions & Parking</h4>
          <p>
            Detailed information about getting to the venue and parking options
            will be provided here. For example, valet parking is available, or
            nearby parking garages include...
          </p>
        </div>
      </div>
    </section>
  );
};

export default VenueMap;

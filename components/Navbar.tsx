// components/Navbar.tsx
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id], header[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "invitation", label: "Invitation" },
    { id: "story", label: "Our Story" },
    { id: "gallery", label: "Gallery" },
    { id: "venue", label: "Venue" },
    { id: "rsvp", label: "RSVP" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center flex-wrap py-2 px-2 bg-white bg-opacity-95 shadow-lg z-50">
      {navItems.map((item) => (
        <NavButton
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
        />
      ))}
    </div>
  );
}

type NavButtonProps = {
  id: string;
  label: string;
  isActive: boolean;
};

function NavButton({ id, label, isActive }: NavButtonProps) {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={scrollToSection}
      className={`inline-block px-4 py-2 m-1 rounded-full text-base font-medium transition-all duration-300 ease-in-out hover:bg-secondary hover:-translate-y-1 shadow-md ${
        isActive ? "bg-secondary text-white" : "bg-primary text-white"
      }`}
    >
      {label}
    </a>
  );
}

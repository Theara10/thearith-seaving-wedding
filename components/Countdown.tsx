// components/Countdown.tsx
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const weddingDate = new Date("October 29, 2025 17:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setIsExpired(true);
        return;
      }

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    // Initial update
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white bg-opacity-90 py-8 text-center rounded-lg shadow-lg mb-16 max-w-4xl mx-auto mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl mb-6 text-primary">
          Counting Down to the Big Day
        </h2>

        {isExpired ? (
          <h3 className="text-xl md:text-2xl">The Wedding Day Has Arrived!</h3>
        ) : (
          <div className="flex justify-center flex-wrap" id="countdown">
            <CountdownBox value={timeLeft.days} label="Days" />
            <CountdownBox value={timeLeft.hours} label="Hours" />
            <CountdownBox value={timeLeft.minutes} label="Minutes" />
            <CountdownBox value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  );
}

type CountdownBoxProps = {
  value: string;
  label: string;
};

function CountdownBox({ value, label }: CountdownBoxProps) {
  return (
    <div className="w-24 h-24 md:w-28 md:h-28 m-2 bg-primary text-white rounded-lg flex flex-col justify-center items-center shadow-lg">
      <div className="text-3xl md:text-4xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

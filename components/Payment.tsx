// components/sections/Payment.tsx
import Image from "next/image";
import React, { useState } from "react";

interface PaymentOption {
  id: string;
  title: string;
  amount: number;
  description: string;
  icon: string;
  popular?: boolean;
}

const Payment: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(
    null
  );

  const paymentOptions: PaymentOption[] = [
    {
      id: "gift",
      title: "Wedding Gift",
      amount: 50,
      description: "Help us start our new journey together",
      icon: "🎁",
    },
    {
      id: "honeymoon",
      title: "Honeymoon Fund",
      amount: 100,
      description: "Contribute to our dream honeymoon",
      icon: "🏖️",
      popular: true,
    },
    {
      id: "dinner",
      title: "Reception Dinner",
      amount: 75,
      description: "Cover your plate at our reception",
      icon: "🍽️",
    },
    {
      id: "custom",
      title: "Custom Amount",
      amount: 0,
      description: "Choose your own contribution amount",
      icon: "💝",
    },
  ];

  const handlePaymentClick = (option: PaymentOption) => {
    setSelectedPayment(option);
    setShowQRCode(true);
  };

  const closeQRModal = () => {
    setShowQRCode(false);
    setSelectedPayment(null);
  };

  return (
    <section
      id="payment"
      className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-primary mb-6">
            Wedding Contributions
          </h2>
          <p className="text-xl text-brand-text max-w-3xl mx-auto">
            Your presence is the greatest gift, but if you&apos;d like to
            contribute to our special day, we&apos;ve made it easy with digital
            payments
          </p>
        </div>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 ${
                option.popular
                  ? "border-brand-primary ring-2 ring-brand-primary/20"
                  : "border-gray-100 hover:border-brand-primary/50"
              }`}
              onClick={() => handlePaymentClick(option)}
            >
              {/* Popular Badge */}
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="text-center mb-4">
                <span className="text-4xl mb-2 block">{option.icon}</span>
                <h3 className="font-display text-xl text-brand-primary font-semibold">
                  {option.title}
                </h3>
              </div>

              {/* Amount */}
              <div className="text-center mb-4">
                {option.amount > 0 ? (
                  <span className="text-3xl font-bold text-brand-primary">
                    ${option.amount}
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-brand-primary">
                    Any Amount
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-brand-text text-center text-sm mb-6">
                {option.description}
              </p>

              {/* Button */}
              <button className="w-full bg-brand-primary text-white py-3 rounded-lg font-medium hover:bg-brand-primary/90 transition-colors duration-200">
                Contribute Now
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl text-brand-primary mb-4">
              How It Works
            </h3>
            <p className="text-brand-text max-w-2xl mx-auto">
              Click on any contribution option above to see our QR code for
              instant payment via your mobile banking app or digital wallet
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                Scan QR Code
              </h4>
              <p className="text-sm text-brand-text">
                Use your phone&apos;s camera or banking app to scan
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                Choose Payment
              </h4>
              <p className="text-sm text-brand-text">
                Pay via bank transfer, digital wallet, or card
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold text-brand-primary mb-2">
                Instant Confirmation
              </h4>
              <p className="text-sm text-brand-text">
                Your contribution is processed immediately
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQRCode && selectedPayment && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
              {/* Close Button */}
              <button
                onClick={closeQRModal}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
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

              {/* Modal Content */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="text-4xl mb-2 block">
                    {selectedPayment.icon}
                  </span>
                  <h3 className="font-display text-2xl text-brand-primary font-semibold mb-2">
                    {selectedPayment.title}
                  </h3>
                  {selectedPayment.amount > 0 && (
                    <p className="text-3xl font-bold text-brand-primary mb-2">
                      ${selectedPayment.amount}
                    </p>
                  )}
                  <p className="text-brand-text">
                    {selectedPayment.description}
                  </p>
                </div>

                {/* QR Code */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                    <Image
                      src="/qr-code.png" // Replace with your actual QR code image
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <p className="text-sm text-brand-text mt-4">
                    Scan this QR code with your banking app or digital wallet
                  </p>
                </div>

                {/* Payment Instructions */}
                <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-brand-primary mb-2">
                    Payment Instructions:
                  </h4>
                  <ul className="text-sm text-brand-text space-y-1">
                    <li>• Open your banking app or digital wallet</li>
                    <li>• Scan the QR code above</li>
                    <li>• Verify the amount and details</li>
                    <li>• Complete the payment</li>
                  </ul>
                </div>

                {/* Alternative Payment Info */}
                <div className="border-t pt-4">
                  <p className="text-sm text-brand-text mb-2">
                    <strong>Alternative Payment:</strong>
                  </p>
                  <p className="text-sm text-brand-text">
                    Bank Transfer: John & Jane Smith
                    <br />
                    Account: 1234-5678-9012
                    <br />
                    Reference: Wedding Gift
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Payment;

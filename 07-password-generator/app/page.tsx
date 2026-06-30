"use client";

import { useState, useEffect, useCallback } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [length, options]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generatePassword();
  }, [generatePassword]);

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let strength = 0;
    if (password.length > 0) {
      if (password.length >= 8) strength += 1;
      if (options.uppercase) strength += 1;
      if (options.lowercase) strength += 1;
      if (options.numbers) strength += 1;
      if (options.symbols) strength += 1;
    }

    if (strength === 0) return { label: "", bars: 0, color: "bg-transparent" };
    if (strength <= 2)
      return {
        label: "TOO WEAK!",
        bars: 1,
        color: "bg-[#F64A4A] border-[#F64A4A]",
      };
    if (strength === 3)
      return { label: "WEAK", bars: 2, color: "bg-[#FB7C58] border-[#FB7C58]" };
    if (strength === 4)
      return {
        label: "MEDIUM",
        bars: 3,
        color: "bg-[#F8CD65] border-[#F8CD65]",
      };
    return { label: "STRONG", bars: 4, color: "bg-[#A4FFAF] border-[#A4FFAF]" };
  };

  const strengthData = getStrength();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#14131B] font-mono">
      <div className="w-full max-w-[540px]">
        <h1 className="text-center text-[#817D92] text-xl md:text-2xl font-bold mb-6 md:mb-8">
          Password Generator
        </h1>

        {/* Output Card */}
        <div className="bg-[#24232C] p-4 md:p-6 flex justify-between items-center mb-6 h-[80px] md:h-[96px]">
          <span
            className={`text-2xl md:text-3xl truncate ${password ? "text-[#E6E5EA]" : "text-[#817D92] opacity-50"}`}
          >
            {password || "P4$5W0rD!"}
          </span>
          <div className="flex items-center gap-4">
            {copied && (
              <span className="text-[#A4FFAF] text-sm md:text-base uppercase">
                Copied
              </span>
            )}
            <button
              onClick={copyToClipboard}
              className="text-[#A4FFAF] hover:text-white transition-colors"
              title="Copy"
            >
              <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-[#24232C] p-4 md:p-8">
          {/* Length Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <label className="text-[#E6E5EA] md:text-lg">
                Character Length
              </label>
              <span className="text-[#A4FFAF] text-3xl md:text-4xl">
                {length}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{
                backgroundSize: `${(length / 20) * 100}% 100%`,
              }}
              className="w-full h-2 appearance-none bg-[#18171F] cursor-pointer outline-none slider-thumb"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 md:space-y-5 mb-8">
            {[
              { id: "uppercase", label: "Include Uppercase Letters" },
              { id: "lowercase", label: "Include Lowercase Letters" },
              { id: "numbers", label: "Include Numbers" },
              { id: "symbols", label: "Include Symbols" },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-5 md:space-x-6 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={options[item.id as keyof typeof options]}
                    onChange={() =>
                      handleOptionChange(item.id as keyof typeof options)
                    }
                    className="w-5 h-5 appearance-none border-2 border-[#E6E5EA] group-hover:border-[#A4FFAF] checked:bg-[#A4FFAF] checked:border-[#A4FFAF] cursor-pointer transition-colors"
                  />
                  {options[item.id as keyof typeof options] && (
                    <svg
                      className="absolute text-[#18171F] pointer-events-none w-3.5 h-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 12"
                      fill="none"
                    >
                      <path
                        d="M1 5.607 4.393 9l8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[#E6E5EA] md:text-lg">{item.label}</span>
              </label>
            ))}
          </div>

          {/* Strength Meter */}
          <div className="bg-[#18171F] p-4 flex justify-between items-center mb-8 h-[72px]">
            <span className="text-[#817D92] uppercase md:text-lg">
              Strength
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[#E6E5EA] md:text-xl uppercase">
                {strengthData.label}
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className={`h-[28px] w-[10px] border-2 transition-colors ${
                      index <= strengthData.bars
                        ? strengthData.color
                        : "border-[#E6E5EA] bg-transparent"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-[#A4FFAF] hover:bg-transparent text-[#24232C] hover:text-[#A4FFAF] border-2 border-[#A4FFAF] font-bold text-lg p-5 transition-all uppercase flex justify-center items-center gap-4 group"
          >
            Generate
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
                className="group-hover:fill-[#A4FFAF] transition-colors"
              />
            </svg>
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: #E6E5EA;
          cursor: pointer;
          border: 2px solid #E6E5EA;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          background: #18171F;
          border: 2px solid #A4FFAF;
        }
        input[type=range] {
          background-image: linear-gradient(#A4FFAF, #A4FFAF);
          background-repeat: no-repeat;
        }
      `,
        }}
      />
    </main>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      rubik: ["Rubik"],
    },

    extend: {
      colors: {
        blue1: "#1D4ED8",
        blue2: "#337CCF",
        border1: "#D9D9D9",
        blue3: "#07A2F9",
        box: "rgba(0, 0, 0, 0.25)",
        box1: "rgba(1, 0, 0, 0.75)",
      },
      boxShadow: {
        input: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        btn: "0px 4px 4px 0px rgba(0, 0, 0, 0.30)",
        box1: "0px 4px 4px 0px rgba(0, 0, 0, 0.40)",
      },
      spacing: {
        minus: "-15px",
        minus1: "-20px",
        "50%": "23%",
      },
    },
  },
  plugins: [],
};

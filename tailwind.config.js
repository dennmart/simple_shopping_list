module.exports = {
  purge: ["./app/views/**/*.html.erb"],
  theme: {
    extend: {},
  },
  variants: {
    borderWidth: ["responsive", "last"],
  },
  plugins: [require("@tailwindcss/ui")],
};

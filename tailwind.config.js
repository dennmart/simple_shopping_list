module.exports = {
  purge: [
    "./app/views/**/*.html.erb",
    "./app/javascript/channels/*.js",
    "./app/javascript/controllers/*.js",
  ],
  theme: {
    extend: {},
  },
  variants: {
    borderWidth: ["responsive", "last"],
  },
  plugins: [require("@tailwindcss/ui")],
};

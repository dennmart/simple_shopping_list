module.exports = {
  purge: ["./app/views/**/*.html.erb"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};

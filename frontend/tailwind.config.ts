import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"; /* eslint-disable @typescript-eslint/no-explicit-any */
import svgToDataUri from "mini-svg-data-uri";

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // You can extend the theme here
    },
  },
  plugins: [
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("colors")), type: "color" }
      );
    },
    require('@tailwindcss/typography')
  ],
};

export default function manifest() {
  return {
    name: "Curiosity AI",
    short_name: "Curiosity AI",
    description: "Compute AI Infrastructure Platform for Abundant Intelligence",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0611",
    theme_color: "#0A0611",
    icons: [
      {
        src: "/curiosity-ai-icon-purple.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/curiosity-ai-icon-purple.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

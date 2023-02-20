/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "https://github.com/chingu-voyages/v42-bears-team-41/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "rnndtbcwlmjrcrjtgsgb.supabase.co",
      "googleusercontent.com",
      "lh3.googleusercontent.com",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;

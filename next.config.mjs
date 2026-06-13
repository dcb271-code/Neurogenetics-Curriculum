/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The standalone /slides reader route was consolidated into the tabbed
      // module page (which now has a dedicated Slides tab). 308-redirect any
      // old links/bookmarks to the tabbed page.
      {
        source: "/modules/:moduleId/slides",
        destination: "/modules/:moduleId",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

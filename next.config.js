/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the turbopack root to the current directory to avoid workspace detection issues
  turbopack: {
    root: __dirname,
  },
  // Other configuration options can be added here
};

module.exports = nextConfig;
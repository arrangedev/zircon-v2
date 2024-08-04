/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatar.vercel.sh',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
          }
        ],
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
					{ key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
					{ key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
				],
			}
		];
	},
	env:
		{
			SITE_KEY: process.env.SITE_KEY,
			SITE_SECRET: process.env.SITE_SECRET,
			WEDDING_SERVICE_URL: process.env.WEDDING_SERVICE_URL
		}
};

export default nextConfig;

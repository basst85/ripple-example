import type { Serve } from 'bun';
import { supportedRoutes } from './src/routes';

type RouteMatcher = {
	pattern: string;
	regex: RegExp | null;
};

const supportedRouteMatchers: RouteMatcher[] = supportedRoutes.map((pattern) => {
	if (pattern.includes('{')) {
		const regexSource = '^' + pattern.replace(/\{[^}]+\}/g, '[^/]+') + '$';
		return {
			pattern,
			regex: new RegExp(regexSource),
		};
	}

	return {
		pattern,
		regex: null,
	};
});

const matchesSupportedRoute = (pathSegment: string) =>
	supportedRouteMatchers.some(({ pattern, regex }) =>
		regex ? regex.test(pathSegment) : pattern === pathSegment
	);

console.log(`Starting Bun server on http://localhost:${process.env.PORT || 3001}`);

export default {
	port: parseInt(process.env.PORT || '3001'),

	async fetch(req: Request) {
		const url = new URL(req.url);

		// Serve static assets
		if (url.pathname.startsWith('/assets/')) {
			const filePath = `./dist${url.pathname}`;
			return new Response(Bun.file(filePath));
		}

		// Get route from pathname
		let route = null;
		if (url.pathname === '/') {
			route = '/';
		} else {
			const pathSegment = url.pathname.slice(1); // Remove leading slash
			if (matchesSupportedRoute(pathSegment)) {
				route = url.pathname; // Use the full pathname instead of just the segment
			}
		}

		// Return 404 for unsupported routes
		if (route === null) {
			return new Response('404 - Page Not Found', {
				status: 404,
				headers: { 'Content-Type': 'text/plain' },
			});
		}

		// Inject the initial route
		const htmlContent = await Bun.file('./dist/index.html').text();
		const modifiedHtml = htmlContent.replace(
			'\t<head>',
			`\t<head><script>window.__INITIAL_ROUTE__ = "${route}";</script>`
		);

		return new Response(modifiedHtml, {
			headers: { 'Content-Type': 'text/html' },
		});
	},

	error(error: Error) {
		console.error('Server error:', error);
		return new Response('Internal Server Error', { status: 500 });
	},
} satisfies Serve;

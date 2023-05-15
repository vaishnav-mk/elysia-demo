export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.e8b0d981.js","app":"_app/immutable/entry/app.6db311d6.js","imports":["_app/immutable/entry/start.e8b0d981.js","_app/immutable/chunks/index.7d24636c.js","_app/immutable/chunks/singletons.8be3b1f1.js","_app/immutable/entry/app.6db311d6.js","_app/immutable/chunks/index.7d24636c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: () => import('./entries/endpoints/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

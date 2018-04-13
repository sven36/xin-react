
const http = require('http');
const app = require('./server').default;
var server = http.createServer(app.callback());
const IS_DEV = process.env.NODE_ENV !== 'production' ? true : false;
const DEFAULT_PORT = process.env.PORT || 3000;

server.listen(DEFAULT_PORT, error => {
	if (error) {
		console.log(error);
	}
	if (IS_DEV) {
		const openBrowser = require('react-dev-utils/openBrowser');
		openBrowser('http://localhost:3000');
		console.log('🚀 started');
	}
});

if (module.hot) {
	console.log('✅  Server-side HMR Enabled!');

	module.hot.accept('./server', () => {
		console.log('🔁  HMR Reloading `./server`...');
		const newApp = require('./server').default;
		server.close();
		server = http.createServer(newApp.callback());
		server.listen(DEFAULT_PORT);
	});
}


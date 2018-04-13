import routers from './routes/routers';

const koa = require('koa');
const app = new koa();

// 注册路由；
routers(app);

export default app;

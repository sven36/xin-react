


import index from '../controllers/index';
import info from '../controllers/info';
const router = require('koa-router')();


export default function (app) {

    router.get('/', index);
    router.get('/index', index);
    router.get('/info', info);

    app.use(router.routes()).use(router.allowedMethods());
}



import Koa from 'koa';
import App from 'views/index/containers/Home/Home';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';


const app = new Koa();
app.get('/', async (ctx, next) => {
    const markup = renderToString(
        <StaticRouter >
            <App />
        </StaticRouter>
    );
    ctx.body = ctx.render(markup, 'string');
    next();
})


export default app;

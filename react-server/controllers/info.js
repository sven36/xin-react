import Info from 'views/info/routers';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import layout from '../layout/layout';
import fetch from 'node-fetch';

const TEST_URL = 'https://news-at.zhihu.com/api/4/news/latest';

export default async (ctx, next) => {
	next();
	await fetch(TEST_URL)
	.then(data=>data.json())
		.then(data => {
			var bundle = 'info';
		const markup = renderToString(
		<StaticRouter location={ctx.url} context={data}>
			<Info />
		</StaticRouter>
	);
	ctx.body = layout(markup, bundle);
		})

}
import Index from 'views/index/routers';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import layout from '../layout/layout';


export default async (ctx, next) => {
	var bundle = 'index';
	const markup = renderToString(
		<StaticRouter location={ctx.url} context={{}} >
			<Index />
		</StaticRouter>
	);
	ctx.body = layout(markup, bundle);

}
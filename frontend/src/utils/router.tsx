import React from "react";
import { Route } from "react-router";

interface RouterType {
	path: string;
	element: React.ReactNode;
	children?: RouterType[];
}

export const renderRoutes = (routes: RouterType[]) =>
	routes.map(({ path, element, children = [] }) => (
		<Route key={path} element={element} {...(path && { path })}>
			{!!children?.length && <Route>{renderRoutes(children)}</Route>}
		</Route>
	));

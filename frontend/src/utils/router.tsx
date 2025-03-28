import { Route } from "react-router";

interface RouterType {
	path: string;
	element: React.ReactNode;
	children?: React.ReactNode;
}

export const renderRoutes = (routes: RouterType[]) =>
	routes.map(({ path, element, children = [] }) => (
		<Route key={path} exact path={path} element={element}>
			{!!children?.length && <Route>{renderRoutes(children)}</Route>}
		</Route>
	));

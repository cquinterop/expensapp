import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes } from "react-router";
import { renderRoutes } from "@/utils/router";
import routes from "@/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>{renderRoutes(routes)}</Routes>
	</BrowserRouter>
);

import { Routes } from "react-router";
import { renderRoutes } from "@/utils/router";
import ThemeProvider from "@/providers/theme-provider";
import routes from "@/router";
import Header from "@/components/ui/header";
import { Toaster } from "sonner";

const App = () => {
	return (
		<ThemeProvider>
			<Header />
			<main className="container mx-auto page-height">
				<Routes>{renderRoutes(routes)}</Routes>
			</main>
			<Toaster richColors position="top-center" />
		</ThemeProvider>
	);
};

export default App;

import { Routes } from "react-router";
import { renderRoutes } from "@/utils/router";
import routes from "@/router";
import ThemeProvider from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutPage from "@/components/layout";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<LayoutPage>
					<Routes>{renderRoutes(routes)}</Routes>
					<Toaster richColors position="top-center" />
				</LayoutPage>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default App;

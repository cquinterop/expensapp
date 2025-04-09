import { BrowserRouter, Route, Routes } from "react-router";
import ThemeProvider from "@/providers/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ROUTES } from "./constants/routes";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import ProtectedRoute from "./router/protected-route";
import ExpensesPage from "./pages/expenses";
import PrivateRoute from "./router/private-route";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";
import { queryClient } from "@/lib/query-client";
import AuthProvider from "@/providers/auth-provider";
import PublicRoute from "./router/public-route";

const App = () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Routes>
							<Route path={ROUTES.BASE} element={<SignInPage />} />
							<Route element={<PublicRoute />}>
								<Route path={ROUTES.SIGNIN} element={<SignInPage />} />
								<Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
							</Route>
							<Route element={<ProtectedRoute />}>
								<Route path={ROUTES.EXPENSES} element={<ExpensesPage />} />
								<Route element={<PrivateRoute />}>
									<Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
								</Route>
							</Route>
							<Route path={ROUTES.FALLBACK} element={<NotFoundPage />} />
						</Routes>
					</BrowserRouter>
					<Toaster richColors position="top-center" />
				</QueryClientProvider>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;

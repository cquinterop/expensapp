import { type ReactNode } from 'react';
import { ThemeProvider as ReactThemes } from 'next-themes';

export interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return (
		<ReactThemes
			enableSystem
			attribute="class"
			defaultTheme="system"
			themes={['light', 'dark']}
		>
			{children}
		</ReactThemes>
	);
};

export default ThemeProvider;

"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { PortfolioSmoothScroll } from "./smooth-scroll";

export function PortfolioProviders({ children }: { children: ReactNode }): ReactNode {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
			<PortfolioSmoothScroll>{children}</PortfolioSmoothScroll>
		</ThemeProvider>
	);
}

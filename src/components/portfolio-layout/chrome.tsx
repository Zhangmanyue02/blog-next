import { getNavList } from "@/api/services/pageService";
import type { ReactNode } from "react";
import { PortfolioFrame } from "./frame";
import { PortfolioNav } from "./nav";
import { PortfolioPageBackdrop } from "./page-backdrop";
import { PortfolioProviders } from "./providers";
import { SkipToContent } from "./skip-to-content";

export async function PortfolioChrome({ children }: { children: ReactNode }): Promise<ReactNode> {
	const navItems = ((await getNavList()) ?? [])
		.filter((item) => item.slug && item.title)
		.map((item) => ({
			label: item.title as string,
			href: `/${item.slug}`,
		}));

	return (
		<PortfolioProviders>
			<PortfolioFrame />
			<SkipToContent />
			<PortfolioPageBackdrop />
			<PortfolioNav items={navItems} />
			<div id="main-content">{children}</div>
		</PortfolioProviders>
	);
}

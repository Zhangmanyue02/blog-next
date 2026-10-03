import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { BoundSiteEmpty } from "@/components/bound-site-empty";
import { PortfolioChrome } from "@/components/portfolio-layout/chrome";
import { resolveBoundSite } from "@/lib/bound-application";
import "./globals.css";

export const dynamic = "force-dynamic";

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	axes: ["opsz", "SOFT"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "blog-next",
	description: "个人博客前台",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const site = await resolveBoundSite();

	if (!site.ready) {
		return (
			<html lang="en" data-application-type="" data-bound-site={site.reason} className="h-full">
				<body className="min-h-full bg-white text-zinc-900">
					<BoundSiteEmpty reason={site.reason} />
				</body>
			</html>
		);
	}

	if (site.type === "content") {
		return (
			<html
				lang="en"
				data-application-type="content"
				className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
			>
				<body className="min-h-full flex flex-col">{children}</body>
			</html>
		);
	}

	return (
		<html
			lang="en"
			suppressHydrationWarning
			data-application-type="portfolio"
			className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} h-full antialiased`}
		>
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				<PortfolioChrome>{children}</PortfolioChrome>
			</body>
		</html>
	);
}

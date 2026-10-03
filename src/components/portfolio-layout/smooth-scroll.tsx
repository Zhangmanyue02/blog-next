"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

const LENIS_OPTIONS = {
	duration: 1.6,
	easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	orientation: "vertical" as const,
	gestureOrientation: "vertical" as const,
	smoothWheel: true,
	wheelMultiplier: 1,
	touchMultiplier: 2,
};

export function PortfolioSmoothScroll({ children }: { children: ReactNode }): ReactNode {
	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const lenis = new Lenis(LENIS_OPTIONS);

		function raf(time: number): void {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		const rafId = requestAnimationFrame(raf);

		function handleAnchorClick(event: MouseEvent): void {
			const target = event.target as HTMLElement;
			const anchor = target.closest('a[href^="#"]');
			if (!anchor) return;

			const href = anchor.getAttribute("href");
			if (!href || href === "#") return;

			const element = document.querySelector(href);
			if (!element) return;

			event.preventDefault();
			lenis.scrollTo(element as HTMLElement, { offset: -100 });
		}

		document.addEventListener("click", handleAnchorClick);

		return () => {
			document.removeEventListener("click", handleAnchorClick);
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}

"use client";

import type { ReactNode } from "react";
import type { PortfolioAboutIntroViewProps } from "../types";
import { FadeIn } from "./FadeIn";

export function AboutIntroView({ displayName, bio }: PortfolioAboutIntroViewProps): ReactNode {
	const paragraphs = bio
		.split(/\n+/)
		.map((p) => p.trim())
		.filter(Boolean);

	return (
		<section className="mx-auto w-full max-w-[40rem] px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
			<FadeIn delay={0.5}>
				<div className="rounded-[2rem] border border-foreground/5 bg-foreground/[0.015] p-8 sm:p-12 dark:bg-foreground/[0.03]">
					<h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
						Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">{displayName}</span>.
					</h1>
					<div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
						{paragraphs.map((paragraph, index) => (
							<p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
						))}
					</div>
				</div>
			</FadeIn>
		</section>
	);
}

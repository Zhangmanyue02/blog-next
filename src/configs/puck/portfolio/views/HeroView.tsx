"use client";

import { ArrowRight } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import type { ReactNode } from "react";
import type { PortfolioHeroViewProps } from "../types";
import { ContactButton } from "./ContactButton";
import { FadeIn, ScaleUnblur } from "./FadeIn";
import { PortraitMorph } from "./PortraitMorph";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroView({
	greeting,
	headlineLine1,
	headlineLine2,
	tagline,
	portraitUrl,
	portraitHoverUrl,
	portraitAlt,
	email,
	workHref,
	workLabel,
}: PortfolioHeroViewProps): ReactNode {
	return (
		<section className="relative w-full">
			<div className="mx-auto w-full max-w-[1100px] px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
				<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
					<FadeIn className="flex flex-col gap-4">
						<p className="text-[20px] leading-tight font-medium tracking-tight text-foreground">{greeting}</p>
						<h1 className="text-[2.75rem] leading-[1.05] font-medium tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
							<span className="block whitespace-nowrap">{headlineLine1}</span>
							<span className="block whitespace-nowrap">{headlineLine2}</span>
						</h1>
						<p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">{tagline}</p>
						<LayoutGroup>
							<motion.div
								layout
								transition={{ layout: { duration: 0.55, ease: EASE } }}
								className="mt-2 flex flex-wrap items-center gap-3"
							>
								{email ? <ContactButton email={email} /> : null}
								<motion.div layout transition={{ layout: { duration: 0.55, ease: EASE } }}>
									<a
										href={workHref}
										className="portfolio-focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/5 bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
									>
										{workLabel}
										<ArrowRight
											className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
											aria-hidden="true"
										/>
									</a>
								</motion.div>
							</motion.div>
						</LayoutGroup>
					</FadeIn>
					<ScaleUnblur className="flex justify-stretch md:justify-end">
						<div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-foreground/8 bg-background p-1.5 shadow-sm md:max-w-[26.25rem]">
							<div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
								{portraitUrl ? (
									<PortraitMorph srcA={portraitUrl} srcB={portraitHoverUrl || portraitUrl} alt={portraitAlt} />
								) : (
									<div className="h-full w-full bg-foreground/5" />
								)}
							</div>
						</div>
					</ScaleUnblur>
				</div>
			</div>
		</section>
	);
}

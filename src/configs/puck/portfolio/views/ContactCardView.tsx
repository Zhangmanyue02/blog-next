"use client";

import { Mail } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { PortfolioContactCardViewProps, PortfolioSocialViewItem } from "../types";
import { ContactButton } from "./ContactButton";
import { FadeIn } from "./FadeIn";
import { ShaderFlow } from "./ShaderFlow";

const CARD_FADE_MASK =
	"radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";
const EASE = [0.22, 1, 0.36, 1] as const;

function SocialIcon({ item }: { item: PortfolioSocialViewItem }): ReactNode {
	const isExternal = item.href.startsWith("http");
	const isMail = item.href.startsWith("mailto:");
	return (
		<a
			href={item.href}
			aria-label={item.label}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			className="portfolio-focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/8 bg-background text-foreground/70 transition-colors hover:border-foreground/15 hover:text-foreground"
		>
			{isMail && !item.iconUrl ? (
				<Mail className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
			) : item.iconUrl ? (
				<img src={item.iconUrl} alt="" width={14} height={14} aria-hidden="true" className="max-h-[14px] max-w-[14px] object-contain dark:invert" />
			) : (
				<span className="text-[10px] font-medium">{item.label.slice(0, 1)}</span>
			)}
		</a>
	);
}

export function ContactCardView({
	headline,
	body,
	email,
	projectsHref,
	projectsLabel,
	socials,
	footerLine1,
	footerLine2,
	shader = true,
	shaderIterations,
}: PortfolioContactCardViewProps): ReactNode {
	return (
		<section className="mx-auto my-12 w-full max-w-[1100px] px-6 sm:my-20 sm:px-10">
			<FadeIn>
				<div className="relative w-full overflow-hidden rounded-[2rem] border border-foreground/8 bg-background p-1.5 shadow-sm">
					<div className="relative w-full overflow-hidden rounded-[1.6rem]">
						{shader ? (
							<div
								aria-hidden="true"
								className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
								style={{ WebkitMaskImage: CARD_FADE_MASK, maskImage: CARD_FADE_MASK }}
							>
								<ShaderFlow scale={3} brightness={3} iterations={shaderIterations} />
							</div>
						) : null}
						<div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
							<div className="flex flex-col gap-5">
								<h2 className="font-serif text-[2.25rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
									{headline}
								</h2>
								<p className="mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
									{body}
								</p>
								<LayoutGroup>
									<motion.div
										layout
										transition={{ layout: { duration: 0.55, ease: EASE } }}
										className="mt-2 flex flex-wrap items-center gap-3"
									>
										{email ? <ContactButton email={email} /> : null}
										<motion.div layout transition={{ layout: { duration: 0.55, ease: EASE } }}>
											<a
												href={projectsHref}
												className="portfolio-focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/5 bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-md transition-colors"
											>
												{projectsLabel}
												<ArrowRight
													className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
													aria-hidden="true"
												/>
											</a>
										</motion.div>
									</motion.div>
								</LayoutGroup>
							</div>
							<div className="flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border border-foreground/8 bg-background p-6 sm:p-8">
								<div className="flex items-center gap-3 opacity-75">
									{socials.map((item) => (
										<SocialIcon key={`${item.label}-${item.href}`} item={item} />
									))}
								</div>
								<div className="flex flex-col items-center gap-1 text-center">
									<p className="text-[13px] tracking-tight text-foreground/70">{footerLine1}</p>
									<p className="text-[12px] tracking-tight text-foreground/45">{footerLine2}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FadeIn>
		</section>
	);
}

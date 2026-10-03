"use client";

import { ArrowRight, Bot, Compass, Layers, LineChart, Sparkles, Wand2 } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { PortfolioProjectIconKey, PortfolioProjectViewItem, PortfolioProjectsGridViewProps } from "../types";
import { FadeIn } from "./FadeIn";

const PROJECT_ICONS: Record<PortfolioProjectIconKey, ComponentType<{ className?: string }>> = {
	sparkles: Sparkles,
	compass: Compass,
	"line-chart": LineChart,
	"wand-2": Wand2,
	layers: Layers,
	bot: Bot,
};

function ProjectCard({ project, index }: { project: PortfolioProjectViewItem; index: number }): ReactNode {
	const Icon = PROJECT_ICONS[project.iconKey] ?? Sparkles;
	const body = (
		<article className="portfolio-project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
			<header className="flex items-center gap-2.5 px-1 pt-2">
				<span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
					<Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
				</span>
				<span className="text-sm font-medium tracking-tight text-foreground">{project.iconLabel}</span>
			</header>
			<div
				className="relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-foreground/5"
				style={{ aspectRatio: project.imageRatio }}
			>
				<div className="portfolio-project-card__image-inner">
					<img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover" />
				</div>
			</div>
			<div className="flex flex-col gap-2.5 px-1 pb-1">
				<h3 className="text-[20px] leading-[1.2] font-medium tracking-tight text-foreground sm:text-[22px]">
					{project.title}
				</h3>
				<p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">{project.description}</p>
			</div>
			<p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">{project.meta}</p>
		</article>
	);

	return (
		<FadeIn delay={Math.min(index * 0.06, 0.3)} className="mb-6 break-inside-avoid md:mb-7">
			{project.href ? (
				<a href={project.href} className="block text-inherit no-underline">
					{body}
				</a>
			) : (
				body
			)}
		</FadeIn>
	);
}

export function ProjectsGridView({
	items,
	withHeadline = false,
	headline = "My projects",
	subhead = "From playful experiments to thoughtful systems, a look at the work I’m proud to have shipped.",
	viewMoreVisible = false,
	viewMoreHref = "/projects",
	viewMoreLabel = "View all projects",
}: PortfolioProjectsGridViewProps): ReactNode {
	return (
		<section className="relative w-full">
			<div className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
				{withHeadline ? (
					<FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
						<h2 className="font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
							{headline}
						</h2>
						<p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
							{subhead}
						</p>
					</FadeIn>
				) : null}
				<div className="columns-1 gap-6 md:columns-2 md:gap-7">
					{items.map((project, index) => (
						<ProjectCard key={project.id} project={project} index={index} />
					))}
				</div>
				{viewMoreVisible ? (
					<div className="mt-12 flex justify-center sm:mt-16">
						<a
							href={viewMoreHref}
							className="portfolio-focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
						>
							{viewMoreLabel}
							<ArrowRight
								className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
								aria-hidden="true"
							/>
						</a>
					</div>
				) : null}
			</div>
		</section>
	);
}

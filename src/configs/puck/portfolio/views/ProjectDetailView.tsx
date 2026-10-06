"use client";

import type { ReactNode } from "react";
import type { PortfolioProjectDetailViewProps } from "../types";
import { FadeIn } from "./FadeIn";
import "./portfolio-view.css";

function splitBody(body?: string) {
	return (body || "")
		.split(/\n\s*\n/)
		.map((part) => part.trim())
		.filter(Boolean);
}

export function ProjectDetailView({
	title,
	tagline,
	description,
	meta,
	role,
	year,
	duration,
	coverImage,
	coverAlt,
	body,
	stack,
	highlights,
	suite,
	gallery,
	links,
	backHref = "/projects",
	backLabel = "All projects",
}: PortfolioProjectDetailViewProps): ReactNode {
	const facts = [
		role ? { label: "Role", value: role } : null,
		year ? { label: "Year", value: year } : null,
		duration ? { label: "Duration", value: duration } : null,
	].filter(Boolean) as Array<{ label: string; value: string }>;
	const paragraphs = splitBody(body);

	return (
		<article className="relative w-full">
			<div className="mx-auto w-full max-w-[1100px] px-6 pb-24 sm:px-10">
				<FadeIn className="pt-16 sm:pt-24">
					<a
						href={backHref}
						className="portfolio-focus-ring inline-flex text-sm tracking-tight text-foreground/55 transition-colors hover:text-foreground"
					>
						← {backLabel}
					</a>
					<p className="mt-8 font-serif text-[2.6rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-[3.4rem]">
						{title}
					</p>
					{tagline ? (
						<p className="mt-5 max-w-[38ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
							{tagline}
						</p>
					) : null}
					{meta ? <p className="mt-4 text-[13px] tracking-tight text-foreground/50">{meta}</p> : null}
				</FadeIn>

				{coverImage ? (
					<FadeIn delay={0.08} className="mt-10 overflow-hidden rounded-[2rem] bg-foreground/5 ring-1 ring-foreground/8 sm:mt-14">
						<img src={coverImage} alt={coverAlt || title} className="aspect-[16/10] w-full object-cover" />
					</FadeIn>
				) : null}

				<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
					<div className="flex flex-col gap-10">
						{description || paragraphs.length > 0 ? (
							<section>
								<h2 className="text-sm font-medium tracking-tight text-foreground">Overview</h2>
								{description ? (
									<p className="mt-4 text-[16px] leading-[1.65] tracking-tight text-foreground/70">{description}</p>
								) : null}
								{paragraphs.map((paragraph) => (
									<p key={paragraph.slice(0, 24)} className="mt-4 text-[16px] leading-[1.65] tracking-tight text-foreground/70">
										{paragraph}
									</p>
								))}
							</section>
						) : null}

						{highlights.length > 0 ? (
							<section>
								<h2 className="text-sm font-medium tracking-tight text-foreground">What shipped</h2>
								<ol className="mt-4 flex flex-col gap-3">
									{highlights.map((item, index) => (
										<li key={item} className="flex gap-3 text-[15px] leading-[1.5] tracking-tight text-foreground/70">
											<span className="mt-0.5 w-6 shrink-0 text-foreground/35">{String(index + 1).padStart(2, "0")}</span>
											<span>{item}</span>
										</li>
									))}
								</ol>
							</section>
						) : null}

						{suite.length > 0 ? (
							<section>
								<h2 className="text-sm font-medium tracking-tight text-foreground">The suite</h2>
								<div className="mt-4 grid gap-3">
									{suite.map((item) => (
										<div key={item.name} className="rounded-2xl border border-foreground/8 bg-background px-4 py-4">
											<p className="text-[16px] font-medium tracking-tight text-foreground">{item.name}</p>
											{item.role ? <p className="mt-1 text-[12px] tracking-tight text-foreground/45">{item.role}</p> : null}
											{item.description ? (
												<p className="mt-2 text-[14px] leading-normal tracking-tight text-foreground/65">{item.description}</p>
											) : null}
										</div>
									))}
								</div>
							</section>
						) : null}

						{gallery.length > 0 ? (
							<section>
								<h2 className="text-sm font-medium tracking-tight text-foreground">Gallery</h2>
								<div className="mt-4 grid gap-4 sm:grid-cols-2">
									{gallery.map((item) => (
										<figure key={item.url} className="overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-foreground/8">
											<img src={item.url} alt={item.alt || title} className="aspect-[4/3] w-full object-cover" />
										</figure>
									))}
								</div>
							</section>
						) : null}
					</div>

					<aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
						{facts.length > 0 ? (
							<div>
								<h2 className="text-sm font-medium tracking-tight text-foreground">Facts</h2>
								<dl className="mt-4 space-y-3">
									{facts.map((fact) => (
										<div key={fact.label}>
											<dt className="text-[12px] tracking-tight text-foreground/40">{fact.label}</dt>
											<dd className="mt-1 text-[14px] tracking-tight text-foreground">{fact.value}</dd>
										</div>
									))}
								</dl>
							</div>
						) : null}

						{stack.length > 0 ? (
							<div>
								<h2 className="text-sm font-medium tracking-tight text-foreground">Stack</h2>
								<div className="mt-4 flex flex-wrap gap-2">
									{stack.map((item) => (
										<span
											key={item}
											className="rounded-full border border-foreground/10 px-3 py-1 text-[12px] tracking-tight text-foreground/70"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						) : null}

						{links.length > 0 ? (
							<div>
								<h2 className="text-sm font-medium tracking-tight text-foreground">Links</h2>
								<div className="mt-4 flex flex-col gap-2">
									{links.map((item) => (
										<a
											key={`${item.label}-${item.href}`}
											href={item.href}
											className="portfolio-focus-ring text-[14px] tracking-tight text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
										>
											{item.label}
										</a>
									))}
								</div>
							</div>
						) : null}
					</aside>
				</div>
			</div>
		</article>
	);
}

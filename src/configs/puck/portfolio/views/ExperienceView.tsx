"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import type { PortfolioExperienceViewItem } from "../types";

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 64;
const ROW_GAP = 8;

function CompanyLogo({ entry }: { entry: PortfolioExperienceViewItem }): ReactNode {
	const initials = entry.company.charAt(0);
	return (
		<span
			className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-white ring-1 ring-foreground/8 dark:ring-white/10"
			aria-hidden="true"
			style={{
				borderRadius: 14,
				...(entry.logoUrl ? {} : { backgroundColor: entry.brandColor || "#111111" }),
			}}
		>
			{entry.logoUrl ? (
				<img src={entry.logoUrl} alt="" width={24} height={24} className="h-6 w-6" draggable={false} />
			) : (
				<span className="text-[18px] font-semibold tracking-tight text-white">{initials}</span>
			)}
		</span>
	);
}

export function ExperienceView({ items }: { items: PortfolioExperienceViewItem[] }): ReactNode {
	const [open, setOpen] = useState(false);
	const collapsedHeight =
		Math.floor(COLLAPSED_COUNT) * ROW_HEIGHT +
		Math.floor(COLLAPSED_COUNT) * ROW_GAP +
		(COLLAPSED_COUNT % 1) * ROW_HEIGHT;
	const hiddenCount = items.length - Math.floor(COLLAPSED_COUNT);

	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-[15px] font-semibold tracking-tight text-foreground">Experience</h3>
			<div
				className={`relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-foreground/2 px-2 pt-2 sm:px-4 sm:pt-4 dark:bg-foreground/5 ${
					open ? "pb-2 sm:pb-4" : "pb-0"
				}`}
			>
				<motion.div
					className="relative"
					initial={false}
					animate={{ height: open ? "auto" : collapsedHeight }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					style={{ overflow: "hidden" }}
				>
					<ul className="flex flex-col gap-2">
						{items.map((entry) => (
							<li
								key={`${entry.company}-${entry.period}`}
								className="flex items-center gap-4 rounded-3xl border border-foreground/5 bg-background p-2"
								style={{ minHeight: ROW_HEIGHT }}
							>
								<CompanyLogo entry={entry} />
								<div className="flex min-w-0 flex-col">
									<span className="text-[17px] font-semibold tracking-tight text-foreground sm:text-[18px]">
										{entry.company}
									</span>
									<span className="mt-0.5 text-[14px] tracking-tight text-foreground/65 sm:text-[15px]">
										{entry.role}
										<span className="mx-2 text-foreground/30">•</span>
										<span className="text-foreground/55">{entry.period}</span>
									</span>
								</div>
							</li>
						))}
					</ul>
				</motion.div>
				<AnimatePresence>
					{!open && (
						<motion.div
							key="fade"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 bottom-0"
							style={{
								height: ROW_HEIGHT,
								backdropFilter: "blur(10px)",
								WebkitBackdropFilter: "blur(10px)",
								maskImage: "linear-gradient(to bottom, transparent 0%, black 80%)",
								WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 80%)",
							}}
						/>
					)}
				</AnimatePresence>
				{hiddenCount > 0 ? (
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						className={`portfolio-focus-ring flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight text-foreground ${
							open ? "relative mt-4" : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
						}`}
					>
						{open ? "Show less" : `Show ${hiddenCount} more`}
						<motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="inline-flex">
							<ChevronDown className="h-4 w-4" aria-hidden="true" />
						</motion.span>
					</button>
				) : null}
			</div>
		</div>
	);
}

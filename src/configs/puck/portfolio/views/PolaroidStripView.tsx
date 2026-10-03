"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import type { PortfolioPolaroidViewItem } from "../types";
import { DottedPattern } from "./DottedPattern";

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({ photo, index }: { photo: PortfolioPolaroidViewItem; index: number }): ReactNode {
	const ref = useRef<HTMLDivElement | null>(null);
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
	const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
	const tx = useTransform(sx, (v) => `${v}px`);
	const ty = useTransform(sy, (v) => `${v}px`);

	const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const max = 18;
		const k = 0.25;
		mx.set(Math.max(-max, Math.min(max, dx * k)));
		my.set(Math.max(-max, Math.min(max, dy * k)));
	};

	return (
		<motion.div
			ref={ref}
			onPointerMove={handleMove}
			onPointerLeave={() => {
				mx.set(0);
				my.set(0);
			}}
			initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: photo.rotate }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: photo.rotate }}
			transition={{ duration: 0.9, delay: 0.05 + index * 0.08, ease: EASE }}
			style={{ x: tx, y: ty, rotate: photo.rotate }}
			className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-[6px] border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
		>
			{photo.url ? (
				<img src={photo.url} alt={photo.alt || ""} className="h-full w-full rounded-xl object-cover" />
			) : (
				<DottedPattern className="relative h-full w-full overflow-hidden rounded-xl" />
			)}
		</motion.div>
	);
}

export function PolaroidStripView({ items }: { items: PortfolioPolaroidViewItem[] }): ReactNode {
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	if (!mounted) {
		return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
	}

	return (
		<div className="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
			{items.map((photo, i) => (
				<PolaroidCard key={photo.id} photo={photo} index={i} />
			))}
		</div>
	);
}

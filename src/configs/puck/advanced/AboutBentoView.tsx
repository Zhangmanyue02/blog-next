"use client";

import MagicBento from "@/components/react-bits/MagicBento";
import LogoLoop from "@/components/react-bits/LogoLoop";
import type { BentoCardProps } from "@/components/react-bits/magic-bento-data";

export type AboutBentoViewCard = {
	color: string;
	title: string;
	description: string;
	label: string;
};

export type AboutBentoViewLogo = {
	src: string;
	alt: string;
	href?: string;
	title: string;
};

export type AboutBentoViewProps = {
	cards: AboutBentoViewCard[];
	stackLogos: AboutBentoViewLogo[];
	stackLogoHeight: number;
	stackLogoSpeed: number;
	textAutoHide: boolean;
	enableStars: boolean;
	enableSpotlight: boolean;
	enableBorderGlow: boolean;
	enableTilt: boolean;
	clickEffect: boolean;
	enableMagnetism: boolean;
	disableAnimations: boolean;
	spotlightRadius: number;
	particleCount: number;
	glowColor: string;
};

const CARD_BG = "#120F17";
const STACK_CARD_INDEX = 3;

function isStackCard(card: BentoCardProps, index: number) {
	return card.label === "Stack" || index === STACK_CARD_INDEX;
}

export function AboutBentoView({
	cards,
	stackLogos,
	stackLogoHeight,
	stackLogoSpeed,
	textAutoHide,
	enableStars,
	enableSpotlight,
	enableBorderGlow,
	enableTilt,
	clickEffect,
	enableMagnetism,
	disableAnimations,
	spotlightRadius,
	particleCount,
	glowColor,
}: AboutBentoViewProps) {
	const logos = stackLogos
		.filter((item) => item.src)
		.map((item) => ({
			src: item.src,
			alt: item.alt,
			title: item.title,
			...(item.href ? { href: item.href } : {}),
		}));

	return (
		<section className="flex w-full justify-center py-10 md:py-14">
			<MagicBento
				cards={cards}
				textAutoHide={textAutoHide}
				enableStars={enableStars}
				enableSpotlight={enableSpotlight}
				enableBorderGlow={enableBorderGlow}
				enableTilt={enableTilt}
				clickEffect={clickEffect}
				enableMagnetism={enableMagnetism}
				disableAnimations={disableAnimations}
				spotlightRadius={spotlightRadius}
				particleCount={particleCount}
				glowColor={glowColor}
				renderCardBody={(card, index) => {
					if (!isStackCard(card, index) || logos.length === 0) return null;
					return (
						<div className="mt-3 w-full overflow-hidden">
							<LogoLoop
								logos={logos}
								speed={stackLogoSpeed || 70}
								direction="left"
								logoHeight={stackLogoHeight || 28}
								gap={28}
								pauseOnHover
								fadeOut
								fadeOutColor={CARD_BG}
								scaleOnHover
								ariaLabel="技术栈"
							/>
						</div>
					);
				}}
			/>
		</section>
	);
}

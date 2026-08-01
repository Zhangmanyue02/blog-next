import type { ComponentConfig } from "@puckeditor/core";
import MagicBento from "@/components/react-bits/MagicBento";
import { DEFAULT_BENTO_CARDS } from "@/components/react-bits/magic-bento-data";

type YesNo = "yes" | "no";

export type MagicBentoBlockProps = {
	textAutoHide: YesNo;
	enableStars: YesNo;
	enableSpotlight: YesNo;
	enableBorderGlow: YesNo;
	enableTilt: YesNo;
	clickEffect: YesNo;
	enableMagnetism: YesNo;
	disableAnimations: YesNo;
	spotlightRadius: number;
	particleCount: number;
	glowColor: string;
	cards: Array<{
		color: string;
		title: string;
		description: string;
		label: string;
	}>;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const isYes = (value: YesNo) => value === "yes";

export const MagicBentoBlock: ComponentConfig<MagicBentoBlockProps> = {
	label: "Magic Bento",
	fields: {
		cards: {
			type: "array",
			label: "卡片列表",
			arrayFields: {
				label: { type: "text", label: "标签" },
				title: { type: "text", label: "标题" },
				description: { type: "textarea", label: "描述" },
				color: { type: "text", label: "背景色 (hex)" },
			},
			defaultItemProps: {
				color: "#120F17",
				title: "New Card",
				description: "Card description",
				label: "Label",
			},
		},
		glowColor: { type: "text", label: "光晕色 (R, G, B)" },
		spotlightRadius: { type: "number", label: "聚光半径" },
		particleCount: { type: "number", label: "粒子数量" },
		textAutoHide: { ...yesNo, label: "文字自动截断" },
		enableStars: { ...yesNo, label: "粒子星点" },
		enableSpotlight: { ...yesNo, label: "全局聚光" },
		enableBorderGlow: { ...yesNo, label: "边框光晕" },
		enableTilt: { ...yesNo, label: "倾斜跟随" },
		clickEffect: { ...yesNo, label: "点击波纹" },
		enableMagnetism: { ...yesNo, label: "磁吸位移" },
		disableAnimations: { ...yesNo, label: "禁用动画" },
	},
	defaultProps: {
		textAutoHide: "yes",
		enableStars: "yes",
		enableSpotlight: "yes",
		enableBorderGlow: "yes",
		enableTilt: "no",
		clickEffect: "yes",
		enableMagnetism: "yes",
		disableAnimations: "no",
		spotlightRadius: 300,
		particleCount: 12,
		glowColor: "132, 0, 255",
		cards: DEFAULT_BENTO_CARDS.map((card) => ({
			color: card.color || "#120F17",
			title: card.title || "",
			description: card.description || "",
			label: card.label || "",
		})),
	},
	render: ({
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
		cards,
	}) => (
		<section className="flex w-full justify-center py-6">
			<MagicBento
				cards={cards}
				textAutoHide={isYes(textAutoHide)}
				enableStars={isYes(enableStars)}
				enableSpotlight={isYes(enableSpotlight)}
				enableBorderGlow={isYes(enableBorderGlow)}
				enableTilt={isYes(enableTilt)}
				clickEffect={isYes(clickEffect)}
				enableMagnetism={isYes(enableMagnetism)}
				disableAnimations={isYes(disableAnimations)}
				spotlightRadius={spotlightRadius}
				particleCount={particleCount}
				glowColor={glowColor}
			/>
		</section>
	),
};

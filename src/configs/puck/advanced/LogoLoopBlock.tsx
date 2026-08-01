import type { ComponentConfig } from "@puckeditor/core";
import LogoLoop from "@/components/react-bits/LogoLoop";

type YesNo = "yes" | "no";

export type LogoLoopBlockProps = {
	speed: number;
	direction: "left" | "right" | "up" | "down";
	logoHeight: number;
	gap: number;
	pauseOnHover: YesNo;
	fadeOut: YesNo;
	fadeOutColor: string;
	scaleOnHover: YesNo;
	ariaLabel: string;
	paddingY: number;
	logos: Array<{
		src: string;
		alt: string;
		href: string;
		title: string;
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

const DEFAULT_LOGOS: LogoLoopBlockProps["logos"] = [
	{ src: "https://cdn.simpleicons.org/react/61DAFB", alt: "React", href: "", title: "React" },
	{ src: "https://cdn.simpleicons.org/typescript/3178C6", alt: "TypeScript", href: "", title: "TypeScript" },
	{ src: "https://cdn.simpleicons.org/vite/646CFF", alt: "Vite", href: "", title: "Vite" },
	{ src: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js", href: "", title: "Next.js" },
	{ src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", alt: "Tailwind", href: "", title: "Tailwind" },
	{ src: "https://cdn.simpleicons.org/vercel/000000", alt: "Vercel", href: "", title: "Vercel" },
];

export const LogoLoopBlock: ComponentConfig<LogoLoopBlockProps> = {
	label: "Logo Loop",
	fields: {
		logos: {
			type: "array",
			label: "Logo 列表",
			arrayFields: {
				src: { type: "text", label: "图片 URL" },
				alt: { type: "text", label: "Alt" },
				title: { type: "text", label: "标题" },
				href: { type: "text", label: "链接(可空)" },
			},
			defaultItemProps: {
				src: "https://cdn.simpleicons.org/github/181717",
				alt: "Logo",
				title: "Logo",
				href: "",
			},
		},
		speed: { type: "number", label: "速度" },
		direction: {
			type: "select",
			label: "方向",
			options: [
				{ label: "向左", value: "left" },
				{ label: "向右", value: "right" },
				{ label: "向上", value: "up" },
				{ label: "向下", value: "down" },
			],
		},
		logoHeight: { type: "number", label: "Logo 高度(px)" },
		gap: { type: "number", label: "间距(px)" },
		pauseOnHover: { ...yesNo, label: "悬停暂停" },
		fadeOut: { ...yesNo, label: "边缘淡出" },
		fadeOutColor: { type: "text", label: "淡出色(可空)" },
		scaleOnHover: { ...yesNo, label: "悬停放大" },
		ariaLabel: { type: "text", label: "无障碍标签" },
		paddingY: { type: "number", label: "上下内边距(px)" },
	},
	defaultProps: {
		speed: 120,
		direction: "left",
		logoHeight: 36,
		gap: 40,
		pauseOnHover: "yes",
		fadeOut: "yes",
		fadeOutColor: "",
		scaleOnHover: "yes",
		ariaLabel: "Partner logos",
		paddingY: 24,
		logos: DEFAULT_LOGOS,
	},
	render: ({
		logos,
		speed,
		direction,
		logoHeight,
		gap,
		pauseOnHover,
		fadeOut,
		fadeOutColor,
		scaleOnHover,
		ariaLabel,
		paddingY,
	}) => (
		<section className="w-full" style={{ paddingTop: paddingY, paddingBottom: paddingY }}>
			<LogoLoop
				logos={logos
					.filter((item) => item.src)
					.map((item) => ({
						src: item.src,
						alt: item.alt,
						title: item.title,
						...(item.href ? { href: item.href } : {}),
					}))}
				speed={speed}
				direction={direction}
				logoHeight={logoHeight}
				gap={gap}
				pauseOnHover={isYes(pauseOnHover)}
				fadeOut={isYes(fadeOut)}
				fadeOutColor={fadeOutColor || undefined}
				scaleOnHover={isYes(scaleOnHover)}
				ariaLabel={ariaLabel}
			/>
		</section>
	),
};

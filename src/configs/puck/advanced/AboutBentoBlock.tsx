import type { ComponentConfig } from "@puckeditor/core";
import { AboutBentoView } from "./AboutBentoView";

type YesNo = "yes" | "no";

type StackLogo = {
	src: string;
	alt: string;
	href: string;
	title: string;
};

export type AboutBentoBlockProps = {
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
	stackLogoHeight: number;
	stackLogoSpeed: number;
	stackLogos: StackLogo[];
	cards: Array<{
		color: string;
		title: string;
		description: string;
		label: string;
	}>;
};

const CARD_BG = "#120F17";

const DEFAULT_STACK_LOGOS: StackLogo[] = [
	{ src: "https://cdn.simpleicons.org/react/61DAFB", alt: "React", href: "", title: "React" },
	{ src: "https://cdn.simpleicons.org/typescript/3178C6", alt: "TypeScript", href: "", title: "TypeScript" },
	{ src: "https://cdn.simpleicons.org/nestjs/E0234E", alt: "NestJS", href: "", title: "NestJS" },
	{ src: "https://cdn.simpleicons.org/vite/646CFF", alt: "Vite", href: "", title: "Vite" },
	{ src: "https://cdn.simpleicons.org/nodedotjs/5FA04E", alt: "Node.js", href: "", title: "Node.js" },
	{ src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", alt: "Tailwind", href: "", title: "Tailwind" },
];

const DEFAULT_ABOUT_CARDS: AboutBentoBlockProps["cards"] = [
	{
		color: CARD_BG,
		label: "Profile",
		title: "Alvin",
		description: "喜欢把复杂的事讲明白，也喜欢把做过的事留下来。",
	},
	{
		color: CARD_BG,
		label: "Role",
		title: "前端工程师",
		description: "负责界面与交互，对可用性和观感负责。",
	},
	{
		color: CARD_BG,
		label: "Now",
		title: "正在做的事",
		description: "个人站点：博客前台 + 页面编排后台。",
	},
	{
		color: CARD_BG,
		label: "Stack",
		title: "技术栈",
		description: "",
	},
	{
		color: CARD_BG,
		label: "Notes",
		title: "写作",
		description: "工程笔记、工具札记，偶尔也写生活观察。",
	},
	{
		color: CARD_BG,
		label: "Connect",
		title: "联系",
		description: "GitHub 或邮件都可以，欢迎交流。",
	},
	{
		color: CARD_BG,
		label: "Path",
		title: "一路走来",
		description: "从业务页面做起，慢慢走到组件化与内容站点。",
	},
	{
		color: CARD_BG,
		label: "Taste",
		title: "审美偏好",
		description: "克制、留白，少一点装饰，多一点呼吸感。",
	},
	{
		color: CARD_BG,
		label: "Read",
		title: "最近在读",
		description: "设计系统、产品体验，以及把事情写清楚的书。",
	},
	{
		color: CARD_BG,
		label: "Life",
		title: "工作之外",
		description: "散步、咖啡，偶尔拍点胶片。",
	},
];

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const isYes = (value: YesNo) => value === "yes";

export const AboutBentoBlock: ComponentConfig<AboutBentoBlockProps> = {
	label: "关于 Bento",
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
				color: CARD_BG,
				title: "New Card",
				description: "Card description",
				label: "Label",
			},
		},
		stackLogos: {
			type: "array",
			label: "技术栈 Logo（Stack 卡）",
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
		stackLogoHeight: { type: "number", label: "技术栈 Logo 高度(px)" },
		stackLogoSpeed: { type: "number", label: "技术栈滚动速度" },
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
		glowColor: "56, 189, 248",
		stackLogoHeight: 28,
		stackLogoSpeed: 70,
		stackLogos: DEFAULT_STACK_LOGOS,
		cards: DEFAULT_ABOUT_CARDS,
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
		stackLogoHeight,
		stackLogoSpeed,
		stackLogos,
		cards,
	}) => (
		<AboutBentoView
			cards={cards?.length ? cards : DEFAULT_ABOUT_CARDS}
			stackLogos={stackLogos?.length ? stackLogos : DEFAULT_STACK_LOGOS}
			stackLogoHeight={stackLogoHeight}
			stackLogoSpeed={stackLogoSpeed}
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
	),
};

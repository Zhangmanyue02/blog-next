import type { ComponentConfig } from "@puckeditor/core";
import { liveOrPreview, type PuckPortfolioMetadata } from "./types";
import { HeroView } from "./views/HeroView";
import "./views/portfolio-view.css";

export type PortfolioHeroBlockProps = {
	greeting: string;
	headlineLine1: string;
	headlineLine2: string;
	tagline: string;
	portraitUrl: string;
	portraitHoverUrl: string;
	portraitAlt: string;
	email: string;
	workHref: string;
	workLabel: string;
};

export const PortfolioHeroBlock: ComponentConfig<PortfolioHeroBlockProps> = {
	label: "首屏",
	fields: {
		greeting: { type: "text", label: "问候（无活数据时预览）" },
		headlineLine1: { type: "text", label: "标题第一行（预览）" },
		headlineLine2: { type: "text", label: "标题第二行（预览）" },
		tagline: { type: "textarea", label: "简介（预览）" },
		portraitUrl: { type: "text", label: "肖像 URL（预览）" },
		portraitHoverUrl: { type: "text", label: "悬停肖像 URL（预览）" },
		portraitAlt: { type: "text", label: "肖像替代文本" },
		email: { type: "text", label: "邮箱（预览）" },
		workHref: { type: "text", label: "作品 CTA 链接" },
		workLabel: { type: "text", label: "作品 CTA 文案" },
	},
	defaultProps: {
		greeting: "Hey 👋, I’m Josh",
		headlineLine1: "Design engineer &",
		headlineLine2: "AI enthusiast",
		tagline: "Independent engineer focused on interfaces that feel calm, considered, and quietly fast.",
		portraitUrl: "https://placehold.co/800x800?text=Portrait",
		portraitHoverUrl: "https://placehold.co/800x800?text=Wave",
		portraitAlt: "Portrait",
		email: "hello@example.com",
		workHref: "/projects",
		workLabel: "View My Work",
	},
	render: ({ puck, ...preview }) => {
		const profile = (puck.metadata as PuckPortfolioMetadata | undefined)?.profile;
		const editing = Boolean(puck.isEditing);
		return (
			<HeroView
				greeting={liveOrPreview(profile?.greeting, preview.greeting, editing)}
				headlineLine1={liveOrPreview(profile?.headlineLine1, preview.headlineLine1, editing)}
				headlineLine2={liveOrPreview(profile?.headlineLine2, preview.headlineLine2, editing)}
				tagline={liveOrPreview(profile?.tagline, preview.tagline, editing)}
				portraitUrl={liveOrPreview(profile?.portraitUrl, preview.portraitUrl, editing)}
				portraitHoverUrl={liveOrPreview(profile?.portraitHoverUrl, preview.portraitHoverUrl, editing)}
				portraitAlt={preview.portraitAlt}
				email={liveOrPreview(profile?.email, preview.email, editing)}
				workHref={preview.workHref}
				workLabel={preview.workLabel}
			/>
		);
	},
};

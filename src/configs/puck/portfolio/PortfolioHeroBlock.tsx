import type { ComponentConfig } from "@puckeditor/core";
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
		greeting: { type: "text", label: "问候" },
		headlineLine1: { type: "text", label: "标题第一行" },
		headlineLine2: { type: "text", label: "标题第二行" },
		tagline: { type: "textarea", label: "简介" },
		portraitUrl: { type: "text", label: "肖像 URL" },
		portraitHoverUrl: { type: "text", label: "悬停肖像 URL" },
		portraitAlt: { type: "text", label: "肖像替代文本" },
		email: { type: "text", label: "邮箱" },
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
	render: ({ greeting, headlineLine1, headlineLine2, tagline, portraitUrl, portraitHoverUrl, portraitAlt, email, workHref, workLabel }) => {
		return (
			<HeroView
				greeting={greeting}
				headlineLine1={headlineLine1}
				headlineLine2={headlineLine2}
				tagline={tagline}
				portraitUrl={portraitUrl}
				portraitHoverUrl={portraitHoverUrl}
				portraitAlt={portraitAlt}
				email={email}
				workHref={workHref}
				workLabel={workLabel}
			/>
		);
	},
};

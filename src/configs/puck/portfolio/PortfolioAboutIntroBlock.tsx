import type { ComponentConfig } from "@puckeditor/core";
import { AboutIntroView } from "./views/AboutIntroView";
import "./views/portfolio-view.css";

export type PortfolioAboutIntroBlockProps = {
	displayName: string;
	bio: string;
};

export const PortfolioAboutIntroBlock: ComponentConfig<PortfolioAboutIntroBlockProps> = {
	label: "关于简介",
	fields: {
		displayName: { type: "text", label: "姓名" },
		bio: { type: "textarea", label: "简介（空行分段）" },
	},
	defaultProps: {
		displayName: "Josh Mercer",
		bio: "A product designer and frontend engineer passionate about building intuitive, human-centered digital experiences.\n\nCurrently leading design at small product teams shipping software for creative professionals.",
	},
	render: ({ displayName, bio }) => {
		if (!displayName && !bio) return <div className="hidden" />;
		return <AboutIntroView displayName={displayName} bio={bio} />;
	},
};

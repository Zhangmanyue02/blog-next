import type { ComponentConfig } from "@puckeditor/core";
import { liveOrPreview, type PuckPortfolioMetadata } from "./types";
import { AboutIntroView } from "./views/AboutIntroView";
import "./views/portfolio-view.css";

export type PortfolioAboutIntroBlockProps = {
	displayName: string;
	bio: string;
};

export const PortfolioAboutIntroBlock: ComponentConfig<PortfolioAboutIntroBlockProps> = {
	label: "关于简介",
	fields: {
		displayName: { type: "text", label: "姓名（预览）" },
		bio: { type: "textarea", label: "简介（预览，空行分段）" },
	},
	defaultProps: {
		displayName: "Josh Mercer",
		bio: "A product designer and frontend engineer passionate about building intuitive, human-centered digital experiences.\n\nCurrently leading design at small product teams shipping software for creative professionals.",
	},
	render: ({ puck, displayName, bio }) => {
		const profile = (puck.metadata as PuckPortfolioMetadata | undefined)?.profile;
		const editing = Boolean(puck.isEditing);
		const name = liveOrPreview(profile?.displayName, displayName, editing);
		const body = liveOrPreview(profile?.bio, bio, editing);
		if (!name && !body) return <div className="hidden" />;
		return <AboutIntroView displayName={name} bio={body} />;
	},
};

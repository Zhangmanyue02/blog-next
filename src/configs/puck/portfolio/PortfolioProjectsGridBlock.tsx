import type { ComponentConfig } from "@puckeditor/core";
import {
	mapPublicProject,
	sliceProjects,
	type PortfolioProjectViewItem,
	type PuckPortfolioMetadata,
} from "./types";
import { ProjectsGridView } from "./views/ProjectsGridView";
import "./views/portfolio-view.css";

type YesNo = "yes" | "no";

export type PortfolioProjectsGridBlockProps = {
	limit: number;
	withHeadline: YesNo;
	headline: string;
	subhead: string;
	viewMoreVisible: YesNo;
	viewMoreHref: string;
	viewMoreLabel: string;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const PREVIEW_PROJECTS: PortfolioProjectViewItem[] = [
	{
		id: "preview-1",
		iconKey: "sparkles",
		iconLabel: "Loom",
		title: "An AI writing companion that thinks alongside you.",
		description: "A focused writing surface where ideas, edits, and drafts coexist without the chat clutter.",
		meta: "Design Engineer, 2024",
		imageRatio: 752 / 497,
		image: "https://placehold.co/752x497?text=Loom",
		imageAlt: "Loom preview",
	},
	{
		id: "preview-2",
		iconKey: "compass",
		iconLabel: "Atlas Studio",
		title: "A two week brand and product sprint for a creative studio.",
		description: "Identity, marketing site, and a small product surface designed to feel quietly confident.",
		meta: "Product & Brand Designer, 2025",
		imageRatio: 1024 / 768,
		image: "https://placehold.co/1024x768?text=Atlas",
		imageAlt: "Atlas preview",
	},
	{
		id: "preview-3",
		iconKey: "line-chart",
		iconLabel: "Rhythm",
		title: "Calm analytics for indie founders.",
		description: "A weekly digest that turns raw product data into a simple narrative.",
		meta: "Founder & Designer, 2024",
		imageRatio: 1024 / 768,
		image: "https://placehold.co/1024x768?text=Rhythm",
		imageAlt: "Rhythm preview",
	},
	{
		id: "preview-4",
		iconKey: "wand-2",
		iconLabel: "Groove",
		title: "Reimagining the booking flow for a music school.",
		description: "A lesson booking experience that feels like a calendar people actually want to open.",
		meta: "Lead Designer, 2023",
		imageRatio: 1024 / 768,
		image: "https://placehold.co/1024x768?text=Groove",
		imageAlt: "Groove preview",
	},
];

export const PortfolioProjectsGridBlock: ComponentConfig<PortfolioProjectsGridBlockProps> = {
	label: "项目网格",
	fields: {
		limit: { type: "number", label: "数量（0=全部）" },
		withHeadline: { ...yesNo, label: "显示标题" },
		headline: { type: "text", label: "标题" },
		subhead: { type: "textarea", label: "副标题" },
		viewMoreVisible: { ...yesNo, label: "查看更多" },
		viewMoreHref: { type: "text", label: "查看更多链接" },
		viewMoreLabel: { type: "text", label: "查看更多文案" },
	},
	defaultProps: {
		limit: 4,
		withHeadline: "yes",
		headline: "My projects",
		subhead: "From playful experiments to thoughtful systems, a look at the work I’m proud to have shipped.",
		viewMoreVisible: "yes",
		viewMoreHref: "/projects",
		viewMoreLabel: "View all projects",
	},
	render: ({ puck, limit, withHeadline, headline, subhead, viewMoreVisible, viewMoreHref, viewMoreLabel }) => {
		const live = (puck.metadata as PuckPortfolioMetadata | undefined)?.projects;
		const editing = Boolean(puck.isEditing);
		const source = Array.isArray(live)
			? live.map(mapPublicProject)
			: editing
				? PREVIEW_PROJECTS
				: [];
		return (
			<ProjectsGridView
				items={sliceProjects(source, limit)}
				withHeadline={withHeadline === "yes"}
				headline={headline}
				subhead={subhead}
				viewMoreVisible={viewMoreVisible === "yes"}
				viewMoreHref={viewMoreHref || "/projects"}
				viewMoreLabel={viewMoreLabel}
			/>
		);
	},
};

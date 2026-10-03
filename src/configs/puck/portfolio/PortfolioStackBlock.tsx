import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioStackViewItem, PuckPortfolioMetadata, PuckPortfolioStackItem } from "./types";
import { StackView } from "./views/StackView";
import "./views/portfolio-view.css";

const PREVIEW_ITEMS: PortfolioStackViewItem[] = [
	{ label: "Figma", slug: "figma", bg: "#1f1f1f", fg: "#ffffff" },
	{ label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
	{ label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
	{ label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
];

function mapItems(live: PuckPortfolioStackItem[] | null | undefined, editing: boolean): PortfolioStackViewItem[] {
	if (Array.isArray(live)) {
		return live.map((item) => ({
			label: item.label?.trim() || "Stack",
			slug: item.slug?.trim() || "nodedotjs",
			bg: item.bg?.trim() || "#111111",
			fg: item.fg?.trim() || "#ffffff",
			iconUrl: item.iconUrl || undefined,
		}));
	}
	return editing ? PREVIEW_ITEMS : [];
}

export type PortfolioStackBlockProps = Record<string, never>;

export const PortfolioStackBlock: ComponentConfig<PortfolioStackBlockProps> = {
	label: "技术栈",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const editing = Boolean(puck.isEditing);
		const items = mapItems((puck.metadata as PuckPortfolioMetadata | undefined)?.stackItems, editing);
		if (items.length === 0) return <div className="hidden" />;
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<StackView items={items} physicsEnabled={!editing} />
			</div>
		);
	},
};

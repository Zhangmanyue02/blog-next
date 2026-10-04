import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioStackViewItem } from "./types";
import { StackView } from "./views/StackView";
import "./views/portfolio-view.css";

const HARDCODED_ITEMS: PortfolioStackViewItem[] = [
	{ label: "Figma", slug: "figma", bg: "#1f1f1f", fg: "#ffffff" },
	{ label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
	{ label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
	{ label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
];

export type PortfolioStackBlockProps = Record<string, never>;

export const PortfolioStackBlock: ComponentConfig<PortfolioStackBlockProps> = {
	label: "技术栈",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const editing = Boolean(puck.isEditing);
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<StackView items={HARDCODED_ITEMS} physicsEnabled={!editing} />
			</div>
		);
	},
};

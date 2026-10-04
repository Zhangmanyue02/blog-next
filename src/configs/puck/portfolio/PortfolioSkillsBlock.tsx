import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioSkillViewItem } from "./types";
import { SkillsView } from "./views/SkillsView";
import "./views/portfolio-view.css";

const HARDCODED_ITEMS: PortfolioSkillViewItem[] = [
	{ name: "UI/UX Design" },
	{ name: "Design Systems" },
	{ name: "Prototyping & Motion" },
	{ name: "Frontend Development" },
	{ name: "TypeScript & React" },
	{ name: "Interaction Design" },
];

export type PortfolioSkillsBlockProps = Record<string, never>;

export const PortfolioSkillsBlock: ComponentConfig<PortfolioSkillsBlockProps> = {
	label: "技能",
	fields: {},
	defaultProps: {},
	render: () => {
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<SkillsView items={HARDCODED_ITEMS} />
			</div>
		);
	},
};

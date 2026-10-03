import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioSkillViewItem, PuckPortfolioMetadata, PuckPortfolioSkill } from "./types";
import { SkillsView } from "./views/SkillsView";
import "./views/portfolio-view.css";

const PREVIEW_ITEMS: PortfolioSkillViewItem[] = [
	{ name: "UI/UX Design" },
	{ name: "Design Systems" },
	{ name: "Prototyping & Motion" },
	{ name: "Frontend Development" },
	{ name: "TypeScript & React" },
	{ name: "Interaction Design" },
];

function mapItems(live: PuckPortfolioSkill[] | null | undefined, editing: boolean): PortfolioSkillViewItem[] {
	if (Array.isArray(live)) {
		return live.map((item) => ({ name: item.name?.trim() || "Skill" }));
	}
	return editing ? PREVIEW_ITEMS : [];
}

export type PortfolioSkillsBlockProps = Record<string, never>;

export const PortfolioSkillsBlock: ComponentConfig<PortfolioSkillsBlockProps> = {
	label: "技能",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const items = mapItems((puck.metadata as PuckPortfolioMetadata | undefined)?.skills, Boolean(puck.isEditing));
		if (items.length === 0) return <div className="hidden" />;
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<SkillsView items={items} />
			</div>
		);
	},
};

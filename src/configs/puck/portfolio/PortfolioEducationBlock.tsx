import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioEducationViewItem, PuckPortfolioEducation, PuckPortfolioMetadata } from "./types";
import { EducationView } from "./views/EducationView";
import "./views/portfolio-view.css";

const PREVIEW_ITEMS: PortfolioEducationViewItem[] = [
	{ school: "Rhode Island School of Design", degree: "BFA, Graphic Design", period: "2013 – 2017" },
	{ school: "Stanford University", degree: "HCI Certificate, d.school", period: "2018" },
	{ school: "Bruno Simon's Three.js Journey", degree: "WebGL & Shaders", period: "2022" },
];

function mapItems(live: PuckPortfolioEducation[] | null | undefined, editing: boolean): PortfolioEducationViewItem[] {
	if (Array.isArray(live)) {
		return live.map((item) => ({
			school: item.school?.trim() || "School",
			degree: item.degree ?? "",
			period: item.period ?? "",
			logoUrl: item.logoUrl || undefined,
		}));
	}
	return editing ? PREVIEW_ITEMS : [];
}

export type PortfolioEducationBlockProps = Record<string, never>;

export const PortfolioEducationBlock: ComponentConfig<PortfolioEducationBlockProps> = {
	label: "教育",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const items = mapItems((puck.metadata as PuckPortfolioMetadata | undefined)?.educations, Boolean(puck.isEditing));
		if (items.length === 0) return <div className="hidden" />;
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<EducationView items={items} />
			</div>
		);
	},
};

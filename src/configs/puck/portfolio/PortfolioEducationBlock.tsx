import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioEducationViewItem } from "./types";
import { EducationView } from "./views/EducationView";
import "./views/portfolio-view.css";

const HARDCODED_ITEMS: PortfolioEducationViewItem[] = [
	{ school: "Rhode Island School of Design", degree: "BFA, Graphic Design", period: "2013 – 2017" },
	{ school: "Stanford University", degree: "HCI Certificate, d.school", period: "2018" },
	{ school: "Bruno Simon's Three.js Journey", degree: "WebGL & Shaders", period: "2022" },
];

export type PortfolioEducationBlockProps = Record<string, never>;

export const PortfolioEducationBlock: ComponentConfig<PortfolioEducationBlockProps> = {
	label: "教育",
	fields: {},
	defaultProps: {},
	render: () => {
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<EducationView items={HARDCODED_ITEMS} />
			</div>
		);
	},
};

import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioExperienceViewItem } from "./types";
import { ExperienceView } from "./views/ExperienceView";
import "./views/portfolio-view.css";

const HARDCODED_ITEMS: PortfolioExperienceViewItem[] = [
	{ company: "Linear", role: "Senior Design Engineer", period: "Mar 2024 – Present", brandColor: "#5E6AD2" },
	{ company: "Vercel", role: "Product Designer", period: "Aug 2022 – Feb 2024", brandColor: "#0a0a0a" },
	{ company: "Stripe", role: "Design Engineer", period: "Jun 2021 – Jul 2022", brandColor: "#635BFF" },
	{ company: "Figma", role: "UI Engineer", period: "Sep 2019 – May 2021", brandColor: "#A259FF" },
];

export type PortfolioExperienceBlockProps = Record<string, never>;

export const PortfolioExperienceBlock: ComponentConfig<PortfolioExperienceBlockProps> = {
	label: "经历",
	fields: {},
	defaultProps: {},
	render: () => {
		return (
			<div className="mx-auto w-full max-w-[40rem] px-6 pb-6 sm:px-10">
				<ExperienceView items={HARDCODED_ITEMS} />
			</div>
		);
	},
};

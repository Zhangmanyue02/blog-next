import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioPolaroidViewItem } from "./types";
import { PolaroidStripView } from "./views/PolaroidStripView";
import "./views/portfolio-view.css";

const POLAROID_ROTATES = [-8, 6, -4, 7, -6, 5];

const HARDCODED_POLAROIDS: PortfolioPolaroidViewItem[] = POLAROID_ROTATES.map((rotate, index) => ({
	id: `polaroid-${index}`,
	rotate,
}));

export type PortfolioPolaroidStripBlockProps = Record<string, never>;

export const PortfolioPolaroidStripBlock: ComponentConfig<PortfolioPolaroidStripBlockProps> = {
	label: "拍立得",
	fields: {},
	defaultProps: {},
	render: () => {
		return (
			<section className="mx-auto w-full max-w-[78rem] pt-40 sm:pt-56">
				<PolaroidStripView items={HARDCODED_POLAROIDS} />
			</section>
		);
	},
};

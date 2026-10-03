import type { ComponentConfig } from "@puckeditor/core";
import type { PortfolioPolaroidViewItem, PuckPortfolioMetadata } from "./types";
import { PolaroidStripView } from "./views/PolaroidStripView";
import "./views/portfolio-view.css";

const PREVIEW_ROTATES = [-8, 6, -4, 7, -6, 5];

const PREVIEW_POLAROIDS: PortfolioPolaroidViewItem[] = PREVIEW_ROTATES.map((rotate, index) => ({
	id: `preview-${index}`,
	rotate,
}));

function mapPolaroids(
	live: Array<{ url?: string; alt?: string; rotate?: number }> | null | undefined,
	editing: boolean,
): PortfolioPolaroidViewItem[] {
	if (Array.isArray(live)) {
		return live.map((item, index) => ({
			id: `polaroid-${index}`,
			url: item.url,
			alt: item.alt,
			rotate: typeof item.rotate === "number" ? item.rotate : (PREVIEW_ROTATES[index % PREVIEW_ROTATES.length] ?? 0),
		}));
	}
	return editing ? PREVIEW_POLAROIDS : [];
}

export type PortfolioPolaroidStripBlockProps = Record<string, never>;

export const PortfolioPolaroidStripBlock: ComponentConfig<PortfolioPolaroidStripBlockProps> = {
	label: "拍立得",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const polaroids = (puck.metadata as PuckPortfolioMetadata | undefined)?.profile?.polaroids;
		const items = mapPolaroids(polaroids, Boolean(puck.isEditing));
		if (items.length === 0) return <div className="hidden" />;
		return (
			<section className="mx-auto w-full max-w-[78rem] pt-40 sm:pt-56">
				<PolaroidStripView items={items} />
			</section>
		);
	},
};

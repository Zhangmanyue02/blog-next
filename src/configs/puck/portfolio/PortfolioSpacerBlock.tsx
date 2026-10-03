import type { ComponentConfig } from "@puckeditor/core";

export type PortfolioSpacerBlockProps = {
	height: number;
};

export const PortfolioSpacerBlock: ComponentConfig<PortfolioSpacerBlockProps> = {
	label: "间距",
	fields: {
		height: { type: "number", label: "高度(px)" },
	},
	defaultProps: {
		height: 64,
	},
	render: ({ height }) => {
		return <div aria-hidden="true" style={{ height: Math.max(height, 0) }} />;
	},
};

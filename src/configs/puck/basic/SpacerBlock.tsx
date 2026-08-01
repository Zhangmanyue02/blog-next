import type { ComponentConfig } from "@puckeditor/core";

export type SpacerBlockProps = {
	height: number;
};

export const SpacerBlock: ComponentConfig<SpacerBlockProps> = {
	label: "空白间距",
	fields: {
		height: { type: "number", label: "高度(px)" },
	},
	defaultProps: {
		height: 48,
	},
	render: ({ height }) => <div style={{ height }} aria-hidden />,
};

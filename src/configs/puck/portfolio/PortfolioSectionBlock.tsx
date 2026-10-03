import type { ComponentConfig, Slot } from "@puckeditor/core";

export type PortfolioSectionBlockProps = {
	maxWidth: number;
	paddingX: number;
	paddingY: number;
	gap: number;
	items: Slot;
};

export const PortfolioSectionBlock: ComponentConfig<PortfolioSectionBlockProps> = {
	label: "区块",
	fields: {
		maxWidth: { type: "number", label: "最大宽度(px，0=铺满)" },
		paddingX: { type: "number", label: "左右内边距(px)" },
		paddingY: { type: "number", label: "上下内边距(px)" },
		gap: { type: "number", label: "子项间距(px)" },
		items: { type: "slot", label: "子区块" },
	},
	defaultProps: {
		maxWidth: 1100,
		paddingX: 40,
		paddingY: 0,
		gap: 80,
		items: [],
	},
	render: ({ maxWidth, paddingX, paddingY, gap, items: Items }) => {
		return (
			<section className="w-full">
				<Items
					collisionAxis="y"
					minEmptyHeight={80}
					style={{
						display: "flex",
						flexDirection: "column",
						gap,
						width: "100%",
						maxWidth: maxWidth > 0 ? maxWidth : undefined,
						marginLeft: "auto",
						marginRight: "auto",
						paddingLeft: paddingX,
						paddingRight: paddingX,
						paddingTop: paddingY,
						paddingBottom: paddingY,
						boxSizing: "border-box",
					}}
				/>
			</section>
		);
	},
};

import type { ComponentConfig, Slot } from "@puckeditor/core";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

export type SpotlightCardBlockProps = {
	spotlightColor: string;
	backgroundColor: string;
	borderColor: string;
	padding: number;
	minHeight: number;
	borderRadius: number;
	items: Slot;
};

export const SpotlightCardBlock: ComponentConfig<SpotlightCardBlockProps> = {
	label: "Spotlight Card",
	fields: {
		spotlightColor: { type: "text", label: "聚光色 (rgba)" },
		backgroundColor: { type: "text", label: "卡片背景" },
		borderColor: { type: "text", label: "边框色" },
		padding: { type: "number", label: "内边距(px)" },
		minHeight: { type: "number", label: "最小高度(px)" },
		borderRadius: { type: "number", label: "圆角(px)" },
		items: { type: "slot", label: "卡片内容" },
	},
	defaultProps: {
		spotlightColor: "rgba(255, 255, 255, 0.25)",
		backgroundColor: "#171717",
		borderColor: "#262626",
		padding: 32,
		minHeight: 200,
		borderRadius: 24,
		items: [],
	},
	render: ({ spotlightColor, backgroundColor, borderColor, padding, minHeight, borderRadius, items: Items }) => (
		<section className="w-full px-4 py-4">
			<SpotlightCard
				spotlightColor={spotlightColor}
				style={{
					backgroundColor,
					borderColor,
					padding,
					minHeight,
					borderRadius,
				}}
			>
				<Items
					collisionAxis="y"
					minEmptyHeight={Math.max(minHeight - padding * 2, 80)}
					className="relative z-[1]"
					style={{
						minHeight: Math.max(minHeight - padding * 2, 80),
						display: "flex",
						flexDirection: "column",
						gap: 12,
					}}
				/>
			</SpotlightCard>
		</section>
	),
};

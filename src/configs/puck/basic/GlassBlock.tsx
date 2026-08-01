import type { ComponentConfig, Slot } from "@puckeditor/core";
import GlassPanel from "@/components/glass-panel";

type YesNo = "yes" | "no";

export type GlassBlockProps = {
	blur: number;
	saturate: number;
	background: string;
	borderColor: string;
	borderWidth: number;
	borderRadius: number;
	padding: number;
	minHeight: number;
	shadow: YesNo;
	items: Slot;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

export const GlassBlock: ComponentConfig<GlassBlockProps> = {
	label: "毛玻璃",
	fields: {
		background: { type: "text", label: "背景色 (rgba)" },
		borderColor: { type: "text", label: "边框色 (rgba)" },
		borderWidth: { type: "number", label: "边框宽度(px)" },
		borderRadius: { type: "number", label: "圆角(px)" },
		blur: { type: "number", label: "模糊度(px)" },
		saturate: { type: "number", label: "饱和度(%)" },
		padding: { type: "number", label: "内边距(px)" },
		minHeight: { type: "number", label: "最小高度(px)" },
		shadow: { ...yesNo, label: "阴影" },
		items: { type: "slot", label: "内容" },
	},
	defaultProps: {
		background: "rgba(255, 255, 255, 0.12)",
		borderColor: "rgba(255, 255, 255, 0.28)",
		borderWidth: 1,
		borderRadius: 20,
		blur: 16,
		saturate: 160,
		padding: 24,
		minHeight: 160,
		shadow: "yes",
		items: [],
	},
	render: ({
		background,
		borderColor,
		borderWidth,
		borderRadius,
		blur,
		saturate,
		padding,
		minHeight,
		shadow,
		items: Items,
	}) => (
		<section className="w-full px-4 py-4">
			<GlassPanel
				background={background}
				borderColor={borderColor}
				borderWidth={borderWidth}
				borderRadius={borderRadius}
				blur={blur}
				saturate={saturate}
				padding={padding}
				minHeight={minHeight}
				shadow={shadow === "yes"}
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
			</GlassPanel>
		</section>
	),
};

import type { ComponentConfig, Slot } from "@puckeditor/core";
import Lightfall from "@/components/react-bits/Lightfall";

export type LightfallBackgroundBlockProps = {
	color1: string;
	color2: string;
	color3: string;
	backgroundColor: string;
	speed: number;
	streakCount: number;
	streakWidth: number;
	streakLength: number;
	glow: number;
	density: number;
	zoom: number;
	backgroundGlow: number;
	opacity: number;
	mouseInteraction: "yes" | "no";
	minHeight: number;
	padding: number;
	items: Slot;
};

export const LightfallBackgroundBlock: ComponentConfig<LightfallBackgroundBlockProps> = {
	label: "Lightfall",
	fields: {
		color1: { type: "text", label: "光带色 1 (hex)" },
		color2: { type: "text", label: "光带色 2 (hex)" },
		color3: { type: "text", label: "光带色 3 (hex)" },
		backgroundColor: { type: "text", label: "底色 (hex)" },
		speed: { type: "number", label: "下落速度" },
		streakCount: { type: "number", label: "光带层数(1-16)" },
		streakWidth: { type: "number", label: "光带宽度" },
		streakLength: { type: "number", label: "光带长度" },
		glow: { type: "number", label: "发光强度" },
		density: { type: "number", label: "密度" },
		zoom: { type: "number", label: "景深缩放" },
		backgroundGlow: { type: "number", label: "背景辉光" },
		opacity: { type: "number", label: "不透明度" },
		mouseInteraction: {
			type: "radio",
			label: "鼠标光晕",
			options: [
				{ label: "开", value: "yes" },
				{ label: "关", value: "no" },
			],
		},
		minHeight: { type: "number", label: "最小高度(px)" },
		padding: { type: "number", label: "内边距(px)" },
		items: { type: "slot", label: "内容区" },
	},
	defaultProps: {
		color1: "#A6C8FF",
		color2: "#5227FF",
		color3: "#FF9FFC",
		backgroundColor: "#0A29FF",
		speed: 0.5,
		streakCount: 2,
		streakWidth: 1,
		streakLength: 1,
		glow: 1,
		density: 0.6,
		zoom: 3,
		backgroundGlow: 0.5,
		opacity: 1,
		mouseInteraction: "yes",
		minHeight: 720,
		padding: 24,
		items: [],
	},
	render: ({
		color1,
		color2,
		color3,
		backgroundColor,
		speed,
		streakCount,
		streakWidth,
		streakLength,
		glow,
		density,
		zoom,
		backgroundGlow,
		opacity,
		mouseInteraction,
		minHeight,
		padding,
		items: Items,
	}) => (
		<section className="relative w-full overflow-hidden" style={{ minHeight, backgroundColor }}>
			<div className="pointer-events-none absolute inset-0" aria-hidden>
				<Lightfall
					colors={[color1, color2, color3]}
					backgroundColor={backgroundColor}
					speed={speed}
					streakCount={streakCount}
					streakWidth={streakWidth}
					streakLength={streakLength}
					glow={glow}
					density={density}
					zoom={zoom}
					backgroundGlow={backgroundGlow}
					opacity={opacity}
					mouseInteraction={mouseInteraction === "yes"}
				/>
			</div>
			<Items
				collisionAxis="y"
				minEmptyHeight={Math.max(minHeight - padding * 2, 80)}
				style={{
					position: "relative",
					zIndex: 1,
					display: "flex",
					flexDirection: "column",
					minHeight,
					padding: `${padding}px`,
					boxSizing: "border-box",
				}}
			/>
		</section>
	),
};

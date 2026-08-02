import type { ComponentConfig, Slot } from "@puckeditor/core";
import LineWaves from "@/components/react-bits/LineWaves";

type YesNo = "yes" | "no";

export type LineWavesBlockProps = {
	speed: number;
	innerLineCount: number;
	outerLineCount: number;
	warpIntensity: number;
	rotation: number;
	edgeFadeWidth: number;
	colorCycleSpeed: number;
	brightness: number;
	color1: string;
	color2: string;
	color3: string;
	enableMouseInteraction: YesNo;
	mouseInfluence: number;
	backgroundColor: string;
	fullscreen: YesNo;
	minHeight: number;
	padding: number;
	items: Slot;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

export const LineWavesBlock: ComponentConfig<LineWavesBlockProps> = {
	label: "Line Waves",
	fields: {
		color1: { type: "text", label: "颜色 1 (hex)" },
		color2: { type: "text", label: "颜色 2 (hex)" },
		color3: { type: "text", label: "颜色 3 (hex)" },
		backgroundColor: { type: "text", label: "底色 (hex)" },
		speed: { type: "number", label: "速度" },
		innerLineCount: { type: "number", label: "内线数量" },
		outerLineCount: { type: "number", label: "外线数量" },
		warpIntensity: { type: "number", label: "扭曲强度" },
		rotation: { type: "number", label: "旋转角(°)" },
		edgeFadeWidth: { type: "number", label: "边缘淡出" },
		colorCycleSpeed: { type: "number", label: "色循环速度" },
		brightness: { type: "number", label: "亮度" },
		mouseInfluence: { type: "number", label: "鼠标影响" },
		enableMouseInteraction: { ...yesNo, label: "鼠标交互" },
		fullscreen: { ...yesNo, label: "全屏高度" },
		minHeight: { type: "number", label: "最小高度(px，非全屏时)" },
		padding: { type: "number", label: "内边距(px)" },
		items: { type: "slot", label: "内容区" },
	},
	defaultProps: {
		speed: 0.3,
		innerLineCount: 32,
		outerLineCount: 36,
		warpIntensity: 1,
		rotation: -45,
		edgeFadeWidth: 0,
		colorCycleSpeed: 1,
		brightness: 0.2,
		color1: "#ffffff",
		color2: "#ffffff",
		color3: "#ffffff",
		enableMouseInteraction: "yes",
		mouseInfluence: 2,
		backgroundColor: "#0a0a0a",
		fullscreen: "no",
		minHeight: 560,
		padding: 24,
		items: [],
	},
	render: ({
		speed,
		innerLineCount,
		outerLineCount,
		warpIntensity,
		rotation,
		edgeFadeWidth,
		colorCycleSpeed,
		brightness,
		color1,
		color2,
		color3,
		enableMouseInteraction,
		mouseInfluence,
		backgroundColor,
		fullscreen,
		minHeight,
		padding,
		items: Items,
	}) => {
		const isFullscreen = fullscreen === "yes";
		const sectionHeight = isFullscreen ? "100dvh" : minHeight;
		const contentMinHeight = isFullscreen ? "100dvh" : minHeight;

		return (
			<section
				className="relative w-full overflow-hidden"
				style={{
					minHeight: sectionHeight,
					height: isFullscreen ? "100dvh" : undefined,
					backgroundColor,
				}}
			>
				<div className="pointer-events-none absolute inset-0" aria-hidden>
					<LineWaves
						speed={speed}
						innerLineCount={innerLineCount}
						outerLineCount={outerLineCount}
						warpIntensity={warpIntensity}
						rotation={rotation}
						edgeFadeWidth={edgeFadeWidth}
						colorCycleSpeed={colorCycleSpeed}
						brightness={brightness}
						color1={color1}
						color2={color2}
						color3={color3}
						enableMouseInteraction={enableMouseInteraction === "yes"}
						mouseInfluence={mouseInfluence}
					/>
				</div>
				<Items
					collisionAxis="y"
					minEmptyHeight={isFullscreen ? 560 : Math.max(minHeight - padding * 2, 80)}
					style={{
						position: "relative",
						zIndex: 1,
						display: "flex",
						flexDirection: "column",
						minHeight: contentMinHeight,
						height: isFullscreen ? "100%" : undefined,
						padding: `${padding}px`,
						boxSizing: "border-box",
					}}
				/>
			</section>
		);
	},
};

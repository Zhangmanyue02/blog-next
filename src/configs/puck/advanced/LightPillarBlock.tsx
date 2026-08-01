import type { CSSProperties } from "react";
import type { ComponentConfig, Slot } from "@puckeditor/core";
import LightPillar from "@/components/react-bits/LightPillar";

type YesNo = "yes" | "no";

export type LightPillarBlockProps = {
	topColor: string;
	bottomColor: string;
	intensity: number;
	rotationSpeed: number;
	interactive: YesNo;
	glowAmount: number;
	pillarWidth: number;
	pillarHeight: number;
	noiseIntensity: number;
	pillarRotation: number;
	quality: "low" | "medium" | "high";
	mixBlendMode: string;
	backgroundColor: string;
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

export const LightPillarBlock: ComponentConfig<LightPillarBlockProps> = {
	label: "Light Pillar",
	fields: {
		topColor: { type: "text", label: "顶部色 (hex)" },
		bottomColor: { type: "text", label: "底部色 (hex)" },
		backgroundColor: { type: "text", label: "底色 (hex)" },
		intensity: { type: "number", label: "强度" },
		rotationSpeed: { type: "number", label: "旋转速度" },
		glowAmount: { type: "number", label: "辉光" },
		pillarWidth: { type: "number", label: "柱宽" },
		pillarHeight: { type: "number", label: "柱高缩放" },
		noiseIntensity: { type: "number", label: "噪点" },
		pillarRotation: { type: "number", label: "柱旋转角(°)" },
		quality: {
			type: "select",
			label: "画质",
			options: [
				{ label: "低", value: "low" },
				{ label: "中", value: "medium" },
				{ label: "高", value: "high" },
			],
		},
		mixBlendMode: {
			type: "select",
			label: "混合模式",
			options: [
				{ label: "screen", value: "screen" },
				{ label: "normal", value: "normal" },
				{ label: "lighten", value: "lighten" },
				{ label: "plus-lighter", value: "plus-lighter" },
			],
		},
		interactive: { ...yesNo, label: "鼠标交互" },
		minHeight: { type: "number", label: "最小高度(px)" },
		padding: { type: "number", label: "内边距(px)" },
		items: { type: "slot", label: "内容区" },
	},
	defaultProps: {
		topColor: "#5227FF",
		bottomColor: "#FF9FFC",
		backgroundColor: "#050508",
		intensity: 1,
		rotationSpeed: 0.3,
		interactive: "no",
		glowAmount: 0.005,
		pillarWidth: 3,
		pillarHeight: 0.4,
		noiseIntensity: 0.5,
		pillarRotation: 0,
		quality: "high",
		mixBlendMode: "screen",
		minHeight: 720,
		padding: 24,
		items: [],
	},
	render: ({
		topColor,
		bottomColor,
		backgroundColor,
		intensity,
		rotationSpeed,
		interactive,
		glowAmount,
		pillarWidth,
		pillarHeight,
		noiseIntensity,
		pillarRotation,
		quality,
		mixBlendMode,
		minHeight,
		padding,
		items: Items,
	}) => (
		<section className="relative w-full overflow-hidden" style={{ minHeight, backgroundColor }}>
			<div className="pointer-events-none absolute inset-0" aria-hidden>
				<LightPillar
					topColor={topColor}
					bottomColor={bottomColor}
					intensity={intensity}
					rotationSpeed={rotationSpeed}
					interactive={interactive === "yes"}
					glowAmount={glowAmount}
					pillarWidth={pillarWidth}
					pillarHeight={pillarHeight}
					noiseIntensity={noiseIntensity}
					pillarRotation={pillarRotation}
					quality={quality}
					mixBlendMode={mixBlendMode as CSSProperties["mixBlendMode"]}
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

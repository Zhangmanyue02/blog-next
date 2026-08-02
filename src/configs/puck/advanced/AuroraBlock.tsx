import type { ComponentConfig, Slot } from "@puckeditor/core";
import Aurora from "@/components/react-bits/Aurora";

type YesNo = "yes" | "no";

export type AuroraBlockProps = {
	color1: string;
	color2: string;
	color3: string;
	amplitude: number;
	blend: number;
	speed: number;
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

export const AuroraBlock: ComponentConfig<AuroraBlockProps> = {
	label: "Aurora",
	fields: {
		color1: { type: "text", label: "色带 1 (hex)" },
		color2: { type: "text", label: "色带 2 (hex)" },
		color3: { type: "text", label: "色带 3 (hex)" },
		backgroundColor: { type: "text", label: "底色 (hex)" },
		amplitude: { type: "number", label: "振幅" },
		blend: { type: "number", label: "混合" },
		speed: { type: "number", label: "速度" },
		fullscreen: { ...yesNo, label: "全屏高度" },
		minHeight: { type: "number", label: "最小高度(px，非全屏时)" },
		padding: { type: "number", label: "内边距(px)" },
		items: { type: "slot", label: "内容区" },
	},
	defaultProps: {
		color1: "#5227FF",
		color2: "#7cff67",
		color3: "#5227FF",
		backgroundColor: "#020617",
		amplitude: 1,
		blend: 0.5,
		speed: 1,
		fullscreen: "no",
		minHeight: 560,
		padding: 24,
		items: [],
	},
	render: ({
		color1,
		color2,
		color3,
		backgroundColor,
		amplitude,
		blend,
		speed,
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
					<Aurora colorStops={[color1, color2, color3]} amplitude={amplitude} blend={blend} speed={speed} />
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

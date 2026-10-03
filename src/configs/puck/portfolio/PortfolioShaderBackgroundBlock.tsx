import type { ComponentConfig } from "@puckeditor/core";
import { EDITOR_SHADER_ITERATIONS } from "./types";
import { ShaderFlow } from "./views/ShaderFlow";
import "./views/portfolio-view.css";

export type PortfolioShaderBackgroundBlockProps = {
	height: number;
	brightness: number;
	iterations: number;
	scale: number;
	flowSpeedX: number;
	flowSpeedY: number;
	opacity: number;
};

export const PortfolioShaderBackgroundBlock: ComponentConfig<PortfolioShaderBackgroundBlockProps> = {
	label: "着色背景",
	fields: {
		height: { type: "number", label: "高度(px)" },
		brightness: { type: "number", label: "亮度" },
		iterations: { type: "number", label: "迭代" },
		scale: { type: "number", label: "缩放" },
		flowSpeedX: { type: "number", label: "流速 X" },
		flowSpeedY: { type: "number", label: "流速 Y" },
		opacity: { type: "number", label: "不透明度(0-1)" },
	},
	defaultProps: {
		height: 900,
		brightness: 3,
		iterations: 10,
		scale: 6,
		flowSpeedX: 0,
		flowSpeedY: 0.1,
		opacity: 0.5,
	},
	render: ({ puck, height, brightness, iterations, scale, flowSpeedX, flowSpeedY, opacity }) => {
		const resolvedIterations = puck.isEditing
			? Math.min(Math.max(1, Math.round(iterations)), EDITOR_SHADER_ITERATIONS)
			: Math.max(1, Math.round(iterations));
		return (
			<div
				aria-hidden="true"
				className="pointer-events-none relative -z-10 w-full overflow-hidden"
				style={{ height: Math.max(height, 0) }}
			>
				<div className="absolute inset-0" style={{ opacity: Math.min(Math.max(opacity, 0), 1) }}>
					<ShaderFlow
						brightness={brightness}
						iterations={resolvedIterations}
						scale={scale}
						flowSpeed={[flowSpeedX, flowSpeedY]}
					/>
				</div>
			</div>
		);
	},
};

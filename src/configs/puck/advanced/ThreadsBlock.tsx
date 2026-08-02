import type { ComponentConfig, Slot } from "@puckeditor/core";
import Threads from "@/components/react-bits/Threads";

type YesNo = "yes" | "no";

export type ThreadsBlockProps = {
	color: string;
	amplitude: number;
	distance: number;
	enableMouseInteraction: YesNo;
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

const hexToRgbNorm = (hex: string): [number, number, number] => {
	const raw = hex.replace("#", "").trim();
	const full =
		raw.length === 3
			? raw
					.split("")
					.map((char) => `${char}${char}`)
					.join("")
			: raw;
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return [1, 1, 1];
	const value = Number.parseInt(full, 16);
	return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
};

export const ThreadsBlock: ComponentConfig<ThreadsBlockProps> = {
	label: "Threads",
	fields: {
		color: { type: "text", label: "线条色 (hex)" },
		backgroundColor: { type: "text", label: "底色 (hex)" },
		amplitude: { type: "number", label: "振幅" },
		distance: { type: "number", label: "线距" },
		enableMouseInteraction: { ...yesNo, label: "鼠标交互" },
		fullscreen: { ...yesNo, label: "全屏高度" },
		minHeight: { type: "number", label: "最小高度(px，非全屏时)" },
		padding: { type: "number", label: "内边距(px)" },
		items: { type: "slot", label: "内容区" },
	},
	defaultProps: {
		color: "#ffffff",
		backgroundColor: "#0a0a0a",
		amplitude: 1,
		distance: 0,
		enableMouseInteraction: "yes",
		fullscreen: "no",
		minHeight: 560,
		padding: 24,
		items: [],
	},
	render: ({
		color,
		backgroundColor,
		amplitude,
		distance,
		enableMouseInteraction,
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
					<Threads
						color={hexToRgbNorm(color)}
						amplitude={amplitude}
						distance={distance}
						enableMouseInteraction={enableMouseInteraction === "yes"}
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

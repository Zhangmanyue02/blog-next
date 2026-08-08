import type { ComponentConfig } from "@puckeditor/core";
import TextType from "@/components/react-bits/TextType";

type YesNo = "yes" | "no";

export type TextTypeBlockProps = {
	sentences: Array<{ text: string; color: string }>;
	as: "div" | "span" | "p" | "h1" | "h2" | "h3";
	typingSpeed: number;
	deletingSpeed: number;
	pauseDuration: number;
	initialDelay: number;
	loop: YesNo;
	showCursor: YesNo;
	hideCursorWhileTyping: YesNo;
	cursorCharacter: string;
	cursorBlinkDuration: number;
	startOnVisible: YesNo;
	reverseMode: YesNo;
	variableSpeed: YesNo;
	variableSpeedMin: number;
	variableSpeedMax: number;
	className: string;
	fontSize: number;
	paddingY: number;
	textAlign: "left" | "center" | "right";
	/** 占满父级剩余高度（flex-1） */
	fillRemaining: YesNo;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const isYes = (value: YesNo) => value === "yes";

export const TextTypeBlock: ComponentConfig<TextTypeBlockProps> = {
	label: "Text Type",
	fields: {
		sentences: {
			type: "array",
			label: "文案列表",
			arrayFields: {
				text: { type: "textarea", label: "文本" },
				color: { type: "text", label: "颜色(可空)" },
			},
			defaultItemProps: {
				text: "Hello World",
				color: "",
			},
		},
		as: {
			type: "select",
			label: "标签",
			options: [
				{ label: "div", value: "div" },
				{ label: "span", value: "span" },
				{ label: "p", value: "p" },
				{ label: "h1", value: "h1" },
				{ label: "h2", value: "h2" },
				{ label: "h3", value: "h3" },
			],
		},
		typingSpeed: { type: "number", label: "打字速度(ms)" },
		deletingSpeed: { type: "number", label: "删除速度(ms)" },
		pauseDuration: { type: "number", label: "停顿(ms)" },
		initialDelay: { type: "number", label: "初始延迟(ms)" },
		loop: { ...yesNo, label: "循环" },
		showCursor: { ...yesNo, label: "显示光标" },
		hideCursorWhileTyping: { ...yesNo, label: "打字时隐藏光标" },
		cursorCharacter: { type: "text", label: "光标字符" },
		cursorBlinkDuration: { type: "number", label: "光标闪烁(s)" },
		startOnVisible: { ...yesNo, label: "进入视口再开始" },
		reverseMode: { ...yesNo, label: "反向打字" },
		variableSpeed: { ...yesNo, label: "变速打字" },
		variableSpeedMin: { type: "number", label: "变速最小(ms)" },
		variableSpeedMax: { type: "number", label: "变速最大(ms)" },
		fontSize: { type: "number", label: "字号(px)" },
		textAlign: {
			type: "radio",
			label: "对齐",
			options: [
				{ label: "左", value: "left" },
				{ label: "中", value: "center" },
				{ label: "右", value: "right" },
			],
		},
		className: { type: "text", label: "额外 class" },
		paddingY: { type: "number", label: "上下内边距(px)" },
		fillRemaining: { ...yesNo, label: "占满剩余高度" },
	},
	defaultProps: {
		sentences: [
			{ text: "Build faster with React Bits", color: "" },
			{ text: "Type. Delete. Repeat.", color: "#38bdf8" },
			{ text: "Make your landing page come alive.", color: "" },
		],
		as: "h2",
		typingSpeed: 50,
		deletingSpeed: 30,
		pauseDuration: 2000,
		initialDelay: 0,
		loop: "yes",
		showCursor: "yes",
		hideCursorWhileTyping: "no",
		cursorCharacter: "|",
		cursorBlinkDuration: 0.5,
		startOnVisible: "yes",
		reverseMode: "no",
		variableSpeed: "no",
		variableSpeedMin: 40,
		variableSpeedMax: 100,
		className: "font-semibold",
		fontSize: 36,
		paddingY: 24,
		textAlign: "center",
		fillRemaining: "yes",
	},
	render: ({
		sentences,
		as,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		initialDelay,
		loop,
		showCursor,
		hideCursorWhileTyping,
		cursorCharacter,
		cursorBlinkDuration,
		startOnVisible,
		reverseMode,
		variableSpeed,
		variableSpeedMin,
		variableSpeedMax,
		className,
		fontSize,
		paddingY,
		textAlign,
		fillRemaining,
	}) => {
		const pairs = sentences.filter((item) => item.text.trim());
		const lines = pairs.map((item) => item.text);
		const textColors = pairs.map((item) => item.color);
		// 缺省/旧数据按「占满」处理
		const shouldFill = (fillRemaining ?? "yes") === "yes";

		return (
			<section
				className={`w-full px-4${shouldFill ? " flex min-h-0 flex-1 flex-col justify-center" : ""}`}
				style={{ paddingTop: paddingY, paddingBottom: paddingY, textAlign }}
			>
				<TextType
					text={lines.length > 0 ? lines : [""]}
					as={as}
					typingSpeed={typingSpeed}
					deletingSpeed={deletingSpeed}
					pauseDuration={pauseDuration}
					initialDelay={initialDelay}
					loop={isYes(loop)}
					showCursor={isYes(showCursor)}
					hideCursorWhileTyping={isYes(hideCursorWhileTyping)}
					cursorCharacter={cursorCharacter || "|"}
					cursorBlinkDuration={cursorBlinkDuration}
					startOnVisible={isYes(startOnVisible)}
					reverseMode={isYes(reverseMode)}
					variableSpeed={isYes(variableSpeed) ? { min: variableSpeedMin, max: variableSpeedMax } : undefined}
					textColors={textColors}
					className={className}
					style={{ fontSize }}
				/>
			</section>
		);
	},
};

import type { ComponentConfig } from "@puckeditor/core";

export type HeadingBlockProps = {
	text: string;
	level: "h1" | "h2" | "h3" | "h4";
	align: "left" | "center" | "right";
};

const levelClass: Record<HeadingBlockProps["level"], string> = {
	h1: "text-4xl md:text-5xl font-bold tracking-tight",
	h2: "text-3xl md:text-4xl font-bold tracking-tight",
	h3: "text-2xl md:text-3xl font-semibold",
	h4: "text-xl md:text-2xl font-semibold",
};

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
	label: "标题",
	fields: {
		text: { type: "text", label: "标题文字" },
		level: {
			type: "select",
			label: "级别",
			options: [
				{ label: "H1", value: "h1" },
				{ label: "H2", value: "h2" },
				{ label: "H3", value: "h3" },
				{ label: "H4", value: "h4" },
			],
		},
		align: {
			type: "radio",
			label: "对齐",
			options: [
				{ label: "左", value: "left" },
				{ label: "中", value: "center" },
				{ label: "右", value: "right" },
			],
		},
	},
	defaultProps: {
		text: "章节标题",
		level: "h2",
		align: "left",
	},
	render: ({ text, level, align }) => {
		const Tag = level;
		return (
			<Tag className={levelClass[level]} style={{ textAlign: align }}>
				{text}
			</Tag>
		);
	},
};

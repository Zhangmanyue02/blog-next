import type { ComponentConfig } from "@puckeditor/core";

export type TextBlockProps = {
	content: string;
	size: "sm" | "base" | "lg";
	align: "left" | "center" | "right";
};

const sizeClass: Record<TextBlockProps["size"], string> = {
	sm: "text-sm leading-relaxed",
	base: "text-base leading-relaxed",
	lg: "text-lg leading-relaxed",
};

export const TextBlock: ComponentConfig<TextBlockProps> = {
	label: "正文",
	fields: {
		content: { type: "textarea", label: "内容" },
		size: {
			type: "select",
			label: "字号",
			options: [
				{ label: "小", value: "sm" },
				{ label: "中", value: "base" },
				{ label: "大", value: "lg" },
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
		content: "在这里写下一段文字，记录你的想法、笔记或故事。",
		size: "base",
		align: "left",
	},
	render: ({ content, size, align }) => (
		<div className="w-full px-6 py-2">
			<div className="max-w-3xl mx-auto">
				<p className={`text-muted-foreground whitespace-pre-wrap ${sizeClass[size]}`} style={{ textAlign: align }}>
					{content}
				</p>
			</div>
		</div>
	),
};

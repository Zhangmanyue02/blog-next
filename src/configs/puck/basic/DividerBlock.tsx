import type { ComponentConfig } from "@puckeditor/core";

export type DividerBlockProps = {
	style: "solid" | "dashed" | "dotted";
	spacing: "sm" | "md" | "lg";
};

const spacingClass: Record<DividerBlockProps["spacing"], string> = {
	sm: "my-4",
	md: "my-8",
	lg: "my-12",
};

export const DividerBlock: ComponentConfig<DividerBlockProps> = {
	label: "分割线",
	fields: {
		style: {
			type: "select",
			label: "样式",
			options: [
				{ label: "实线", value: "solid" },
				{ label: "虚线", value: "dashed" },
				{ label: "点线", value: "dotted" },
			],
		},
		spacing: {
			type: "select",
			label: "间距",
			options: [
				{ label: "小", value: "sm" },
				{ label: "中", value: "md" },
				{ label: "大", value: "lg" },
			],
		},
	},
	defaultProps: {
		style: "solid",
		spacing: "md",
	},
	render: ({ style, spacing }) => (
		<div className={`w-full px-6 ${spacingClass[spacing]}`}>
			<hr className="max-w-3xl mx-auto border-border" style={{ borderStyle: style }} />
		</div>
	),
};

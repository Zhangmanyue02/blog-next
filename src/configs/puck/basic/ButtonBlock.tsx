import type { ComponentConfig } from "@puckeditor/core";

export type ButtonBlockProps = {
	label: string;
	href: string;
	variant: "primary" | "outline" | "ghost";
	align: "left" | "center" | "right";
};

const variantClass: Record<ButtonBlockProps["variant"], string> = {
	primary: "bg-primary text-primary-foreground hover:opacity-90",
	outline: "border border-border bg-transparent hover:bg-muted",
	ghost: "bg-transparent hover:bg-muted text-foreground",
};

const alignClass: Record<ButtonBlockProps["align"], string> = {
	left: "justify-start",
	center: "justify-center",
	right: "justify-end",
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
	label: "按钮",
	fields: {
		label: { type: "text", label: "文案" },
		href: { type: "text", label: "链接" },
		variant: {
			type: "select",
			label: "样式",
			options: [
				{ label: "主按钮", value: "primary" },
				{ label: "描边", value: "outline" },
				{ label: "幽灵", value: "ghost" },
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
		label: "阅读更多",
		href: "#",
		variant: "primary",
		align: "left",
	},
	render: ({ label, href, variant, align }) => (
		<div className={`w-full px-6 py-3 flex ${alignClass[align]}`}>
			<a
				href={href}
				className={`inline-flex items-center px-5 py-2.5 text-sm font-medium transition ${variantClass[variant]}`}
			>
				{label}
			</a>
		</div>
	),
};

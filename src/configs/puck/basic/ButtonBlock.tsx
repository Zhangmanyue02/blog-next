import type { ComponentConfig } from "@puckeditor/core";
import type { CSSProperties } from "react";

type YesNo = "yes" | "no";

export type ButtonVariant = "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "round" | "circle";

export type ButtonBlockProps = {
	label: string;
	href: string;
	variant: ButtonVariant;
	size: ButtonSize;
	shape: ButtonShape;
	color: string;
	block: YesNo;
	targetBlank: YesNo;
	disabled: YesNo;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const isYes = (value: YesNo) => value === "yes";

const sizeClass: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-xs gap-1",
	md: "h-9 px-4 text-sm gap-1.5",
	lg: "h-11 px-6 text-base gap-2",
};

const shapeClass: Record<ButtonShape, string> = {
	default: "rounded-md",
	round: "rounded-full",
	circle: "rounded-full aspect-square !px-0 justify-center",
};

const normalizeVariant = (variant: string): ButtonVariant => {
	if (variant === "primary") return "solid";
	if (variant === "outline") return "outlined";
	if (variant === "ghost") return "text";
	if (
		variant === "solid" ||
		variant === "outlined" ||
		variant === "dashed" ||
		variant === "filled" ||
		variant === "text" ||
		variant === "link"
	) {
		return variant;
	}
	return "solid";
};

const resolveVariantStyle = (variant: ButtonVariant, color: string): CSSProperties => {
	const accent = color.trim() || "var(--primary)";
	const accentFg = color.trim() ? "#ffffff" : "var(--primary-foreground)";

	switch (variant) {
		case "solid":
			return {
				backgroundColor: accent,
				color: accentFg,
				border: "1px solid transparent",
			};
		case "outlined":
			return {
				backgroundColor: "transparent",
				color: accent,
				border: `1px solid ${accent}`,
			};
		case "dashed":
			return {
				backgroundColor: "transparent",
				color: accent,
				border: `1px dashed ${accent}`,
			};
		case "filled":
			return {
				backgroundColor: color.trim() ? `${color}22` : "color-mix(in oklab, var(--primary) 14%, transparent)",
				color: accent,
				border: "1px solid transparent",
			};
		case "text":
			return {
				backgroundColor: "transparent",
				color: accent,
				border: "1px solid transparent",
			};
		case "link":
			return {
				backgroundColor: "transparent",
				color: accent,
				border: "1px solid transparent",
				textDecoration: "underline",
				textUnderlineOffset: "4px",
				paddingInline: 0,
				height: "auto",
			};
		default:
			return {};
	}
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
	label: "按钮",
	fields: {
		label: { type: "text", label: "文案" },
		href: { type: "text", label: "链接" },
		variant: {
			type: "select",
			label: "变体",
			options: [
				{ label: "solid", value: "solid" },
				{ label: "outlined", value: "outlined" },
				{ label: "dashed", value: "dashed" },
				{ label: "filled", value: "filled" },
				{ label: "text", value: "text" },
				{ label: "link", value: "link" },
			],
		},
		size: {
			type: "select",
			label: "尺寸",
			options: [
				{ label: "小", value: "sm" },
				{ label: "中", value: "md" },
				{ label: "大", value: "lg" },
			],
		},
		shape: {
			type: "select",
			label: "形状",
			options: [
				{ label: "默认", value: "default" },
				{ label: "圆角", value: "round" },
				{ label: "圆形", value: "circle" },
			],
		},
		color: { type: "text", label: "主题色(hex，可空)" },
		block: { ...yesNo, label: "通栏宽度" },
		targetBlank: { ...yesNo, label: "新窗口打开" },
		disabled: { ...yesNo, label: "禁用" },
	},
	defaultProps: {
		label: "阅读更多",
		href: "#",
		variant: "solid",
		size: "md",
		shape: "default",
		color: "",
		block: "no",
		targetBlank: "no",
		disabled: "no",
	},
	render: ({ label, href, variant, size, shape, color, block, targetBlank, disabled }) => {
		const resolvedVariant = normalizeVariant(variant);
		const disabledState = isYes(disabled);
		const blockState = isYes(block);
		const openBlank = isYes(targetBlank);

		const className = [
			"inline-flex items-center justify-center font-medium transition-opacity select-none",
			sizeClass[size] ?? sizeClass.md,
			shapeClass[shape] ?? shapeClass.default,
			blockState ? "w-full" : "",
			disabledState ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:opacity-90",
			resolvedVariant === "link" ? "hover:opacity-80" : "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<a
				href={disabledState ? undefined : href}
				aria-disabled={disabledState || undefined}
				target={openBlank ? "_blank" : undefined}
				rel={openBlank ? "noreferrer noopener" : undefined}
				className={className}
				style={resolveVariantStyle(resolvedVariant, color)}
				onClick={disabledState ? (event) => event.preventDefault() : undefined}
			>
				{label}
			</a>
		);
	},
};

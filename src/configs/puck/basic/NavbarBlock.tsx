import type { ComponentConfig } from "@puckeditor/core";
import type { CSSProperties } from "react";

export type NavbarBlockProps = {
	logo: string;
	links: { label: string; href: string }[];
	logoColor: string;
	linkColor: string;
	linkHoverColor: string;
	sticky: boolean;
	borderRadius: number;
	marginX: number;
	marginY: number;
	maxWidth: number;
	height: number;
	paddingX: number;
	justify: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
	align: "flex-start" | "center" | "flex-end";
	gap: number;
	linkGap: number;
};

const navbarDefaultProps: NavbarBlockProps = {
	logo: "Alvin's Notes",
	links: [
		{ label: "首页", href: "/" },
		{ label: "归档", href: "/archives" },
		{ label: "关于", href: "/about" },
	],
	logoColor: "",
	linkColor: "",
	linkHoverColor: "",
	sticky: true,
	borderRadius: 0,
	marginX: 0,
	marginY: 0,
	maxWidth: 768,
	height: 56,
	paddingX: 24,
	justify: "space-between",
	align: "center",
	gap: 16,
	linkGap: 20,
};

const withNavbarDefaults = (props: Partial<NavbarBlockProps>): NavbarBlockProps => ({
	logo: props.logo ?? navbarDefaultProps.logo,
	links: props.links ?? navbarDefaultProps.links,
	logoColor: props.logoColor ?? navbarDefaultProps.logoColor,
	linkColor: props.linkColor ?? navbarDefaultProps.linkColor,
	linkHoverColor: props.linkHoverColor ?? navbarDefaultProps.linkHoverColor,
	sticky: props.sticky ?? navbarDefaultProps.sticky,
	borderRadius: props.borderRadius ?? navbarDefaultProps.borderRadius,
	marginX: props.marginX ?? navbarDefaultProps.marginX,
	marginY: props.marginY ?? navbarDefaultProps.marginY,
	maxWidth: props.maxWidth ?? navbarDefaultProps.maxWidth,
	height: props.height ?? navbarDefaultProps.height,
	paddingX: props.paddingX ?? navbarDefaultProps.paddingX,
	justify: props.justify ?? navbarDefaultProps.justify,
	align: props.align ?? navbarDefaultProps.align,
	gap: props.gap ?? navbarDefaultProps.gap,
	linkGap: props.linkGap ?? navbarDefaultProps.linkGap,
});

export const NavbarBlock: ComponentConfig<NavbarBlockProps> = {
	label: "导航栏",
	fields: {
		logo: { type: "text", label: "站点名" },
		links: {
			type: "array",
			label: "导航链接",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "链接",
		},
		logoColor: { type: "text", label: "站点名颜色(hex，可空)" },
		linkColor: { type: "text", label: "链接颜色(hex，可空)" },
		linkHoverColor: { type: "text", label: "链接悬停色(hex，可空)" },
		sticky: {
			type: "radio",
			label: "吸顶",
			options: [
				{ label: "是", value: true },
				{ label: "否", value: false },
			],
		},
		borderRadius: { type: "number", label: "圆角(px)" },
		marginX: { type: "number", label: "左右外边距(px)" },
		marginY: { type: "number", label: "上下外边距(px)" },
		maxWidth: { type: "number", label: "内容最大宽(px，0=铺满)" },
		height: { type: "number", label: "高度(px)" },
		paddingX: { type: "number", label: "左右内边距(px)" },
		justify: {
			type: "select",
			label: "主轴对齐",
			options: [
				{ label: "起点", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "终点", value: "flex-end" },
				{ label: "两端", value: "space-between" },
				{ label: "环绕", value: "space-around" },
				{ label: "均分", value: "space-evenly" },
			],
		},
		align: {
			type: "select",
			label: "交叉对齐",
			options: [
				{ label: "起点", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "终点", value: "flex-end" },
			],
		},
		gap: { type: "number", label: "Logo与导航间距(px)" },
		linkGap: { type: "number", label: "链接间距(px)" },
	},
	defaultProps: navbarDefaultProps,
	resolveData: ({ props }) => ({
		props: withNavbarDefaults(props),
	}),
	render: (rawProps) => {
		const {
			logo,
			links,
			logoColor,
			linkColor,
			linkHoverColor,
			sticky,
			borderRadius,
			marginX,
			marginY,
			maxWidth,
			height,
			paddingX,
			justify,
			align,
			gap,
			linkGap,
		} = withNavbarDefaults(rawProps);

		const resolvedLogoColor = logoColor.trim() || undefined;
		const resolvedLinkColor = linkColor.trim() || undefined;
		const resolvedHoverColor = linkHoverColor.trim() || undefined;

		return (
			<header
				className={`z-40 w-full ${sticky ? "sticky top-0" : ""}`}
				style={{ padding: `${marginY}px ${marginX}px` }}
			>
				<div
					className="w-full border border-white/25"
					style={{
						background: "rgba(255, 255, 255, 0.12)",
						backdropFilter: "blur(20px) saturate(180%)",
						WebkitBackdropFilter: "blur(20px) saturate(180%)",
						boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
						borderRadius,
					}}
				>
					<div
						className="mx-auto flex w-full"
						style={{
							maxWidth: maxWidth > 0 ? maxWidth : undefined,
							height,
							paddingLeft: paddingX,
							paddingRight: paddingX,
							justifyContent: justify,
							alignItems: align,
							gap,
						}}
					>
						<a
							href="/"
							className="shrink-0 text-base font-semibold tracking-tight"
							style={{ color: resolvedLogoColor }}
						>
							{logo}
						</a>
						<nav
							className="flex items-center text-sm [&_a]:transition [&_a]:text-[var(--navbar-link-color,var(--muted-foreground))] [&_a:hover]:text-[var(--navbar-link-hover,var(--foreground))]"
							style={
								{
									gap: linkGap,
									...(resolvedLinkColor ? { "--navbar-link-color": resolvedLinkColor } : {}),
									...(resolvedHoverColor ? { "--navbar-link-hover": resolvedHoverColor } : {}),
								} as CSSProperties
							}
						>
							{links.map((link) => (
								<a key={`${link.label}-${link.href}`} href={link.href}>
									{link.label}
								</a>
							))}
						</nav>
					</div>
				</div>
			</header>
		);
	},
};

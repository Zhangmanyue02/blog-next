import type { ComponentConfig } from "@puckeditor/core";
import { EDITOR_SHADER_ITERATIONS, liveOrPreview, type PortfolioSocialViewItem, type PuckPortfolioMetadata } from "./types";
import { ContactCardView } from "./views/ContactCardView";
import "./views/portfolio-view.css";

type YesNo = "yes" | "no";

export type PortfolioContactCardBlockProps = {
	headline: string;
	body: string;
	email: string;
	projectsHref: string;
	projectsLabel: string;
	footerLine1: string;
	footerLine2: string;
	shader: YesNo;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const PREVIEW_SOCIALS: PortfolioSocialViewItem[] = [
	{ label: "Email", href: "mailto:hello@example.com" },
	{ label: "LinkedIn", href: "https://www.linkedin.com", iconUrl: "https://cdn.simpleicons.org/linkedin/0A66C2" },
	{ label: "X", href: "https://x.com", iconUrl: "https://cdn.simpleicons.org/x/111111" },
];

function mapSocials(
	profile: PuckPortfolioMetadata["profile"],
	previewEmail: string,
	editing: boolean,
): PortfolioSocialViewItem[] {
	const live = profile?.socials;
	if (Array.isArray(live)) {
		const items: PortfolioSocialViewItem[] = [];
		if (profile?.email) {
			items.push({ label: "Email", href: `mailto:${profile.email}` });
		}
		for (const item of live) {
			if (!item.href) continue;
			items.push({
				label: item.label?.trim() || "Link",
				href: item.href,
				iconUrl: item.icon?.startsWith("http") ? item.icon : undefined,
			});
		}
		return items;
	}
	if (!editing) {
		return profile?.email ? [{ label: "Email", href: `mailto:${profile.email}` }] : [];
	}
	return PREVIEW_SOCIALS.map((item) =>
		item.label === "Email" ? { ...item, href: `mailto:${previewEmail}` } : item,
	);
}

export const PortfolioContactCardBlock: ComponentConfig<PortfolioContactCardBlockProps> = {
	label: "联系卡片",
	fields: {
		headline: { type: "text", label: "标题" },
		body: { type: "textarea", label: "正文" },
		email: { type: "text", label: "邮箱（预览）" },
		projectsHref: { type: "text", label: "项目链接" },
		projectsLabel: { type: "text", label: "项目按钮文案" },
		footerLine1: { type: "text", label: "页脚第一行" },
		footerLine2: { type: "text", label: "页脚第二行" },
		shader: { ...yesNo, label: "内嵌着色" },
	},
	defaultProps: {
		headline: "Let’s connect",
		body: "I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Just reach out!",
		email: "hello@example.com",
		projectsHref: "/projects",
		projectsLabel: "See projects",
		footerLine1: "2026 © Built with Next.js",
		footerLine2: "By React Bits Pro",
		shader: "yes",
	},
	render: ({ puck, headline, body, email, projectsHref, projectsLabel, footerLine1, footerLine2, shader }) => {
		const profile = (puck.metadata as PuckPortfolioMetadata | undefined)?.profile;
		const editing = Boolean(puck.isEditing);
		return (
			<ContactCardView
				headline={headline}
				body={body}
				email={liveOrPreview(profile?.email, email, editing)}
				projectsHref={projectsHref}
				projectsLabel={projectsLabel}
				socials={mapSocials(profile, email, editing)}
				footerLine1={footerLine1}
				footerLine2={footerLine2}
				shader={shader === "yes"}
				shaderIterations={editing ? EDITOR_SHADER_ITERATIONS : undefined}
			/>
		);
	},
};

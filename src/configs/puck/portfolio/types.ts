export const PORTFOLIO_PROJECT_ICON_KEYS = [
	"sparkles",
	"compass",
	"line-chart",
	"wand-2",
	"layers",
	"bot",
] as const;

export type PortfolioProjectIconKey = (typeof PORTFOLIO_PROJECT_ICON_KEYS)[number];

export type PortfolioHeroViewProps = {
	greeting: string;
	headlineLine1: string;
	headlineLine2: string;
	tagline: string;
	portraitUrl: string;
	portraitHoverUrl: string;
	portraitAlt: string;
	email: string;
	workHref: string;
	workLabel: string;
};

export type PortfolioProjectViewItem = {
	id: string;
	iconKey: PortfolioProjectIconKey;
	iconLabel: string;
	title: string;
	description: string;
	meta: string;
	imageRatio: number;
	image: string;
	imageAlt: string;
	href?: string;
};

export type PortfolioProjectsGridViewProps = {
	items: PortfolioProjectViewItem[];
	withHeadline?: boolean;
	headline?: string;
	subhead?: string;
	viewMoreVisible?: boolean;
	viewMoreHref?: string;
	viewMoreLabel?: string;
};

export type PortfolioPolaroidViewItem = {
	id: string;
	url?: string;
	alt?: string;
	rotate: number;
};

export type PortfolioAboutIntroViewProps = {
	displayName: string;
	bio: string;
};

export type PortfolioExperienceViewItem = {
	company: string;
	role: string;
	period: string;
	logoUrl?: string;
	brandColor?: string;
};

export type PortfolioEducationViewItem = {
	school: string;
	degree: string;
	period: string;
	logoUrl?: string;
};

export type PortfolioSkillViewItem = {
	name: string;
};

export type PortfolioStackViewItem = {
	label: string;
	slug: string;
	bg: string;
	fg: string;
	iconUrl?: string;
};

export type PortfolioSocialViewItem = {
	label: string;
	href: string;
	iconUrl?: string;
};

export type PortfolioContactCardViewProps = {
	headline: string;
	body: string;
	email: string;
	projectsHref: string;
	projectsLabel: string;
	socials: PortfolioSocialViewItem[];
	footerLine1: string;
	footerLine2: string;
	shader?: boolean;
	shaderIterations?: number;
};

export type PuckPortfolioProfile = {
	displayName?: string | null;
	greeting?: string | null;
	headlineLine1?: string | null;
	headlineLine2?: string | null;
	tagline?: string | null;
	bio?: string | null;
	portraitUrl?: string | null;
	portraitHoverUrl?: string | null;
	email?: string | null;
	socials?: Array<{ label?: string; href?: string; icon?: string }> | null;
	polaroids?: Array<{ url?: string; alt?: string; rotate?: number }> | null;
};

export type PuckPortfolioProject = {
	id?: string | number;
	title?: string | null;
	description?: string | null;
	meta?: string | null;
	coverImage?: string | null;
	imageAlt?: string | null;
	imageRatio?: string | number | null;
	iconKey?: string | null;
	href?: string | null;
};

export type PuckPortfolioExperience = {
	company?: string | null;
	role?: string | null;
	period?: string | null;
	brandColor?: string | null;
	logoUrl?: string | null;
};

export type PuckPortfolioEducation = {
	school?: string | null;
	degree?: string | null;
	period?: string | null;
	logoUrl?: string | null;
};

export type PuckPortfolioSkill = {
	name?: string | null;
};

export type PuckPortfolioStackItem = {
	label?: string | null;
	slug?: string | null;
	bg?: string | null;
	fg?: string | null;
	iconUrl?: string | null;
};

export type PuckPortfolioMetadata = {
	profile?: PuckPortfolioProfile | null;
	projects?: PuckPortfolioProject[] | null;
	experiences?: PuckPortfolioExperience[] | null;
	educations?: PuckPortfolioEducation[] | null;
	skills?: PuckPortfolioSkill[] | null;
	stackItems?: PuckPortfolioStackItem[] | null;
};

export function liveOrPreview(live: string | null | undefined, preview: string, isEditing: boolean): string {
	if (live?.trim()) return live;
	return isEditing ? preview : "";
}

const ICON_KEY_SET = new Set<string>(PORTFOLIO_PROJECT_ICON_KEYS);

export function toProjectIconKey(value?: string | null): PortfolioProjectIconKey {
	if (value && ICON_KEY_SET.has(value)) return value as PortfolioProjectIconKey;
	return "sparkles";
}

export function mapPublicProject(project: PuckPortfolioProject, index: number): PortfolioProjectViewItem {
	const title = project.title?.trim() || "Untitled";
	const ratio = Number(project.imageRatio);
	return {
		id: String(project.id ?? index),
		iconKey: toProjectIconKey(project.iconKey),
		iconLabel: title,
		title,
		description: project.description ?? "",
		meta: project.meta ?? "",
		imageRatio: Number.isFinite(ratio) && ratio > 0 ? ratio : 1024 / 768,
		image: project.coverImage ?? "",
		imageAlt: project.imageAlt?.trim() || title,
		href: project.href || undefined,
	};
}

export function sliceProjects<T>(items: T[], limit: number): T[] {
	if (limit > 0) return items.slice(0, limit);
	return items;
}

/** 编辑器内 Shader 迭代上限，减轻画布负担 */
export const EDITOR_SHADER_ITERATIONS = 4;

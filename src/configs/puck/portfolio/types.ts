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

export type PuckPortfolioProject = {
	id?: string | number;
	title?: string | null;
	description?: string | null;
	meta?: string | null;
	coverImage?: string | null;
	imageAlt?: string | null;
	imageRatio?: string | number | null;
	iconKey?: string | null;
	slug?: string | null;
	tagline?: string | null;
	role?: string | null;
	year?: string | null;
	duration?: string | null;
	body?: string | null;
	stack?: string[] | null;
	highlights?: string[] | null;
	suite?: Array<{ name?: string; role?: string; description?: string }> | null;
	gallery?: Array<{ url?: string; alt?: string }> | null;
	links?: Array<{ label?: string; href?: string }> | null;
	href?: string | null;
};

export type PortfolioProjectDetailViewProps = {
	title: string;
	tagline?: string;
	description?: string;
	meta?: string;
	role?: string;
	year?: string;
	duration?: string;
	coverImage?: string;
	coverAlt?: string;
	body?: string;
	stack: string[];
	highlights: string[];
	suite: Array<{ name: string; role?: string; description?: string }>;
	gallery: Array<{ url: string; alt?: string }>;
	links: Array<{ label: string; href: string }>;
	backHref?: string;
	backLabel?: string;
};

export type PuckPortfolioMetadata = {
	projects?: PuckPortfolioProject[] | null;
	pageSlug?: string | null;
};

export function normalizePageSlug(value?: string | null): string {
	if (!value) return "";
	return value
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.split("?")[0]
		.toLowerCase();
}

export function shouldShowProjectViewMore({
	enabled,
	limit,
	total,
	pageSlug,
	viewMoreHref,
}: {
	enabled: boolean;
	limit: number;
	total: number;
	pageSlug?: string | null;
	viewMoreHref?: string;
}): boolean {
	if (!enabled) return false;
	if (!limit || limit <= 0) return false;
	if (total > 0 && limit >= total) return false;
	const hrefSlug = normalizePageSlug(viewMoreHref);
	const currentSlug = normalizePageSlug(pageSlug);
	if (hrefSlug && currentSlug && hrefSlug === currentSlug) return false;
	return true;
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
		href: project.slug?.trim() ? `/work/${project.slug.trim()}` : project.href || undefined,
	};
}

export function mapPublicProjectDetail(project: PuckPortfolioProject): PortfolioProjectDetailViewProps {
	const title = project.title?.trim() || "Untitled";
	return {
		title,
		tagline: project.tagline?.trim() || undefined,
		description: project.description?.trim() || undefined,
		meta: project.meta?.trim() || undefined,
		role: project.role?.trim() || undefined,
		year: project.year?.trim() || undefined,
		duration: project.duration?.trim() || undefined,
		coverImage: project.coverImage?.trim() || undefined,
		coverAlt: project.imageAlt?.trim() || title,
		body: project.body?.trim() || undefined,
		stack: (project.stack || []).map((item) => item.trim()).filter(Boolean),
		highlights: (project.highlights || []).map((item) => item.trim()).filter(Boolean),
		suite: (project.suite || [])
			.map((item) => ({
				name: item.name?.trim() || "",
				role: item.role?.trim() || undefined,
				description: item.description?.trim() || undefined,
			}))
			.filter((item) => item.name),
		gallery: (project.gallery || [])
			.map((item) => ({ url: item.url?.trim() || "", alt: item.alt?.trim() || undefined }))
			.filter((item) => item.url),
		links: (project.links || [])
			.map((item) => ({ label: item.label?.trim() || "", href: item.href?.trim() || "" }))
			.filter((item) => item.label && item.href),
		backHref: "/projects",
		backLabel: "All projects",
	};
}

export function sliceProjects<T>(items: T[], limit: number): T[] {
	if (limit > 0) return items.slice(0, limit);
	return items;
}

/** 编辑器内 Shader 迭代上限，减轻画布负担 */
export const EDITOR_SHADER_ITERATIONS = 4;

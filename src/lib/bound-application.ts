import { cache } from "react";
import { getNavList, getPageBySlug } from "@/api/services/pageService";
import type { ApplicationType } from "@/type/types";

export function asApplicationType(value?: string | null): ApplicationType | null {
	if (value === "content" || value === "portfolio") return value;
	return null;
}

export function getBoundApplicationCode(): string | undefined {
	const code = process.env.NEXT_PUBLIC_APPLICATION_CODE?.trim();
	return code || undefined;
}

export function isContentApplication(type: ApplicationType | null): boolean {
	return type === "content";
}

export type BoundSiteState =
	| { ready: true; code: string; type: ApplicationType; reason: null }
	| { ready: false; code: string | null; type: null; reason: "missing-env" | "app-unavailable" };

export const resolveBoundSite = cache(async (): Promise<BoundSiteState> => {
	const code = getBoundApplicationCode() ?? null;
	if (!code) {
		return { ready: false, code: null, type: null, reason: "missing-env" };
	}
	const type = await resolveBoundApplicationType();
	if (!type) {
		return { ready: false, code, type: null, reason: "app-unavailable" };
	}
	return { ready: true, code, type, reason: null };
});

export const resolveBoundApplicationType = cache(async (): Promise<ApplicationType | null> => {
	const nav = (await getNavList()) ?? [];
	for (const item of nav) {
		const fromNav = asApplicationType(item.applicationType);
		if (fromNav) return fromNav;
	}

	const preferredSlug = nav.find((item) => item.slug === "home")?.slug ?? nav[0]?.slug ?? "home";
	const page = await getPageBySlug(preferredSlug);
	return asApplicationType(page?.applicationType);
});

export async function resolvePageApplicationType(pageType?: string | null): Promise<ApplicationType | null> {
	return asApplicationType(pageType) ?? (await resolveBoundApplicationType());
}

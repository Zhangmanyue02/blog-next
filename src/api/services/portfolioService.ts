import { cache } from "react";
import { apiClient } from "../apiClient";
import type { PuckPortfolioMetadata, PuckPortfolioProject } from "@/configs/puck/portfolio/types";

export type PortfolioPublicPayload = PuckPortfolioMetadata & {
	application?: { id: string; code: string; type: string };
};

export const getPortfolioPublic = cache(
	async (params: { applicationId?: string; applicationCode?: string }): Promise<PortfolioPublicPayload | null> => {
		const applicationCode = params.applicationCode?.trim();
		const applicationId = params.applicationId?.trim();
		if (!applicationCode && !applicationId) return null;
		return apiClient
			.get<PortfolioPublicPayload>("/api/v1/portfolio/public", {
				params: {
					...(applicationCode ? { applicationCode } : {}),
					...(applicationId ? { applicationId } : {}),
				},
			})
			.then((res) => res.data as PortfolioPublicPayload | null);
	},
);

export const getPublicPortfolioProject = cache(
	async (
		slug: string,
		params: { applicationId?: string; applicationCode?: string } = {},
	): Promise<{ project: PuckPortfolioProject } | null> => {
		const applicationCode = params.applicationCode?.trim() || process.env.NEXT_PUBLIC_APPLICATION_CODE?.trim();
		const applicationId = params.applicationId?.trim();
		if (!slug || (!applicationCode && !applicationId)) return null;
		return apiClient
			.get<{ project: PuckPortfolioProject }>(`/api/v1/portfolio/public/projects/${encodeURIComponent(slug)}`, {
				params: {
					...(applicationCode ? { applicationCode } : {}),
					...(applicationId ? { applicationId } : {}),
				},
			})
			.then((res) => res.data as { project: PuckPortfolioProject } | null);
	},
);

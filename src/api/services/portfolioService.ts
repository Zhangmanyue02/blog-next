import { cache } from "react";
import { apiClient } from "../apiClient";
import type { PuckPortfolioMetadata } from "@/configs/puck/portfolio/types";

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

import { notFound } from "next/navigation";
import { getPublicPortfolioProject } from "@/api/services/portfolioService";
import { ProjectDetailView } from "@/configs/puck/portfolio/views/ProjectDetailView";
import { mapPublicProjectDetail } from "@/configs/puck/portfolio/types";
import { resolveBoundSite } from "@/lib/bound-application";

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function WorkProjectPage({ params }: Props) {
	const site = await resolveBoundSite();
	if (!site.ready || site.type !== "portfolio") notFound();

	const { slug } = await params;
	const payload = await getPublicPortfolioProject(slug, { applicationCode: site.code });
	if (!payload?.project) notFound();

	return (
		<main>
			<ProjectDetailView {...mapPublicProjectDetail(payload.project)} />
		</main>
	);
}

import { notFound } from "next/navigation";
import { Render } from "@puckeditor/core/rsc";
import { getPortfolioPublic } from "@/api/services/portfolioService";
import { getPageBySlug } from "@/api/services/pageService";
import { getPublishedBlogPosts } from "@/api/services/blogPostService";
import { getAdvancedConfig, resolveConfigByAppType } from "@/configs/puck";
import type { PuckPortfolioMetadata } from "@/configs/puck/portfolio/types";
import {
	isContentApplication,
	resolvePageApplicationType,
} from "@/lib/bound-application";
import type { PuckArticleMetadata } from "@/configs/puck/types";
import {
	buildArchiveCategories,
	buildArchiveGroups,
	buildArchiveTags,
	parsePuckData,
} from "@/utils/puckArticle";

type Props = {
	params: Promise<{ slug: string[] }>;
};

function toPortfolioMetadata(
	payload: { projects?: PuckPortfolioMetadata["projects"] },
	pageSlug: string,
): PuckPortfolioMetadata {
	return {
		projects: payload.projects ?? [],
		pageSlug,
	};
}

function EmptyPage({ title, summary }: { title: string; summary?: string }) {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12">
			<h1 className="text-3xl font-semibold">{title}</h1>
			{summary ? <p className="mt-2 text-zinc-600">{summary}</p> : null}
			<p className="mt-8 text-zinc-500">（页面内容为空或格式异常）</p>
		</main>
	);
}

export default async function ContentPage({ params }: Props) {
	const { slug } = await params;
	const slugStr = slug.join("/");
	if (!slugStr) notFound();

	const page = await getPageBySlug(slugStr);
	if (!page) notFound();

	const applicationType = await resolvePageApplicationType(page.applicationType);
	const data = parsePuckData(page.content);

	if (applicationType === "portfolio") {
		const applicationCode =
			process.env.NEXT_PUBLIC_APPLICATION_CODE?.trim() || page.applicationCode || undefined;
		const payload = await getPortfolioPublic({
			applicationCode,
			applicationId: page.applicationId || undefined,
		});
		if (!payload) notFound();
		if (!data) {
			return <EmptyPage title={page.title} summary={page.summary} />;
		}
		return (
			<main>
				<Render
					config={resolveConfigByAppType("portfolio")}
					data={data}
					metadata={toPortfolioMetadata(payload, slugStr)}
				/>
			</main>
		);
	}

	if (!isContentApplication(applicationType)) {
		notFound();
	}

	const posts = await getPublishedBlogPosts();
	if (!data) {
		return <EmptyPage title={page.title} summary={page.summary} />;
	}

	const metadata: PuckArticleMetadata = {
		archiveGroups: buildArchiveGroups(posts),
		archiveCategories: buildArchiveCategories(posts),
		archiveTags: buildArchiveTags(posts),
	};

	return (
		<main>
			<Render config={getAdvancedConfig()} data={data} metadata={metadata} />
		</main>
	);
}

import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core/rsc';
import { getPageBySlug } from '@/api/services/pageService';
import { getPublishedBlogPosts } from '@/api/services/blogPostService';
import { getAdvancedConfig } from '@/configs/puck';
import { buildArchiveGroups, parsePuckData } from '@/utils/puckArticle';
import type { PuckArticleMetadata } from '@/configs/puck/types';

type Props = {
	params: Promise<{ slug: string[] }>;
};

export default async function ContentPage({ params }: Props) {
	const { slug } = await params;
	const slugStr = slug.join('/');
	if (!slugStr) notFound();

	const [page, posts] = await Promise.all([
		getPageBySlug(slugStr),
		getPublishedBlogPosts(),
	]);

	if (!page) notFound();

	const data = parsePuckData(page.content);

	if (!data) {
		return (
			<main className="mx-auto max-w-3xl px-6 py-12">
				<h1 className="text-3xl font-semibold">{page.title}</h1>
				{page.summary && <p className="mt-2 text-zinc-600">{page.summary}</p>}
				<p className="mt-8 text-zinc-500">（页面内容为空或格式异常）</p>
			</main>
		);
	}

	const metadata: PuckArticleMetadata = {
		archiveGroups: buildArchiveGroups(posts),
	};

	return (
		<main>
			<Render config={getAdvancedConfig()} data={data} metadata={metadata} />
		</main>
	);
}

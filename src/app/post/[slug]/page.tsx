import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core/rsc';
import { getPageBySlug } from '@/api/services/pageService';
import { getBlogPostBySlug } from '@/api/services/blogPostService';
import { getAdvancedConfig } from '@/configs/puck';
import { resolveArticleLayout, toPuckArticlePost } from '@/utils/puckArticle';
import type { PuckArticleMetadata } from '@/configs/puck/types';

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
	const { slug } = await params;
	if (!slug) notFound();

	const [layoutPage, post] = await Promise.all([
		getPageBySlug('post'),
		getBlogPostBySlug(slug),
	]);

	if (!post) notFound();

	// /post 页当前是归档列表，不能直接当详情壳；无文章块时用兜底布局
	const data = resolveArticleLayout(layoutPage?.content);
	const metadata: PuckArticleMetadata = {
		post: toPuckArticlePost(post),
	};

	return (
		<main>
			<Render config={getAdvancedConfig()} data={data} metadata={metadata} />
		</main>
	);
}

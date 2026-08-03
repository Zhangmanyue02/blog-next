import { notFound } from 'next/navigation';
import { Render } from '@puckeditor/core/rsc';
import { getPageBySlug } from '@/api/services/pageService';
import { getBlogPostBySlug } from '@/api/services/blogPostService';
import { getAdvancedConfig } from '@/configs/puck';
import {
	DEFAULT_POST_LAYOUT_CODE,
	resolvePostLayout,
	toPuckArticlePost,
} from '@/utils/puckArticle';
import type { PuckArticleMetadata } from '@/configs/puck/types';

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
	const { slug } = await params;
	if (!slug) notFound();

	const post = await getBlogPostBySlug(slug);
	if (!post) notFound();

	// 详情壳：文章 templateCode → 默认 post-detail Page（公开可读）
	const layoutCode = post.templateCode || DEFAULT_POST_LAYOUT_CODE;
	const layoutPage = await getPageBySlug(layoutCode);
	const data = resolvePostLayout(layoutPage?.content);

	const metadata: PuckArticleMetadata = {
		post: toPuckArticlePost(post),
	};

	return (
		<main>
			<Render config={getAdvancedConfig()} data={data} metadata={metadata} />
		</main>
	);
}

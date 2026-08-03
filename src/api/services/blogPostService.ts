import { apiClient } from '../apiClient';
import type { BlogPost, BlogPostPageResult, BlogPostQuery } from '@/type/blog';

export function getBlogPosts(query: BlogPostQuery = {}): Promise<BlogPostPageResult | null> {
	return apiClient
		.get<BlogPostPageResult>('/api/v1/blog/posts', {
			params: {
				pageNum: query.pageNum ?? 1,
				pageSize: query.pageSize ?? 100,
				sortBy: query.sortBy ?? 'createTime',
				order: query.order ?? 'DESC',
				...(query.title ? { title: query.title } : {}),
				...(query.publishStatus !== undefined ? { publishStatus: query.publishStatus } : {}),
			},
		})
		.then((res) => {
			const data = res.data as BlogPostPageResult | null;
			if (!data) return null;
			return {
				list: data.list ?? [],
				total: data.total ?? 0,
			};
		});
}

export function getBlogPostById(id: string): Promise<BlogPost | null> {
	return apiClient
		.get<BlogPost>(`/api/v1/blog/posts/${encodeURIComponent(id)}`)
		.then((res) => res.data as BlogPost | null);
}

/**
 * 按 slug 取文章：优先 slug 接口，再回退 id，再回退已发布列表匹配。
 * 后端若尚未提供 slug 接口，404 会被 apiClient 收成 null。
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const bySlugPath = `/api/v1/blog/posts/slug/${slug.split('/').map(encodeURIComponent).join('/')}`;
	const bySlug = await apiClient
		.get<BlogPost>(bySlugPath)
		.then((res) => res.data as BlogPost | null);
	if (bySlug) return bySlug;

	const byId = await getBlogPostById(slug);
	if (byId) return byId;

	const page = await getBlogPosts({ pageNum: 1, pageSize: 100, publishStatus: 1 });
	return page?.list.find((post) => post.slug === slug) ?? null;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
	const page = await getBlogPosts({ pageNum: 1, pageSize: 100, publishStatus: 1 });
	return page?.list ?? [];
}

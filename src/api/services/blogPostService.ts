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
				...(query.categoryId ? { categoryId: query.categoryId } : {}),
				...(query.tagId ? { tagId: query.tagId } : {}),
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

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
	const page = await getBlogPosts({ pageNum: 1, pageSize: 100, publishStatus: 1 });
	return page?.list ?? [];
}

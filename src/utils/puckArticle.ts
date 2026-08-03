import type { Data } from '@puckeditor/core';
import type { BlogPost } from '@/type/blog';
import type { PuckArchiveGroup, PuckArticlePost } from '@/configs/puck/types';

const ARTICLE_BLOCK_TYPES = new Set(['ArticleHeaderBlock', 'ArticleBodyBlock']);

/** 文章详情页在缺少文章布局时的兜底结构 */
export const ARTICLE_LAYOUT_FALLBACK: Data = {
	root: { props: {} },
	content: [
		{ type: 'ArticleHeaderBlock', props: { id: 'article-header' } },
		{ type: 'ArticleBodyBlock', props: { id: 'article-body' } },
	],
	zones: {},
};

export function parsePuckData(content: string | undefined | null): Data | null {
	if (!content) return null;
	try {
		const parsed = JSON.parse(content);
		if (parsed && typeof parsed === 'object' && 'content' in parsed) {
			return parsed as Data;
		}
	} catch {
		return null;
	}
	return null;
}

/** 页面 JSON 是否包含文章详情相关块（而非仅归档列表） */
export function hasArticleBlocks(data: Data): boolean {
	return data.content.some((item) => ARTICLE_BLOCK_TYPES.has(item.type as string));
}

/**
 * 解析文章详情布局：仅当 CMS 页含文章头/正文时才用该页；
 * 否则用兜底布局（避免 /post 归档页被误当成详情壳）。
 */
export function resolveArticleLayout(content: string | undefined | null): Data {
	const data = parsePuckData(content);
	if (data && hasArticleBlocks(data)) return data;
	return ARTICLE_LAYOUT_FALLBACK;
}

export function toPuckArticlePost(post: BlogPost): PuckArticlePost {
	return {
		title: post.title,
		summary: post.summary,
		content: post.content,
		coverImage: post.coverImage,
		slug: post.slug,
		createTime: post.createTime,
		createBy: post.createBy,
	};
}

function formatArchiveDate(createTime?: string): string {
	if (!createTime || createTime.length < 10) return '';
	return createTime.slice(5, 10);
}

function resolvePostHref(post: BlogPost): string {
	const key = post.slug || post.id;
	return key ? `/post/${key}` : '#';
}

export function buildArchiveGroups(posts: BlogPost[]): PuckArchiveGroup[] {
	const groupMap = new Map<string, PuckArchiveGroup>();

	for (const post of posts) {
		if (!post.title) continue;
		const year = post.createTime?.slice(0, 4) || '未知';
		const existing = groupMap.get(year);
		const item = {
			title: post.title,
			href: resolvePostHref(post),
			date: formatArchiveDate(post.createTime),
		};
		if (existing) {
			existing.posts.push(item);
		} else {
			groupMap.set(year, { year, posts: [item] });
		}
	}

	return [...groupMap.values()].sort((a, b) => b.year.localeCompare(a.year));
}

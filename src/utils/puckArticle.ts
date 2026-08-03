import type { Data } from '@puckeditor/core';
import type { BlogPost } from '@/type/blog';
import type { PuckArchiveGroup, PuckArticlePost } from '@/configs/puck/types';

/** 文章详情默认布局（CMS Page slug / 日后 Template code） */
export const DEFAULT_POST_LAYOUT_CODE = 'post-detail';

/** 详情布局缺失时的兜底结构 */
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

/** 解析详情布局 JSON；无效时回退兜底 */
export function resolvePostLayout(content: string | undefined | null): Data {
	return parsePuckData(content) ?? ARTICLE_LAYOUT_FALLBACK;
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

import type { Data } from '@puckeditor/core';
import type { BlogPost } from '@/type/blog';
import type {
	PuckArchiveFilterOption,
	PuckArchiveGroup,
	PuckArchivePostItem,
	PuckArticlePost,
} from '@/configs/puck/types';

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
		createTime: post.createTime,
		createBy: post.createBy,
	};
}

function formatArchiveDate(createTime?: string): string {
	if (!createTime || createTime.length < 10) return '';
	return createTime.slice(5, 10);
}

function resolvePostHref(post: BlogPost): string {
	return post.id ? `/post/${post.id}` : '#';
}

function toArchivePostItem(post: BlogPost): PuckArchivePostItem | null {
	if (!post.title) return null;
	const tags = (post.tags || [])
		.filter((tag): tag is { id: string; name: string; color?: string } => Boolean(tag.id && tag.name))
		.map((tag) => ({ id: tag.id, name: tag.name, color: tag.color }));

	return {
		title: post.title,
		href: resolvePostHref(post),
		date: formatArchiveDate(post.createTime),
		categoryId: post.categoryId ?? post.category?.id ?? null,
		categoryName: post.category?.name,
		tagIds: tags.map((tag) => tag.id),
		tags,
	};
}

export function buildArchiveGroups(posts: BlogPost[]): PuckArchiveGroup[] {
	const groupMap = new Map<string, PuckArchiveGroup>();

	for (const post of posts) {
		const item = toArchivePostItem(post);
		if (!item) continue;
		const year = post.createTime?.slice(0, 4) || '未知';
		const existing = groupMap.get(year);
		if (existing) {
			existing.posts.push(item);
		} else {
			groupMap.set(year, { year, posts: [item] });
		}
	}

	return [...groupMap.values()].sort((a, b) => b.year.localeCompare(a.year));
}

export function buildArchiveCategories(posts: BlogPost[]): PuckArchiveFilterOption[] {
	const map = new Map<string, PuckArchiveFilterOption>();
	for (const post of posts) {
		const id = post.categoryId ?? post.category?.id;
		const name = post.category?.name;
		if (!id || !name || map.has(id)) continue;
		map.set(id, { id, name });
	}
	return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function buildArchiveTags(posts: BlogPost[]): PuckArchiveFilterOption[] {
	const map = new Map<string, PuckArchiveFilterOption>();
	for (const post of posts) {
		for (const tag of post.tags || []) {
			if (!tag.id || !tag.name || map.has(tag.id)) continue;
			map.set(tag.id, { id: tag.id, name: tag.name, color: tag.color });
		}
	}
	return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

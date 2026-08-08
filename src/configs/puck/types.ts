/** Puck metadata 注入的文章数据（与 ArticleItem 业务字段对齐） */
export interface PuckArticlePost {
	title?: string;
	summary?: string;
	content?: string;
	coverImage?: string;
	createTime?: string;
	createBy?: string;
}

export interface PuckArchiveTagBrief {
	id: string;
	name: string;
	color?: string;
}

export interface PuckArchivePostItem {
	title: string;
	href: string;
	date: string;
	categoryId?: string | null;
	categoryName?: string;
	tagIds?: string[];
	tags?: PuckArchiveTagBrief[];
}

export interface PuckArchiveGroup {
	year: string;
	posts: PuckArchivePostItem[];
}

export interface PuckArchiveFilterOption {
	id: string;
	name: string;
	color?: string;
}

export interface PuckArticleMetadata {
	/** 文章详情（文章头 / 正文） */
	post?: PuckArticlePost;
	/** 归档列表（按年分组，由页面层注入） */
	archiveGroups?: PuckArchiveGroup[];
	/** 归档分类筛选项（可由页面注入；缺省时从 posts 推导） */
	archiveCategories?: PuckArchiveFilterOption[];
	/** 归档标签筛选项（可由页面注入；缺省时从 posts 推导） */
	archiveTags?: PuckArchiveFilterOption[];
}

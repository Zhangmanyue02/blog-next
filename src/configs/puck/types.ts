/** Puck metadata 注入的文章数据（与 ArticleItem 业务字段对齐） */
export interface PuckArticlePost {
	title?: string;
	summary?: string;
	content?: string;
	coverImage?: string;
	slug?: string;
	createTime?: string;
	createBy?: string;
}

export interface PuckArchivePostItem {
	title: string;
	href: string;
	date: string;
}

export interface PuckArchiveGroup {
	year: string;
	posts: PuckArchivePostItem[];
}

export interface PuckArticleMetadata {
	/** 文章详情（文章头 / 正文） */
	post?: PuckArticlePost;
	/** 归档列表（按年分组，由页面层注入） */
	archiveGroups?: PuckArchiveGroup[];
}

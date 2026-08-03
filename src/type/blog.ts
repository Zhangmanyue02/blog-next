export type BlogPublishStatus = 0 | 1;

/** 博客文章（与后台 BlogPost / ArticleItem 对齐） */
export interface BlogPost {
	id?: string;
	title?: string;
	slug?: string;
	summary?: string;
	coverImage?: string;
	content?: string;
	templateCode?: string;
	/** 发布状态(0-草稿 1-已发布) */
	publishStatus?: BlogPublishStatus;
	status?: BlogPublishStatus;
	sort?: number;
	viewCount?: number;
	createBy?: string;
	createTime?: string;
	updateBy?: string;
	updateTime?: string;
}

export interface BlogPostQuery {
	pageNum?: number;
	pageSize?: number;
	sortBy?: string;
	order?: string;
	title?: string;
	/** 发布状态(0-草稿 1-已发布) */
	publishStatus?: BlogPublishStatus | string;
}

export interface BlogPostPageResult {
	list: BlogPost[];
	total: number;
}

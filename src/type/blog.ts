export type BlogPublishStatus = 0 | 1;

export interface BlogCategoryBrief {
	id?: string;
	name?: string;
}

export interface BlogTagBrief {
	id?: string;
	name?: string;
	color?: string;
}

/** 博客文章（与后台 BlogPost / ArticleItem 对齐） */
export interface BlogPost {
	id?: string;
	title?: string;
	summary?: string;
	coverImage?: string;
	content?: string;
	/** 详情页布局：关联 CMS Page slug / 模板编码 */
	templateCode?: string;
	categoryId?: string | null;
	category?: BlogCategoryBrief | null;
	tags?: BlogTagBrief[];
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
	categoryId?: string;
	tagId?: string;
}

export interface BlogPostPageResult {
	list: BlogPost[];
	total: number;
}

import type { Config, Data } from "@puckeditor/core";
import {
	HeadingBlock,
	TextBlock,
	ImageBlock,
	ButtonBlock,
	DividerBlock,
	SpacerBlock,
	FlexBlock,
	GridBlock,
	NavbarBlock,
	FooterBlock,
	BlogHeroBlock,
	ArticleListBlock,
	ArticleHeaderBlock,
	ArticleBodyBlock,
	AuthorBioBlock,
	RelatedPostsBlock,
	ProfileBlock,
	TimelineBlock,
	ArchiveListBlock,
	CategoriesBlock,
	TagCloudBlock,
} from "./basic";
import { advancedComponentMap } from "./advanced";

const blogCategories: Config["categories"] = {
	基础: {
		title: "基础",
		components: ["HeadingBlock", "TextBlock", "ImageBlock", "ButtonBlock", "DividerBlock", "SpacerBlock"],
		defaultExpanded: true,
	},
	布局: {
		title: "布局",
		components: ["FlexBlock", "GridBlock"],
	},
	站点: {
		title: "站点",
		components: ["NavbarBlock", "FooterBlock"],
		defaultExpanded: true,
	},
	首页: {
		title: "首页",
		components: ["BlogHeroBlock", "ArticleListBlock"],
		defaultExpanded: true,
	},
	文章: {
		title: "文章",
		components: ["ArticleHeaderBlock", "ArticleBodyBlock", "AuthorBioBlock", "RelatedPostsBlock"],
	},
	关于: {
		title: "关于",
		components: ["ProfileBlock", "TimelineBlock"],
	},
	归档: {
		title: "归档",
		components: ["ArchiveListBlock", "CategoriesBlock", "TagCloudBlock"],
	},
};

const blogComponents = {
	HeadingBlock,
	TextBlock,
	ImageBlock,
	ButtonBlock,
	DividerBlock,
	SpacerBlock,
	FlexBlock,
	GridBlock,
	NavbarBlock,
	FooterBlock,
	BlogHeroBlock,
	ArticleListBlock,
	ArticleHeaderBlock,
	ArticleBodyBlock,
	AuthorBioBlock,
	RelatedPostsBlock,
	ProfileBlock,
	TimelineBlock,
	ArchiveListBlock,
	CategoriesBlock,
	TagCloudBlock,
};

/** 模板编辑器专用：个人博客组件集 */
export const getBasicConfig = (): Config => ({
	categories: { ...blogCategories },
	components: { ...blogComponents },
});

/** 页面编辑器专用：个人博客组件集 + 高级 */
export const getAdvancedConfig = (): Config => ({
	categories: {
		...blogCategories,
		高级: {
			title: "高级",
			components: Object.keys(advancedComponentMap),
		},
	},
	components: {
		...blogComponents,
		...advancedComponentMap,
	},
});

/** 空 Puck data（新增空白页/模板时使用） */
export const getEmptyPuckData = (): Data => ({
	root: { props: {} },
	content: [],
	zones: {},
});

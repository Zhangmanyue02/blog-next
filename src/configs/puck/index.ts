import type { Config, Data } from "@puckeditor/core";
import {
	ArchiveListBlock,
	ArticleBodyBlock,
	ArticleHeaderBlock,
	AuthorBioBlock,
	ButtonBlock,
	FlexBlock,
	FooterBlock,
	GridBlock,
	HeadingBlock,
	ImageBlock,
	NavbarBlock,
	ProfileBlock,
	RelatedPostsBlock,
	TagCloudBlock,
	TextBlock,
	TimelineBlock,
} from "./basic";
import { advancedComponentMap, advancedSidebarComponents } from "./advanced";

const blogCategories: Config["categories"] = {
	基础: {
		title: "基础",
		components: ["HeadingBlock", "TextBlock", "ImageBlock", "ButtonBlock"],
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
	文章: {
		title: "文章",
		components: ["ArticleHeaderBlock", "ArticleBodyBlock", "AuthorBioBlock", "RelatedPostsBlock"],
	},
	关于: {
		title: "关于",
		components: ["ProfileBlock", "TimelineBlock", "AboutBentoBlock"],
	},
	归档: {
		title: "归档",
		components: ["ArchiveListBlock", "TagCloudBlock"],
	},
};

const blogComponents = {
	HeadingBlock,
	TextBlock,
	ImageBlock,
	ButtonBlock,
	FlexBlock,
	GridBlock,
	NavbarBlock,
	FooterBlock,
	ArticleHeaderBlock,
	ArticleBodyBlock,
	AuthorBioBlock,
	RelatedPostsBlock,
	ProfileBlock,
	TimelineBlock,
	ArchiveListBlock,
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
			components: advancedSidebarComponents,
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

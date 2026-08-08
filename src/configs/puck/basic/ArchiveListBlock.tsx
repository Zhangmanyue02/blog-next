import type { ComponentConfig } from "@puckeditor/core";
import type { PuckArchiveGroup, PuckArticleMetadata } from "../types";
import { ArchiveListView } from "./ArchiveListView";

type YesNo = "yes" | "no";

export type ArchiveListBlockProps = {
	title: string;
	fullscreen: YesNo;
	minHeight: number;
	showCategoryFilter: YesNo;
	showTagFilter: YesNo;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

const PLACEHOLDER_GROUPS: PuckArchiveGroup[] = [
	{
		year: "2026",
		posts: [
			{
				title: "文章标题（由归档数据注入）",
				href: "#",
				date: "08-01",
				categoryId: "c1",
				categoryName: "技术",
				tagIds: ["t1", "t2"],
				tags: [
					{ id: "t1", name: "React", color: "#3b82f6" },
					{ id: "t2", name: "Nest", color: "#ef4444" },
				],
			},
			{
				title: "另一篇文章",
				href: "#",
				date: "07-15",
				categoryId: "c2",
				categoryName: "随笔",
				tagIds: ["t3"],
				tags: [{ id: "t3", name: "生活", color: "#22c55e" }],
			},
		],
	},
];

export const ArchiveListBlock: ComponentConfig<ArchiveListBlockProps> = {
	label: "归档列表",
	fields: {
		title: { type: "text", label: "区块标题" },
		fullscreen: { ...yesNo, label: "全屏高度" },
		minHeight: { type: "number", label: "最小高度(px，非全屏时)" },
		showCategoryFilter: { ...yesNo, label: "分类筛选" },
		showTagFilter: { ...yesNo, label: "标签筛选" },
	},
	defaultProps: {
		title: "文章归档",
		fullscreen: "no",
		minHeight: 480,
		showCategoryFilter: "yes",
		showTagFilter: "yes",
	},
	render: ({ title, fullscreen, minHeight, showCategoryFilter, showTagFilter, puck }) => {
		const metadata = puck.metadata as PuckArticleMetadata;
		const hasData = Boolean(metadata.archiveGroups?.length);
		const isEditorPlaceholder = puck.isEditing && !hasData;
		const groups = hasData
			? (metadata.archiveGroups as PuckArchiveGroup[])
			: isEditorPlaceholder
				? PLACEHOLDER_GROUPS
				: [];

		return (
			<ArchiveListView
				title={title}
				isFullscreen={fullscreen === "yes"}
				minHeight={minHeight}
				isEditorPlaceholder={isEditorPlaceholder}
				groups={groups}
				categories={metadata.archiveCategories}
				tags={metadata.archiveTags}
				showCategoryFilter={showCategoryFilter !== "no"}
				showTagFilter={showTagFilter !== "no"}
			/>
		);
	},
};

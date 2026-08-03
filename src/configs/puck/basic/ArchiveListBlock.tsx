import type { ComponentConfig } from "@puckeditor/core";
import type { PuckArchiveGroup, PuckArticleMetadata } from "../types";

export type ArchiveListBlockProps = {
	title: string;
};

const PLACEHOLDER_GROUPS: PuckArchiveGroup[] = [
	{
		year: "年份",
		posts: [
			{ title: "文章标题（由归档数据注入）", href: "#", date: "00-00" },
			{ title: "另一篇文章", href: "#", date: "00-00" },
		],
	},
];

export const ArchiveListBlock: ComponentConfig<ArchiveListBlockProps> = {
	label: "归档列表",
	fields: {
		title: { type: "text", label: "区块标题" },
	},
	defaultProps: {
		title: "文章归档",
	},
	render: ({ title, puck }) => {
		const metadata = puck.metadata as PuckArticleMetadata;
		const hasData = Boolean(metadata.archiveGroups?.length);
		const isEditorPlaceholder = puck.isEditing && !hasData;
		const resolvedGroups = hasData
			? (metadata.archiveGroups as PuckArchiveGroup[])
			: isEditorPlaceholder
				? PLACEHOLDER_GROUPS
				: [];

		return (
			<section className={`w-full px-6 py-14${isEditorPlaceholder ? " opacity-60" : ""}`}>
				<div className="max-w-3xl mx-auto">
					{title && <h1 className="text-3xl font-bold tracking-tight mb-10">{title}</h1>}
					{resolvedGroups.length === 0 ? (
						<p className="text-muted-foreground">暂无已发布文章</p>
					) : (
						<div className="space-y-10">
							{resolvedGroups.map((group) => (
								<div key={group.year}>
									<h2 className="text-lg font-semibold mb-4 text-muted-foreground">{group.year}</h2>
									<ul className="space-y-3">
										{group.posts.map((post) => (
											<li key={`${post.title}-${post.date}`} className="flex items-baseline gap-4">
												<span className="text-xs text-muted-foreground w-12 shrink-0 tabular-nums">{post.date}</span>
												<a href={post.href} className="font-medium hover:opacity-70 transition">
													{post.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		);
	},
};

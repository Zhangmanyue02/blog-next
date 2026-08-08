import type { ComponentConfig } from "@puckeditor/core";
import type { PuckArchiveGroup, PuckArticleMetadata } from "../types";

type YesNo = "yes" | "no";

export type ArchiveListBlockProps = {
	title: string;
	fullscreen: YesNo;
	minHeight: number;
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
		fullscreen: { ...yesNo, label: "全屏高度" },
		minHeight: { type: "number", label: "最小高度(px，非全屏时)" },
	},
	defaultProps: {
		title: "文章归档",
		fullscreen: "no",
		minHeight: 480,
	},
	render: ({ title, fullscreen, minHeight, puck }) => {
		const metadata = puck.metadata as PuckArticleMetadata;
		const hasData = Boolean(metadata.archiveGroups?.length);
		const isEditorPlaceholder = puck.isEditing && !hasData;
		const groups = hasData
			? (metadata.archiveGroups as PuckArchiveGroup[])
			: isEditorPlaceholder
				? PLACEHOLDER_GROUPS
				: [];

		const isFullscreen = fullscreen === "yes";

		return (
			<section
				className={`w-full${isEditorPlaceholder ? " opacity-60" : ""}`}
				style={{
					minHeight: isFullscreen ? "100dvh" : minHeight,
					height: isFullscreen ? "100dvh" : undefined,
				}}
			>
				<div
					className={`mx-auto flex h-full max-w-3xl flex-col px-6${
						isFullscreen ? " py-16 md:py-20" : " py-14"
					}`}
				>
					{title && (
						<h1
							className={`shrink-0 font-bold tracking-tight${
								isFullscreen ? " mb-12 text-3xl md:mb-14 md:text-4xl" : " mb-10 text-3xl"
							}`}
						>
							{title}
						</h1>
					)}

					{groups.length === 0 ? (
						<p className="text-muted-foreground">暂无已发布文章</p>
					) : (
						<div className={`min-h-0 flex-1 space-y-10${isFullscreen ? " overflow-y-auto" : ""}`}>
							{groups.map((group) => (
								<div key={group.year}>
									<h2 className="mb-4 text-lg font-semibold text-muted-foreground">{group.year}</h2>
									<ul className={isFullscreen ? "space-y-4" : "space-y-3"}>
										{group.posts.map((post) => (
											<li key={`${post.title}-${post.date}`} className="flex items-baseline gap-4">
												<span className="w-12 shrink-0 text-xs tabular-nums text-muted-foreground">
													{post.date}
												</span>
												<a href={post.href} className="font-medium transition hover:opacity-70">
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

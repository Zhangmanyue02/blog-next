import type { ComponentConfig } from "@puckeditor/core";
import type { PuckArticleMetadata } from "../types";

export type ArticleHeaderBlockProps = Record<string, never>;

const PLACEHOLDER_POST = {
	title: "文章标题（由文章数据注入）",
	summary: "文章摘要会显示在这里。",
	createBy: "作者",
	createTime: "发布日期",
} as const;

export const ArticleHeaderBlock: ComponentConfig<ArticleHeaderBlockProps> = {
	label: "文章头",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const metadata = puck.metadata as PuckArticleMetadata;
		const post = metadata.post;
		const isPlaceholder = !post;
		const title = post?.title || (puck.isEditing ? PLACEHOLDER_POST.title : "");
		const summary = post?.summary || (puck.isEditing ? PLACEHOLDER_POST.summary : "");
		const author = post?.createBy || (puck.isEditing ? PLACEHOLDER_POST.createBy : "");
		const date = post?.createTime || (puck.isEditing ? PLACEHOLDER_POST.createTime : "");

		if (!title && !summary && !author && !date) {
			return <div className="hidden" />;
		}

		return (
			<header className={`w-full px-6 pt-14 pb-8 border-b border-border/80${isPlaceholder ? " opacity-60" : ""}`}>
				<div className="max-w-3xl mx-auto">
					{(author || date) && (
						<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
							{author && <span>{author}</span>}
							{date && <span>{date}</span>}
						</div>
					)}
					{title && <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>}
					{summary && (
						<p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6">{summary}</p>
					)}
				</div>
			</header>
		);
	},
};

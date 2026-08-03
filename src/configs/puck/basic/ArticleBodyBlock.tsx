import type { ComponentConfig } from "@puckeditor/core";
import type { PuckArticleMetadata } from "../types";

export type ArticleBodyBlockProps = Record<string, never>;

const PLACEHOLDER_HTML =
	"<p>文章正文（由文章数据注入）。编辑器中显示占位内容；前台将渲染真实 HTML/Markdown 正文。</p>";

export const ArticleBodyBlock: ComponentConfig<ArticleBodyBlockProps> = {
	label: "文章正文",
	fields: {},
	defaultProps: {},
	render: ({ puck }) => {
		const metadata = puck.metadata as PuckArticleMetadata;
		const content = metadata.post?.content;
		const isPlaceholder = !content;
		const html = content || (puck.isEditing ? PLACEHOLDER_HTML : "");

		if (!html) {
			return <div className="hidden" />;
		}

		return (
			<article className={`w-full px-6 py-10${isPlaceholder ? " opacity-60" : ""}`}>
				<div
					className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert space-y-5 text-base leading-8 text-foreground/90"
					// 正文来自后台文章 CMS；前台渲染层应在注入 metadata 前完成消毒
					// biome-ignore lint/security/noDangerouslySetInnerHtml: CMS HTML，消毒在渲染注入层处理
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</article>
		);
	},
};

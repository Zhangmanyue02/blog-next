import type { ComponentConfig } from "@puckeditor/core";

export type ArticleBodyBlockProps = {
	content: string;
};

export const ArticleBodyBlock: ComponentConfig<ArticleBodyBlockProps> = {
	label: "文章正文",
	fields: {
		content: { type: "textarea", label: "正文（纯文本，段落用空行分隔）" },
	},
	defaultProps: {
		content:
			"个人博客最重要的不是炫技，而是能否持续写出对自己有用的记录。\n\n从站点结构开始：首页负责建立气质与导航，文章页专注阅读，归档页方便回看。页面编辑器则把「布局调整」从改代码变成拖拽组合。\n\n写作节奏可以很轻：每周一篇笔记，或每次踩坑后补一篇复盘。工具服务于内容，而不是反过来。",
	},
	render: ({ content }) => {
		const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
		return (
			<article className="w-full px-6 py-10">
				<div className="max-w-3xl mx-auto space-y-5">
					{paragraphs.map((paragraph) => (
						<p key={paragraph.slice(0, 24)} className="text-base leading-8 text-foreground/90 whitespace-pre-wrap">
							{paragraph.trim()}
						</p>
					))}
				</div>
			</article>
		);
	},
};

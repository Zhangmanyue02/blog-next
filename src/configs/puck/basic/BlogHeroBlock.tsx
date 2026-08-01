import type { ComponentConfig } from "@puckeditor/core";

export type BlogHeroBlockProps = {
	siteName: string;
	headline: string;
	description: string;
	ctaLabel: string;
	ctaHref: string;
};

export const BlogHeroBlock: ComponentConfig<BlogHeroBlockProps> = {
	label: "博客首屏",
	fields: {
		siteName: { type: "text", label: "站点名" },
		headline: { type: "text", label: "主标题" },
		description: { type: "textarea", label: "简介" },
		ctaLabel: { type: "text", label: "按钮文案" },
		ctaHref: { type: "text", label: "按钮链接" },
	},
	defaultProps: {
		siteName: "Alvin's Notes",
		headline: "写代码，也写一点生活",
		description: "前端工程、工具流与读书笔记。偶尔分享一些把复杂事情讲简单的尝试。",
		ctaLabel: "浏览文章",
		ctaHref: "#latest",
	},
	render: ({ siteName, headline, description, ctaLabel, ctaHref }) => (
		<section className="relative w-full overflow-hidden border-b border-border/80 bg-muted/30">
			<div
				className="absolute inset-0 opacity-70"
				style={{
					backgroundImage:
						"radial-gradient(ellipse 70% 55% at 15% 10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent), radial-gradient(ellipse 55% 45% at 90% 0%, color-mix(in oklab, var(--muted-foreground) 10%, transparent), transparent)",
				}}
			/>
			<div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28">
				<p className="text-sm font-medium tracking-wide text-muted-foreground mb-4">{siteName}</p>
				<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">{headline}</h1>
				<p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl whitespace-pre-wrap mb-8">
					{description}
				</p>
				{ctaLabel && (
					<a
						href={ctaHref}
						className="inline-flex items-center text-sm font-medium border-b border-foreground pb-0.5 hover:opacity-70 transition"
					>
						{ctaLabel}
					</a>
				)}
			</div>
		</section>
	),
};

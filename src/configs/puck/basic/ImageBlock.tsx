import type { ComponentConfig } from "@puckeditor/core";

export type ImageBlockProps = {
	src: string;
	alt: string;
	caption: string;
	width: "full" | "wide" | "narrow";
};

const widthClass: Record<ImageBlockProps["width"], string> = {
	full: "max-w-6xl",
	wide: "max-w-4xl",
	narrow: "max-w-2xl",
};

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
	label: "图片",
	fields: {
		src: { type: "text", label: "图片 URL" },
		alt: { type: "text", label: "替代文本" },
		caption: { type: "text", label: "图注" },
		width: {
			type: "select",
			label: "宽度",
			options: [
				{ label: "全宽", value: "full" },
				{ label: "较宽", value: "wide" },
				{ label: "较窄", value: "narrow" },
			],
		},
	},
	defaultProps: {
		src: "https://placehold.co/1200x675",
		alt: "配图",
		caption: "",
		width: "wide",
	},
	render: ({ src, alt, caption, width }) => (
		<figure className="w-full px-6 py-6">
			<div className={`mx-auto ${widthClass[width]}`}>
				<img src={src} alt={alt} className="w-full h-auto object-cover" />
				{caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>}
			</div>
		</figure>
	),
};

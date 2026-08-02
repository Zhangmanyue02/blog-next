import type { ComponentConfig } from "@puckeditor/core";
import type { CSSProperties } from "react";

export type ImageBlockProps = {
	src: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
	objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
};

const toCssSize = (value: number): string | undefined => (value > 0 ? `${value}px` : undefined);

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
	label: "图片",
	fields: {
		src: { type: "text", label: "图片 URL" },
		alt: { type: "text", label: "替代文本" },
		caption: { type: "text", label: "图注" },
		width: { type: "number", label: "宽度(px，0=自适应)" },
		height: { type: "number", label: "高度(px，0=自适应)" },
		objectFit: {
			type: "select",
			label: "填充方式",
			options: [
				{ label: "cover", value: "cover" },
				{ label: "contain", value: "contain" },
				{ label: "fill", value: "fill" },
				{ label: "none", value: "none" },
				{ label: "scale-down", value: "scale-down" },
			],
		},
	},
	defaultProps: {
		src: "https://placehold.co/1200x675",
		alt: "配图",
		caption: "",
		width: 0,
		height: 0,
		objectFit: "cover",
	},
	render: ({ src, alt, caption, width, height, objectFit }) => {
		const cssWidth = toCssSize(width);
		const cssHeight = toCssSize(height);
		const imgStyle: CSSProperties = {
			width: cssWidth ?? "100%",
			height: cssHeight ?? "auto",
			objectFit,
			maxWidth: "100%",
		};

		return (
			<figure className="block" style={{ width: cssWidth ?? "100%" }}>
				<img src={src} alt={alt} className="block" style={imgStyle} />
				{caption ? <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption> : null}
			</figure>
		);
	},
};

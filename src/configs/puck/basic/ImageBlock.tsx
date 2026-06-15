import type { ComponentConfig } from "@puckeditor/core";

export type ImageBlockProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded: boolean;
};

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  label: "图片",
  fields: {
    src: { type: "text", label: "图片地址(URL)" },
    alt: { type: "text", label: "替代文本" },
    width: { type: "number", label: "宽度(px)" },
    height: { type: "number", label: "高度(px)" },
    rounded: { type: "radio", label: "圆角", options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ]},
  },
  defaultProps: {
    src: "https://placehold.co/800x400",
    alt: "占位图",
    width: 800,
    height: 400,
    rounded: false,
  },
  render: ({ src, alt, width, height, rounded }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={rounded ? "rounded-lg" : ""}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  ),
};

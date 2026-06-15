import type { ComponentConfig } from "@puckeditor/core";

export type TextBlockProps = {
  text: string;
  align: "left" | "center" | "right";
  size: "sm" | "md" | "lg";
  color: string;
};

export const TextBlock: ComponentConfig<TextBlockProps> = {
  label: "段落",
  fields: {
    text: { type: "textarea", label: "文本" },
    align: {
      type: "radio",
      label: "对齐",
      options: [
        { label: "左", value: "left" },
        { label: "中", value: "center" },
        { label: "右", value: "right" },
      ],
    },
    size: {
      type: "select",
      label: "字号",
      options: [
        { label: "小", value: "sm" },
        { label: "中", value: "md" },
        { label: "大", value: "lg" },
      ],
    },
    color: { type: "text", label: "颜色(hex)" },
  },
  defaultProps: {
    text: "这是一段正文内容。",
    align: "left",
    size: "md",
    color: "#374151",
  },
  render: ({ text, align, size, color }) => {
    const sizeClass =
      size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
    return (
      <p
        style={{ textAlign: align, color }}
        className={`${sizeClass} leading-relaxed whitespace-pre-wrap`}
      >
        {text}
      </p>
    );
  },
};

import type { ComponentConfig } from "@puckeditor/core";
import type { CSSProperties } from "react";

export type HeadingBlockProps = {
  text: string;
  level: "h1" | "h2" | "h3" | "h4";
  align: "left" | "center" | "right";
  color: string;
};

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
  label: "标题",
  fields: {
    text: { type: "text", label: "内容" },
    level: {
      type: "select",
      label: "级别",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    align: {
      type: "radio",
      label: "对齐",
      options: [
        { label: "左", value: "left" },
        { label: "中", value: "center" },
        { label: "右", value: "right" },
      ],
    },
    color: { type: "text", label: "颜色(hex)" },
  },
  defaultProps: {
    text: "这是一个标题",
    level: "h2",
    align: "left",
    color: "#111827",
  },
  render: ({ text, level, align, color }) => {
    const className = "font-bold leading-tight";
    const style: CSSProperties = { textAlign: align, color };
    if (level === "h1") return <h1 style={style} className={className}>{text}</h1>;
    if (level === "h2") return <h2 style={style} className={className}>{text}</h2>;
    if (level === "h3") return <h3 style={style} className={className}>{text}</h3>;
    return <h4 style={style} className={className}>{text}</h4>;
  },
};

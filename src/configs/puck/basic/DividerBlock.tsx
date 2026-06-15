import type { ComponentConfig } from "@puckeditor/core";

export type DividerBlockProps = {
  color: string;
  thickness: number;
};

export const DividerBlock: ComponentConfig<DividerBlockProps> = {
  label: "分割线",
  fields: {
    color: { type: "text", label: "颜色(hex)" },
    thickness: { type: "number", label: "粗细(px)" },
  },
  defaultProps: {
    color: "#e5e7eb",
    thickness: 1,
  },
  render: ({ color, thickness }) => (
    <hr
      style={{ border: "none", backgroundColor: color, height: thickness }}
    />
  ),
};

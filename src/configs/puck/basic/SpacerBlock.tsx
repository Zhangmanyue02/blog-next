import type { ComponentConfig } from "@puckeditor/core";

export type SpacerBlockProps = {
  height: number;
};

export const SpacerBlock: ComponentConfig<SpacerBlockProps> = {
  label: "间距",
  fields: {
    height: { type: "number", label: "高度(px)" },
  },
  defaultProps: {
    height: 40,
  },
  render: ({ height }) => <div style={{ height }} />,
};

"use client";

import type { ComponentConfig } from "@puckeditor/core";
import { DropZone } from "@puckeditor/core";
import type { ReactNode } from "react";

export type GridBlockProps = {
  columns: 1 | 2 | 3 | 4 | 5 | 6;
  gap: number;
  padding: number;
  minHeight: number;
  background: string;
  cells: ReactNode;
};

export const GridBlock: ComponentConfig<GridBlockProps> = {
  label: "Grid 容器",
  fields: {
    columns: {
      type: "select",
      label: "列数",
      options: [
        { label: "1 列", value: 1 },
        { label: "2 列", value: 2 },
        { label: "3 列", value: 3 },
        { label: "4 列", value: 4 },
        { label: "5 列", value: 5 },
        { label: "6 列", value: 6 },
      ],
    },
    gap: { type: "number", label: "网格间距(px)" },
    padding: { type: "number", label: "内边距(px)" },
    minHeight: { type: "number", label: "最小高度(px)" },
    background: { type: "text", label: "背景色(可空)" },
    cells: { type: "slot", label: "子组件" },
  },
  defaultProps: {
    columns: 3,
    gap: 16,
    padding: 16,
    minHeight: 80,
    background: "",
    cells: [],
  },
  render: ({ columns, gap, padding, minHeight, background, cells: _cells }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        padding: `${padding}px`,
        minHeight,
        background: background || undefined,
      }}
    >
      <DropZone zone="cells" minEmptyHeight={minHeight} allow={[]} disallow={[]} />
    </div>
  ),
};

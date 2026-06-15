"use client";

import type { ComponentConfig } from "@puckeditor/core";
import { DropZone } from "@puckeditor/core";
import type { ReactNode } from "react";

export type FlexBlockProps = {
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  justify: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap: "nowrap" | "wrap" | "wrap-reverse";
  gap: number;
  padding: number;
  minHeight: number;
  background: string;
  items: ReactNode;
};

export const FlexBlock: ComponentConfig<FlexBlockProps> = {
  label: "Flex 容器",
  fields: {
    direction: {
      type: "select",
      label: "方向",
      options: [
        { label: "行 →", value: "row" },
        { label: "列 ↓", value: "column" },
        { label: "行 ←", value: "row-reverse" },
        { label: "列 ↑", value: "column-reverse" },
      ],
    },
    justify: {
      type: "select",
      label: "主轴对齐",
      options: [
        { label: "起点", value: "flex-start" },
        { label: "居中", value: "center" },
        { label: "终点", value: "flex-end" },
        { label: "两端", value: "space-between" },
        { label: "环绕", value: "space-around" },
        { label: "均分", value: "space-evenly" },
      ],
    },
    align: {
      type: "select",
      label: "交叉对齐",
      options: [
        { label: "起点", value: "flex-start" },
        { label: "居中", value: "center" },
        { label: "终点", value: "flex-end" },
        { label: "拉伸", value: "stretch" },
        { label: "基线", value: "baseline" },
      ],
    },
    wrap: {
      type: "select",
      label: "换行",
      options: [
        { label: "不换行", value: "nowrap" },
        { label: "换行", value: "wrap" },
        { label: "反向换行", value: "wrap-reverse" },
      ],
    },
    gap: { type: "number", label: "子项间距(px)" },
    padding: { type: "number", label: "内边距(px)" },
    minHeight: { type: "number", label: "最小高度(px)" },
    background: { type: "text", label: "背景色(可空)" },
    items: { type: "slot", label: "子组件" },
  },
  defaultProps: {
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "wrap",
    gap: 16,
    padding: 16,
    minHeight: 80,
    background: "",
    items: [],
  },
  render: ({
    direction,
    justify,
    align,
    wrap,
    gap,
    padding,
    minHeight,
    background,
  }) => (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap: `${gap}px`,
        padding: `${padding}px`,
        minHeight,
        background: background || undefined,
      }}
    >
      <DropZone zone="items" minEmptyHeight={minHeight} allow={[]} disallow={[]} />
    </div>
  ),
};

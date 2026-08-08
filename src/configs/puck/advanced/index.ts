import { AboutBentoBlock } from "./AboutBentoBlock";
import { AuroraBlock } from "./AuroraBlock";
import { LightfallBackgroundBlock } from "./LightfallBackgroundBlock";
import { LightPillarBlock } from "./LightPillarBlock";
import { LineWavesBlock } from "./LineWavesBlock";
import { LogoLoopBlock } from "./LogoLoopBlock";
import { MagicBentoBlock } from "./MagicBentoBlock";
import { SpotlightCardBlock } from "./SpotlightCardBlock";
import { TextTypeBlock } from "./TextTypeBlock";
import { ThreadsBlock } from "./ThreadsBlock";

/** 高级组件（动效/光效等）— 页面/模板编辑器可用 */
export const advancedComponentMap = {
	AboutBentoBlock,
	AuroraBlock,
	LightfallBackgroundBlock,
	LightPillarBlock,
	LineWavesBlock,
	LogoLoopBlock,
	MagicBentoBlock,
	SpotlightCardBlock,
	TextTypeBlock,
	ThreadsBlock,
};

/** 出现在「高级」侧栏的组件（关于向组件归入「关于」分类） */
export const advancedSidebarComponents = Object.keys(advancedComponentMap).filter(
	(key) => key !== "AboutBentoBlock",
);

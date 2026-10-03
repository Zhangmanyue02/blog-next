import type { Config } from "@puckeditor/core";
import { PortfolioAboutIntroBlock } from "./PortfolioAboutIntroBlock";
import { PortfolioContactCardBlock } from "./PortfolioContactCardBlock";
import { PortfolioEducationBlock } from "./PortfolioEducationBlock";
import { PortfolioExperienceBlock } from "./PortfolioExperienceBlock";
import { PortfolioHeroBlock } from "./PortfolioHeroBlock";
import { PortfolioPolaroidStripBlock } from "./PortfolioPolaroidStripBlock";
import { PortfolioProjectsGridBlock } from "./PortfolioProjectsGridBlock";
import { PortfolioSectionBlock } from "./PortfolioSectionBlock";
import { PortfolioShaderBackgroundBlock } from "./PortfolioShaderBackgroundBlock";
import { PortfolioSkillsBlock } from "./PortfolioSkillsBlock";
import { PortfolioSpacerBlock } from "./PortfolioSpacerBlock";
import { PortfolioStackBlock } from "./PortfolioStackBlock";

export type {
	PortfolioAboutIntroViewProps,
	PortfolioContactCardViewProps,
	PortfolioEducationViewItem,
	PortfolioExperienceViewItem,
	PortfolioHeroViewProps,
	PortfolioPolaroidViewItem,
	PortfolioProjectIconKey,
	PortfolioProjectViewItem,
	PortfolioProjectsGridViewProps,
	PortfolioSkillViewItem,
	PortfolioSocialViewItem,
	PortfolioStackViewItem,
} from "./types";
export { PORTFOLIO_PROJECT_ICON_KEYS } from "./types";

/** 作品集组件包；侧栏分类：作品集 / 关于 / 联系。组件 key 全部 Portfolio* 前缀 */
export function getPortfolioConfig(): Config {
	return {
		categories: {
			作品集: {
				title: "作品集",
				components: [
					"PortfolioHeroBlock",
					"PortfolioProjectsGridBlock",
					"PortfolioShaderBackgroundBlock",
					"PortfolioSectionBlock",
					"PortfolioSpacerBlock",
				],
				defaultExpanded: true,
			},
			关于: {
				title: "关于",
				components: [
					"PortfolioPolaroidStripBlock",
					"PortfolioAboutIntroBlock",
					"PortfolioExperienceBlock",
					"PortfolioEducationBlock",
					"PortfolioSkillsBlock",
					"PortfolioStackBlock",
				],
			},
			联系: {
				title: "联系",
				components: ["PortfolioContactCardBlock"],
			},
		},
		components: {
			PortfolioHeroBlock,
			PortfolioProjectsGridBlock,
			PortfolioPolaroidStripBlock,
			PortfolioAboutIntroBlock,
			PortfolioExperienceBlock,
			PortfolioEducationBlock,
			PortfolioSkillsBlock,
			PortfolioStackBlock,
			PortfolioContactCardBlock,
			PortfolioShaderBackgroundBlock,
			PortfolioSectionBlock,
			PortfolioSpacerBlock,
		},
	};
}

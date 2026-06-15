import type { Config, Data } from "@puckeditor/core";
import {
  HeadingBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  DividerBlock,
  SpacerBlock,
  HeroBlock,
  PortraitHeroBlock,
  QuoteHeroBlock,
  LatestPostHeroBlock,
  FeaturesBlock,
  CTABlock,
  FlexBlock,
  GridBlock,
  NavbarBlock,
  FooterBlock,
  ArticleCardBlock,
  ArticleListBlock,
  CategoriesBlock,
  TagCloudBlock,
  SearchBarBlock,
  NewsletterBlock,
  AuthorBioBlock,
} from "./basic";
import { advancedComponentMap } from "./advanced";

/** 模板编辑器专用：基础 + 首屏 + 布局 + 博客 */
export const getBasicConfig = (): Config => ({
  categories: {
    基础: {
      title: "基础",
      components: [
        "HeadingBlock",
        "TextBlock",
        "ImageBlock",
        "ButtonBlock",
        "DividerBlock",
        "SpacerBlock",
      ],
      defaultExpanded: true,
    },
    首屏: {
      title: "首屏",
      components: [
        "PortraitHeroBlock",
        "QuoteHeroBlock",
        "LatestPostHeroBlock",
        "HeroBlock",
      ],
      defaultExpanded: true,
    },
    布局: {
      title: "布局",
      components: ["FeaturesBlock", "CTABlock", "FlexBlock", "GridBlock"],
    },
    博客: {
      title: "博客",
      components: [
        "NavbarBlock",
        "FooterBlock",
        "ArticleCardBlock",
        "ArticleListBlock",
        "CategoriesBlock",
        "TagCloudBlock",
        "SearchBarBlock",
        "NewsletterBlock",
        "AuthorBioBlock",
      ],
      defaultExpanded: false,
    },
  },
  components: {
    HeadingBlock,
    TextBlock,
    ImageBlock,
    ButtonBlock,
    DividerBlock,
    SpacerBlock,
    HeroBlock,
    PortraitHeroBlock,
    QuoteHeroBlock,
    LatestPostHeroBlock,
    FeaturesBlock,
    CTABlock,
    FlexBlock,
    GridBlock,
    NavbarBlock,
    FooterBlock,
    ArticleCardBlock,
    ArticleListBlock,
    CategoriesBlock,
    TagCloudBlock,
    SearchBarBlock,
    NewsletterBlock,
    AuthorBioBlock,
  },
});

/** 页面编辑器专用：基础 + 首屏 + 布局 + 博客 + 高级 */
export const getAdvancedConfig = (): Config => ({
  categories: {
    基础: {
      title: "基础",
      components: [
        "HeadingBlock",
        "TextBlock",
        "ImageBlock",
        "ButtonBlock",
        "DividerBlock",
        "SpacerBlock",
      ],
      defaultExpanded: true,
    },
    首屏: {
      title: "首屏",
      components: [
        "PortraitHeroBlock",
        "QuoteHeroBlock",
        "LatestPostHeroBlock",
        "HeroBlock",
      ],
      defaultExpanded: true,
    },
    布局: {
      title: "布局",
      components: ["FeaturesBlock", "CTABlock", "FlexBlock", "GridBlock"],
    },
    博客: {
      title: "博客",
      components: [
        "NavbarBlock",
        "FooterBlock",
        "ArticleCardBlock",
        "ArticleListBlock",
        "CategoriesBlock",
        "TagCloudBlock",
        "SearchBarBlock",
        "NewsletterBlock",
        "AuthorBioBlock",
      ],
      defaultExpanded: false,
    },
    高级: {
      title: "高级",
      components: [
        "TextType",
        "GradientText",
        "ScrollVelocity",
        "LogoLoop",
        "ClickSpark",
        "SplashCursor",
      ],
    },
  },
  components: {
    HeadingBlock,
    TextBlock,
    ImageBlock,
    ButtonBlock,
    DividerBlock,
    SpacerBlock,
    HeroBlock,
    PortraitHeroBlock,
    QuoteHeroBlock,
    LatestPostHeroBlock,
    FeaturesBlock,
    CTABlock,
    FlexBlock,
    GridBlock,
    NavbarBlock,
    FooterBlock,
    ArticleCardBlock,
    ArticleListBlock,
    CategoriesBlock,
    TagCloudBlock,
    SearchBarBlock,
    NewsletterBlock,
    AuthorBioBlock,
    ...advancedComponentMap,
  },
});

/** 空 Puck data（新增空白页/模板时使用） */
export const getEmptyPuckData = (): Data => ({
  root: { props: {} },
  content: [],
  zones: {},
});

/** 博客首页模板（可直接套用） */
export { blogHomepageTemplate } from "./templates/blog-homepage";

"use client";

import { useMemo, useState } from "react";
import type { PuckArchiveFilterOption, PuckArchiveGroup, PuckArchivePostItem } from "../types";

export type ArchiveListViewProps = {
	title: string;
	isFullscreen: boolean;
	minHeight: number;
	isEditorPlaceholder?: boolean;
	groups: PuckArchiveGroup[];
	categories?: PuckArchiveFilterOption[];
	tags?: PuckArchiveFilterOption[];
	showCategoryFilter?: boolean;
	showTagFilter?: boolean;
};

function flattenPosts(groups: PuckArchiveGroup[]): PuckArchivePostItem[] {
	return groups.flatMap((group) => group.posts);
}

function deriveCategories(posts: PuckArchivePostItem[]): PuckArchiveFilterOption[] {
	const map = new Map<string, PuckArchiveFilterOption>();
	for (const post of posts) {
		if (!post.categoryId || !post.categoryName) continue;
		if (!map.has(post.categoryId)) {
			map.set(post.categoryId, { id: post.categoryId, name: post.categoryName });
		}
	}
	return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

function deriveTags(posts: PuckArchivePostItem[]): PuckArchiveFilterOption[] {
	const map = new Map<string, PuckArchiveFilterOption>();
	for (const post of posts) {
		for (const tag of post.tags || []) {
			if (!tag.id || !tag.name || map.has(tag.id)) continue;
			map.set(tag.id, { id: tag.id, name: tag.name, color: tag.color });
		}
	}
	return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

function filterGroups(
	groups: PuckArchiveGroup[],
	categoryId: string | null,
	tagId: string | null,
): PuckArchiveGroup[] {
	return groups
		.map((group) => ({
			...group,
			posts: group.posts.filter((post) => {
				if (categoryId && post.categoryId !== categoryId) return false;
				if (tagId && !(post.tagIds || []).includes(tagId)) return false;
				return true;
			}),
		}))
		.filter((group) => group.posts.length > 0);
}

function FilterChip({
	active,
	label,
	color,
	onClick,
}: {
	active: boolean;
	label: string;
	color?: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${
				active
					? "bg-foreground text-background"
					: "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
			}`}
		>
			{color ? (
				<span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden />
			) : null}
			{label}
		</button>
	);
}

export function ArchiveListView({
	title,
	isFullscreen,
	minHeight,
	isEditorPlaceholder = false,
	groups,
	categories: categoriesProp,
	tags: tagsProp,
	showCategoryFilter = true,
	showTagFilter = true,
}: ArchiveListViewProps) {
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [tagId, setTagId] = useState<string | null>(null);

	const allPosts = useMemo(() => flattenPosts(groups), [groups]);
	const categories = useMemo(
		() => (categoriesProp?.length ? categoriesProp : deriveCategories(allPosts)),
		[categoriesProp, allPosts],
	);
	const tags = useMemo(
		() => (tagsProp?.length ? tagsProp : deriveTags(allPosts)),
		[tagsProp, allPosts],
	);

	const filteredGroups = useMemo(
		() => filterGroups(groups, categoryId, tagId),
		[groups, categoryId, tagId],
	);

	const showFilters =
		(showCategoryFilter && categories.length > 0) || (showTagFilter && tags.length > 0);
	const hasActiveFilter = Boolean(categoryId || tagId);

	return (
		<section
			className={`w-full${isEditorPlaceholder ? " opacity-60" : ""}`}
			style={{
				minHeight: isFullscreen ? "100dvh" : minHeight,
				height: isFullscreen ? "100dvh" : undefined,
			}}
		>
			<div
				className={`mx-auto flex h-full max-w-3xl flex-col px-6${isFullscreen ? " py-16 md:py-20" : " py-14"}`}
			>
				{title ? (
					<h1
						className={`shrink-0 font-bold tracking-tight${
							isFullscreen ? " mb-8 text-3xl md:mb-10 md:text-4xl" : " mb-8 text-3xl"
						}`}
					>
						{title}
					</h1>
				) : null}

				{showFilters ? (
					<div className="mb-8 shrink-0 space-y-4">
						{showCategoryFilter && categories.length > 0 ? (
							<div className="flex flex-wrap items-center gap-2">
								<span className="mr-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
									分类
								</span>
								<FilterChip active={!categoryId} label="全部" onClick={() => setCategoryId(null)} />
								{categories.map((item) => (
									<FilterChip
										key={item.id}
										active={categoryId === item.id}
										label={item.name}
										onClick={() => setCategoryId((prev) => (prev === item.id ? null : item.id))}
									/>
								))}
							</div>
						) : null}

						{showTagFilter && tags.length > 0 ? (
							<div className="flex flex-wrap items-center gap-2">
								<span className="mr-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
									标签
								</span>
								<FilterChip active={!tagId} label="全部" onClick={() => setTagId(null)} />
								{tags.map((item) => (
									<FilterChip
										key={item.id}
										active={tagId === item.id}
										label={item.name}
										color={item.color}
										onClick={() => setTagId((prev) => (prev === item.id ? null : item.id))}
									/>
								))}
							</div>
						) : null}
					</div>
				) : null}

				{filteredGroups.length === 0 ? (
					<p className="text-muted-foreground">
						{groups.length === 0
							? "暂无已发布文章"
							: hasActiveFilter
								? "当前筛选条件下暂无文章"
								: "暂无已发布文章"}
					</p>
				) : (
					<div className={`min-h-0 flex-1 space-y-10${isFullscreen ? " overflow-y-auto" : ""}`}>
						{filteredGroups.map((group) => (
							<div key={group.year}>
								<h2 className="mb-4 text-lg font-semibold text-muted-foreground">{group.year}</h2>
								<ul className={isFullscreen ? "space-y-4" : "space-y-3"}>
									{group.posts.map((post) => (
										<li
											key={`${post.href}-${post.title}-${post.date}`}
											className="flex items-baseline gap-4"
										>
											<span className="w-12 shrink-0 text-xs tabular-nums text-muted-foreground">
												{post.date}
											</span>
											<div className="min-w-0 flex-1">
												<a href={post.href} className="font-medium transition hover:opacity-70">
													{post.title}
												</a>
												{(post.categoryName || (post.tags && post.tags.length > 0)) && (
													<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
														{post.categoryName ? <span>{post.categoryName}</span> : null}
														{(post.tags || []).map((tag) => (
															<span key={tag.id} className="inline-flex items-center gap-1">
																{tag.color ? (
																	<span
																		className="h-1.5 w-1.5 rounded-full"
																		style={{ backgroundColor: tag.color }}
																		aria-hidden
																	/>
																) : null}
																#{tag.name}
															</span>
														))}
													</div>
												)}
											</div>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

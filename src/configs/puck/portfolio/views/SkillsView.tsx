import type { ReactNode } from "react";
import type { PortfolioSkillViewItem } from "../types";

export function SkillsView({ items }: { items: PortfolioSkillViewItem[] }): ReactNode {
	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-[15px] font-semibold tracking-tight text-foreground">What I do</h3>
			<div className="rounded-[2rem] border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
				<div className="flex flex-wrap gap-3">
					{items.map((skill) => (
						<span
							key={skill.name}
							className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
						>
							{skill.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

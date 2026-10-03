import type { ReactNode } from "react";
import type { PortfolioEducationViewItem } from "../types";

const ROW_HEIGHT = 64;

function SchoolLogo({ entry }: { entry: PortfolioEducationViewItem }): ReactNode {
	const initials = entry.school.charAt(0);
	return (
		<span
			className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-foreground/15"
			aria-hidden="true"
			style={{ borderRadius: 14 }}
		>
			{entry.logoUrl ? (
				<img src={entry.logoUrl} alt="" width={24} height={24} className="h-6 w-6" draggable={false} />
			) : (
				<span className="text-[18px] font-semibold tracking-tight text-foreground/60">{initials}</span>
			)}
		</span>
	);
}

export function EducationView({ items }: { items: PortfolioEducationViewItem[] }): ReactNode {
	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-[15px] font-semibold tracking-tight text-foreground">Education</h3>
			<div className="relative rounded-[2rem] border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
				<ul className="flex flex-col gap-2">
					{items.map((entry) => (
						<li
							key={`${entry.school}-${entry.period}`}
							className="flex items-center gap-4 rounded-3xl border border-foreground/5 bg-background p-2"
							style={{ minHeight: ROW_HEIGHT }}
						>
							<SchoolLogo entry={entry} />
							<div className="flex min-w-0 flex-col">
								<span className="text-[17px] font-semibold tracking-tight text-foreground sm:text-[18px]">
									{entry.school}
								</span>
								<span className="mt-0.5 text-[14px] tracking-tight text-foreground/65 sm:text-[15px]">
									{entry.degree}
									<span className="mx-2 text-foreground/30">•</span>
									<span className="text-foreground/55">{entry.period}</span>
								</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

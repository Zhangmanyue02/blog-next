import type { BoundSiteState } from "@/lib/bound-application";

export function BoundSiteEmpty({ reason }: { reason: BoundSiteState["reason"] }) {
	const message =
		reason === "missing-env"
			? "未配置 NEXT_PUBLIC_APPLICATION_CODE，无法绑定站点应用。"
			: "找不到已启用的绑定应用，或该应用下没有可识别的已发布页面。";

	return (
		<main className="mx-auto max-w-3xl px-6 py-16" data-testid="bound-site-empty">
			<h1 className="text-2xl font-semibold">站点未就绪</h1>
			<p className="mt-4 text-zinc-600">{message}</p>
		</main>
	);
}

import type { CSSProperties, ReactNode } from "react";

export function DottedPattern({
	size = 10,
	className,
	style,
}: {
	size?: number;
	className?: string;
	style?: CSSProperties;
}): ReactNode {
	return (
		<div
			aria-hidden="true"
			className={`text-foreground/15 ${className ?? ""}`}
			style={{
				backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
				backgroundSize: `${size}px ${size}px`,
				...style,
			}}
		/>
	);
}

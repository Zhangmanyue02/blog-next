import type { CSSProperties, FC, PropsWithChildren } from "react";

export interface GlassPanelProps extends PropsWithChildren {
	className?: string;
	style?: CSSProperties;
	/** backdrop blur in px */
	blur?: number;
	/** backdrop saturate percentage, e.g. 180 */
	saturate?: number;
	background?: string;
	borderColor?: string;
	borderWidth?: number;
	borderRadius?: number;
	padding?: number;
	minHeight?: number;
	shadow?: boolean;
}

const GlassPanel: FC<GlassPanelProps> = ({
	children,
	className = "",
	style,
	blur = 16,
	saturate = 160,
	background = "rgba(255, 255, 255, 0.12)",
	borderColor = "rgba(255, 255, 255, 0.28)",
	borderWidth = 1,
	borderRadius = 20,
	padding = 24,
	minHeight,
	shadow = true,
}) => {
	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{
				background,
				borderStyle: "solid",
				borderWidth,
				borderColor,
				borderRadius,
				padding,
				minHeight,
				backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
				WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
				boxShadow: shadow ? "0 8px 32px rgba(0, 0, 0, 0.12)" : undefined,
				...style,
			}}
		>
			{children}
		</div>
	);
};

export default GlassPanel;

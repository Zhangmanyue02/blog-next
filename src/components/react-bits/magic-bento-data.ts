export interface BentoCardProps {
	color?: string;
	title?: string;
	description?: string;
	label?: string;
	textAutoHide?: boolean;
	disableAnimations?: boolean;
}

export interface BentoProps {
	cards?: BentoCardProps[];
	textAutoHide?: boolean;
	enableStars?: boolean;
	enableSpotlight?: boolean;
	enableBorderGlow?: boolean;
	disableAnimations?: boolean;
	spotlightRadius?: number;
	particleCount?: number;
	enableTilt?: boolean;
	glowColor?: string;
	clickEffect?: boolean;
	enableMagnetism?: boolean;
}

export const DEFAULT_BENTO_CARDS: BentoCardProps[] = [
	{
		color: "#120F17",
		title: "Analytics",
		description: "Track user behavior",
		label: "Insights",
	},
	{
		color: "#120F17",
		title: "Dashboard",
		description: "Centralized data view",
		label: "Overview",
	},
	{
		color: "#120F17",
		title: "Collaboration",
		description: "Work together seamlessly",
		label: "Teamwork",
	},
	{
		color: "#120F17",
		title: "Automation",
		description: "Streamline workflows",
		label: "Efficiency",
	},
	{
		color: "#120F17",
		title: "Integration",
		description: "Connect favorite tools",
		label: "Connectivity",
	},
	{
		color: "#120F17",
		title: "Security",
		description: "Enterprise-grade protection",
		label: "Protection",
	},
];

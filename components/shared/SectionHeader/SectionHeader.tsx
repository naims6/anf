import { LucideIcon } from "lucide-react";

interface TSectionHeaderProps {
    badgeText: string;
    title: string;
    subtitle?: string;
    description: string;
    icon: LucideIcon;
}

const SectionHeader = ({ badgeText, title, subtitle, description, icon: Icon }: TSectionHeaderProps) => {
    return (
        <div className="text-center mb-20">
            <div className="inline-block">
                <div className="inline-flex items-center gap-3 bg-linear-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-emerald-200/50 mb-8">
                    <div className="relative">
                        <Icon className="w-5 h-5 text-emerald-600" />
                        <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-sm" />
                    </div>
                    <span className="text-emerald-700 font-semibold text-sm tracking-wide font-bangla">
                        {badgeText}
                    </span>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black font-bangla leading-[1.15] text-center">
                <span className="relative inline-block">
                    {title}
                </span>

                <span className="block my-6 text-black">
                    {subtitle}
                </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bangla leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default SectionHeader;
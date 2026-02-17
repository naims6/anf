"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, ChevronRight, Home, Heart, Users, BookOpen, MessageCircle, Phone, MapPin, Info } from "lucide-react";
import { brandlogo} from "@/utils/assets";
import { SiteConfig } from "@/config/siteConfig";
import { NavItem } from "@/types/siteConfigType";

// Map nav items to icons
const navIcons: Record<string, any> = {
    'Home': Home,
    'About': Info,
    'Activities': Heart,
    'Services': Users,
    'Blog': BookOpen,
    'Contact': Phone,
    'Gallery': MessageCircle,
    'Donate': Heart,
    'Locations': MapPin
};

export default function NavDrawer() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-transparent group"
                    >
                        {/* Menu Button with Hover Effect */}
                        <div className="relative w-10 h-10 p-2 rounded bg-primary flex items-center justify-center border border-emerald-100 group-hover:border-emerald-200 hover:bg-white hover:text-primary hover:border transition-all duration-300">
                            <Menu className="h-6 w-6 text-white group-hover:text-emerald-700 transition-colors duration-300" />
                        </div>
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 overflow-hidden">
   
                        {/* Logo & Close Button */}
                        <div className="-mb-14 -mt-6 -ml-2">
                               <Image
                                    src={brandlogo.logo}
                                    width={140}
                                    height={60}
                                    alt="logo"
                                    className="w-40 h-40"
                                />
                        </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto py-3 border-t border-primary">
                        <nav className="space-y-1 px-4">
                            {SiteConfig.navItems?.bn?.map((item:NavItem, index:any) => {
                                const Icon = navIcons[item.name] || ChevronRight;
                                const isActive = pathname === item.href;

                                return (
                                    <SheetTrigger key={item.href} asChild>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "group relative flex items-center rounded-xl px-4 py-2",
                                                "transition-all duration-300",
                                                "hover:bg-emerald-50 hover:shadow-md",
                                                isActive && "bg-emerald-50 shadow-sm"
                                            )}
                                        >
                                            {/* Left Border Indicator */}
                                            <div className={cn(
                                                "absolute left-0 top-1/2 transform -translate-y-1/2",
                                                "w-1 h-12 rounded-r-full",
                                                "transition-all duration-300",
                                                isActive
                                                    ? "bg-gradient-to-b from-emerald-500 to-green-500"
                                                    : "bg-emerald-200 group-hover:bg-emerald-300"
                                            )} />

                                            {/* Icon Container */}
                                            <div className={cn(
                                                "relative flex-shrink-0 w-10 h-10 rounded-xl",
                                                "flex items-center justify-center mr-4",
                                                "transition-all duration-300",
                                                isActive
                                                    ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white"
                                                    : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 group-hover:text-emerald-700"
                                            )}>
                                                <Icon className="h-5 w-5" />

                                                {/* Active Badge */}
                                                {isActive && (
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                                                )}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className={cn(
                                                        "font-semibold transition-colors duration-300",
                                                        isActive
                                                            ? "text-emerald-700"
                                                            : "text-gray-700 group-hover:text-emerald-700"
                                                    )}>
                                                        {item.name}
                                                    </span>

                                                    <ChevronRight className={cn(
                                                        "h-4 w-4 transition-all duration-300",
                                                        isActive
                                                            ? "text-emerald-500"
                                                            : "text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1"
                                                    )} />
                                                </div>

                                                {/* Bottom Border */}
                                                <div className={cn(
                                                    "mt-2 h-0.5 rounded-full transition-all duration-300",
                                                    isActive
                                                        ? "w-full bg-gradient-to-r from-emerald-400 to-green-400"
                                                        : "w-0 bg-emerald-300 group-hover:w-full"
                                                )} />
                                            </div>

                                            {/* Hover Background Effect */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-300" />
                                        </Link>
                                    </SheetTrigger>
                                );
                            })}
                        </nav>


                        {/* Footer Section */}
                        <div className="mt-8 px-4">
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                                        <Heart className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-emerald-700 font-bangla">অনুদান করুন</div>
                                        <div className="text-sm text-gray-600 mt-1 font-bangla">মানবতার সেবায় অংশগ্রহণ করুন</div>
                                    </div>
                                </div>

                                <Link
                                    href="/donate"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 block w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg text-center transition-all duration-300"
                                >
                                    দান করুন
                                </Link>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
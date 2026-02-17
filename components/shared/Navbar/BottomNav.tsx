// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//     Home,
//     Heart,
//     Phone,
//     MessageCircle,
//     User,
//     Plus
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { SiteConfig } from "@/config/siteConfig";


// interface BottomNavProps {
//     className?: string;
// }

// export function BottomNav({ className }: BottomNavProps) {
//     const pathname = usePathname();
//     const [activeItem, setActiveItem] = useState(pathname);
//     const { callLink, whatsappLink, displayNumber } = SiteConfig;

//     const menuItems = [
//         {
//             name: "Home",
//             href: "/",
//             icon: Home,
//             type: "link"
//         },
//         {
//             name: "Donate",
//             href: "/donate",
//             icon: Heart,
//             type: "link"
//         },
//         {
//             name: "Call",
//             href: callLink,
//             icon: Phone,
//             type: "action"
//         },
//         {
//             name: "WhatsApp",
//             href: whatsappLink,
//             icon: MessageCircle,
//             type: "action"
//         },
//         {
//             name: "Account",
//             href: "/auth/signin",
//             icon: User,
//             type: "link"
//         }
//     ];

//     const handleItemClick = (href: string, type: string) => {
//         setActiveItem(href);

//         if (type === "action") {
//             // Add click feedback for action items
//             const element = document.activeElement as HTMLElement;
//             if (element) {
//                 element.style.transform = "scale(0.95)";
//                 setTimeout(() => {
//                     element.style.transform = "scale(1)";
//                 }, 150);
//             }
//         }
//     };

//     return (
//         <>
//             {/* Spacer for fixed bottom nav */}
//             <div className="h-16 md:hidden" />

//             {/* Bottom Navigation */}
//             <nav className={cn(
//                 "fixed bottom-0 left-0 right-0 z-50 md:hidden",
//                 "bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/95",
//                 "border-t border-gray-200/80 shadow-2xl",
//                 className
//             )}>


//                 {/* Menu Items */}
//                 <div className="flex items-center justify-between px-4 py-2">
//                     {menuItems.map((item, index) => {
//                         const Icon = item.icon;
//                         const isActive = activeItem === item.href;

//                         return (
//                             <div key={item.name} className="flex-1 flex justify-center">
//                                 {item.type === "link" ? (
//                                     <Link
//                                         href={item.href}
//                                         onClick={() => handleItemClick(item.href, item.type)}
//                                         className={cn(
//                                             "flex flex-col items-center justify-center",
//                                             "transition-all duration-300 relative group",
//                                             "min-w-12"
//                                         )}
//                                     >
//                                         {/* Background Glow Effect */}
//                                         <div className={cn(
//                                             "absolute inset-0 rounded-2xl transition-all duration-300",
//                                             "group-hover:bg-emerald-50 group-active:bg-emerald-100",
//                                             isActive ? "bg-emerald-50 scale-110" : "scale-100"
//                                         )} />

//                                         {/* Icon Container */}
//                                         <div className={cn(
//                                             "relative p-1 rounded-xl transition-all duration-300",
//                                             "group-hover:scale-110 group-active:scale-95",
//                                             isActive
//                                                 ? "text-emerald-600 transform scale-110"
//                                                 : "text-gray-500 hover:text-emerald-500"
//                                         )}>
//                                             <Icon className="h-6 w-6" />

//                                             {/* Active Indicator */}
//                                             {isActive && (
//                                                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
//                                             )}
//                                         </div>

//                                         {/* Label */}
//                                         <span className={cn(
//                                             "text-xs font-medium mt-1 transition-all duration-300",
//                                             "relative z-10",
//                                             isActive
//                                                 ? "text-emerald-600 font-semibold scale-105"
//                                                 : "text-gray-600 group-hover:text-emerald-600"
//                                         )}>
//                                             {item.name}
//                                         </span>

//                                         {/* Hover Effect Line */}
//                                         <div className={cn(
//                                             "absolute bottom-0 w-6 h-0.5 bg-emerald-500 rounded-full",
//                                             "transition-all duration-300 transform origin-center",
//                                             isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
//                                             "group-hover:scale-100 group-hover:opacity-100"
//                                         )} />
//                                     </Link>
//                                 ) : (
//                                     // Action Items (Call, WhatsApp)
//                                     <a
//                                         href={item.href}
//                                         onClick={() => handleItemClick(item.href, item.type)}
//                                         className={cn(
//                                             "flex flex-col items-center justify-center",
//                                             "transition-all duration-300 relative group",
//                                             "min-w-12 cursor-pointer"
//                                         )}
//                                     >
//                                         {/* Background Glow Effect */}
//                                         <div className={cn(
//                                             "absolute inset-0 rounded-2xl transition-all duration-300",
//                                             item.name === "Call"
//                                                 ? "group-hover:bg-green-50 group-active:bg-green-100"
//                                                 : "group-hover:bg-emerald-50 group-active:bg-emerald-100",
//                                             isActive ? "scale-110" : "scale-100",
//                                             item.name === "Call" && isActive ? "bg-green-50" : "",
//                                             item.name === "WhatsApp" && isActive ? "bg-emerald-50" : ""
//                                         )} />

//                                         {/* Icon Container */}
//                                         <div className={cn(
//                                             "relative p-3 rounded-xl transition-all duration-300",
//                                             "group-hover:scale-110 group-active:scale-95",
//                                             isActive ? "transform scale-110" : "",
//                                             item.name === "Call"
//                                                 ? "text-green-600 group-hover:text-green-700"
//                                                 : "text-emerald-600 group-hover:text-emerald-700"
//                                         )}>
//                                             <Icon className="h-5 w-5" />

//                                             {/* Pulse Animation for Action Items */}
//                                             <div className={cn(
//                                                 "absolute inset-0 rounded-xl border-2",
//                                                 "animate-ping opacity-0 group-hover:opacity-100",
//                                                 item.name === "Call" ? "border-green-400" : "border-emerald-400"
//                                             )} />
//                                         </div>

//                                         {/* Label */}
//                                         <span className={cn(
//                                             "text-xs font-medium mt-1 transition-all duration-300",
//                                             "relative z-10",
//                                             isActive ? "font-semibold scale-105" : "",
//                                             item.name === "Call"
//                                                 ? "text-green-600 group-hover:text-green-700"
//                                                 : "text-emerald-600 group-hover:text-emerald-700"
//                                         )}>
//                                             {item.name}
//                                         </span>

//                                         {/* Hover Effect Line */}
//                                         <div className={cn(
//                                             "absolute bottom-0 w-6 h-0.5 rounded-full",
//                                             "transition-all duration-300 transform origin-center",
//                                             isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
//                                             "group-hover:scale-100 group-hover:opacity-100",
//                                             item.name === "Call" ? "bg-green-500" : "bg-emerald-500"
//                                         )} />
//                                     </a>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Safety Area for iOS */}
//                 <div className="h-1 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
//             </nav>

//             {/* Interactive Background Effects */}
//             <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-5px); }
//         }
        
//         .floating-donate {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//         </>
//     );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   Heart,
//   Phone,
//   MessageCircle,
//   User,
//   Sparkles,
//   Donut,
//   Activity
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { SiteConfig } from "@/config/siteConfig";

// interface BottomNavProps {
//   className?: string;
// }

// export function BottomNav({ className }: BottomNavProps) {
//   const pathname = usePathname();
//   const [activeItem, setActiveItem] = useState(pathname);
//   const { callLink, whatsappLink, displayNumber } = SiteConfig;

//   const menuItems = [
//     {
//       name: "Home",
//       href: "/",
//       icon: Home,
//       type: "link",
//       color: "from-blue-500 to-cyan-500",
//       glow: "blue"
//     },
//     {
//       name: "Donate",
//       href: "/donate",
//       icon: Heart,
//       type: "link",
//       color: "from-rose-500 to-pink-500",
//       glow: "rose",
//       special: true
//     },
//     {
//       name: "Call",
//       href: callLink,
//       icon: Phone,
//       type: "action",
//       color: "from-emerald-500 to-green-500",
//       glow: "emerald"
//     },
//     {
//       name: "Chat",
//       href: whatsappLink,
//       icon: MessageCircle,
//       type: "action",
//       color: "from-green-500 to-emerald-500",
//       glow: "green"
//     },
//     {
//       name: "Account",
//       href: "/auth/signin",
//       icon: User,
//       type: "link",
//       color: "from-violet-500 to-purple-500",
//       glow: "violet"
//     }
//   ];

//   const handleItemClick = (href: string) => {
//     setActiveItem(href);
//   };

//   return (
//     <>
//       {/* Spacer for fixed bottom nav */}
//       <div className="h-20 md:hidden" />

//       {/* Bottom Navigation Container */}
//       <nav className={cn(
//         "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden",
//         "w-[calc(100%-2rem)] max-w-md",
//         className
//       )}>
//         {/* Glass Morphism Container */}
//         <div className="relative">
//           {/* Background Blur Layer */}
//           <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl" />
          
//           {/* Border Gradient */}
//           <div className="absolute inset-0 rounded-3xl p-[2px]">
//             <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-violet-500/20 rounded-3xl" />
//           </div>

//           {/* Inner Container */}
//           <div className="relative px-4 py-3">
//             {/* Decorative Top Elements */}
//             <div className="flex items-center justify-between px-2 mb-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 animate-pulse" />
//                 <span className="text-xs text-gray-600 font-medium">
//                   Quick Access
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 {[1, 2, 3].map((i) => (
//                   <div 
//                     key={i}
//                     className="w-1 h-1 rounded-full bg-gradient-to-r from-gray-400 to-gray-300"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Menu Items Grid */}
//             <div className="grid grid-cols-5 gap-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = activeItem === item.href;
//                 const isSpecial = item.special;

//                 return (
//                   <div key={item.name} className="relative">
//                     {/* Floating Effect for Special Item */}
//                     {isSpecial && (
//                       <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//                         <div className="relative">
//                           <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse" />
//                           <Sparkles className="w-4 h-4 text-rose-500 relative z-10" />
//                         </div>
//                       </div>
//                     )}

//                     {/* Menu Item Container */}
//                     {item.type === "link" ? (
//                       <Link
//                         href={item.href}
//                         onClick={() => handleItemClick(item.href)}
//                         className={cn(
//                           "relative flex flex-col items-center justify-center",
//                           "transition-all duration-500 ease-out-expo",
//                           "group"
//                         )}
//                       >
//                         {/* Background Container */}
//                         <div className={cn(
//                           "relative w-14 h-14 rounded-2xl flex items-center justify-center",
//                           "transition-all duration-500",
//                           isActive 
//                             ? "bg-gradient-to-br from-white to-gray-50 shadow-lg scale-110"
//                             : "bg-white/50 hover:bg-white/80"
//                         )}>
//                           {/* Active State Gradient Border */}
//                           {isActive && (
//                             <div className={cn(
//                               "absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-70",
//                               item.color,
//                               "animate-gradient-xy"
//                             )} />
//                           )}

//                           {/* Icon Container */}
//                           <div className={cn(
//                             "relative z-10 p-2.5 rounded-xl",
//                             "transition-all duration-500",
//                             isActive 
//                               ? `bg-gradient-to-r ${item.color}`
//                               : "bg-gradient-to-br from-gray-100 to-white"
//                           )}>
//                             <Icon className={cn(
//                               "w-5 h-5 transition-all duration-500",
//                               isActive 
//                                 ? "text-white scale-110"
//                                 : `text-gray-600 group-hover:text-gray-900 group-hover:scale-110`
//                             )} />

//                             {/* Hover Glow Effect */}
//                             <div className={cn(
//                               "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
//                               "transition-opacity duration-500",
//                               `bg-gradient-to-r ${item.color} blur-md`
//                             )} />
//                           </div>

//                           {/* Floating Notification for Special Item */}
//                           {isSpecial && (
//                             <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
//                               <Donut className="w-3 h-3 text-white animate-spin-slow" />
//                             </div>
//                           )}
//                         </div>

//                         {/* Label with Animated Underline */}
//                         <span className={cn(
//                           "mt-2 text-xs font-medium transition-all duration-500",
//                           "relative inline-block",
//                           isActive 
//                             ? "text-gray-900 font-semibold scale-105"
//                             : "text-gray-600 group-hover:text-gray-800 group-hover:scale-105"
//                         )}>
//                           {item.name}
//                           {/* Animated Underline */}
//                           <span className={cn(
//                             "absolute -bottom-1 left-1/2 transform -translate-x-1/2",
//                             "w-0 h-0.5 rounded-full transition-all duration-500",
//                             isActive ? `w-4 bg-gradient-to-r ${item.color}` : "group-hover:w-4",
//                             `group-hover:bg-gradient-to-r ${item.color}`
//                           )} />
//                         </span>
//                       </Link>
//                     ) : (
//                       // Action Items (Call, WhatsApp)
//                       <a
//                         href={item.href}
//                         onClick={() => handleItemClick(item.href)}
//                         className="relative flex flex-col items-center justify-center group"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {/* Action Button Container */}
//                         <div className="relative">
//                           {/* Outer Ring */}
//                           <div className={cn(
//                             "absolute -ins-2 rounded-full",
//                             `bg-gradient-to-r ${item.color}`,
//                             "opacity-20 group-hover:opacity-40",
//                             "transition-all duration-500 group-hover:scale-110"
//                           )} />

//                           {/* Button Base */}
//                           <div className={cn(
//                             "relative w-14 h-14 rounded-2xl flex items-center justify-center",
//                             "bg-gradient-to-br from-white to-gray-50",
//                             "shadow-lg group-hover:shadow-xl",
//                             "transition-all duration-500 group-hover:scale-110"
//                           )}>
//                             {/* Icon */}
//                             <div className={cn(
//                               "p-2.5 rounded-xl",
//                               `bg-gradient-to-r ${item.color}`,
//                               "transition-all duration-500 group-hover:scale-110"
//                             )}>
//                               <Icon className="w-5 h-5 text-white" />
//                             </div>

//                             {/* Animated Ring */}
//                             <div className={cn(
//                               "absolute inset-0 rounded-2xl border-2 border-transparent",
//                               `group-hover:border-gradient-to-r ${item.color}`,
//                               "group-hover:animate-spin-slow"
//                             )} />
//                           </div>

//                           {/* Pulsing Effect */}
//                           <div className={cn(
//                             "absolute inset-0 rounded-2xl",
//                             `bg-gradient-to-r ${item.color}`,
//                             "opacity-0 group-hover:opacity-20",
//                             "transition-opacity duration-500 animate-pulse"
//                           )} />
//                         </div>

//                         {/* Label */}
//                         <span className={cn(
//                           "mt-2 text-xs font-medium",
//                           "text-gray-700 group-hover:text-gray-900",
//                           "transition-all duration-500 group-hover:scale-105"
//                         )}>
//                           {item.name}
//                         </span>

//                         {/* Live Indicator */}
//                         <div className="absolute top-0 right-0 flex items-center gap-0.5">
//                           <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 animate-pulse" />
//                           <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
//                         </div>
//                       </a>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Bottom Decorative Line */}
//             <div className="mt-3 relative">
//               <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
//               <div className="absolute left-1/2 transform -translate-x-1/2 -top-1.5">
//                 <div className="w-6 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-violet-500 rounded-full" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Safety Indicator for iOS */}
//         <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
//           <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent rounded-full" />
//         </div>
//       </nav>

//       {/* Custom CSS Animations */}
//       <style jsx>{`
//         @keyframes gradient-xy {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-8px);
//           }
//         }
        
//         .animate-gradient-xy {
//           background-size: 200% 200%;
//           animation: gradient-xy 3s ease infinite;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         /* Custom easing */
//         .ease-out-expo {
//           transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
//         }
        
//         /* Gradient text */
//         .text-gradient {
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
        
//         /* Glass effect enhancement */
//         .glass-effect {
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           background: linear-gradient(
//             135deg,
//             rgba(255, 255, 255, 0.4) 0%,
//             rgba(255, 255, 255, 0.1) 100%
//           );
//         }
//       `}</style>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/config/siteConfig";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);
  const { callLink, whatsappLink, displayNumber } = SiteConfig;

  const menuItems = [
    {
      name: "Call",
      href: callLink,
      icon: Phone,
      type: "action",
      color: "emerald"
    },
    {
      name: "Donate",
      href: "/donate",
      icon: Heart,
      type: "link",
      color: "rose",
      special: true
    },
    {
      name: "Chat",
      href: whatsappLink,
      icon: MessageCircle,
      type: "action",
      color: "green"
    }
  ];

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-600",
      hover: "hover:bg-emerald-100",
      gradient: "from-emerald-500 to-green-500"
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
      icon: "text-rose-600",
      hover: "hover:bg-rose-100",
      gradient: "from-rose-500 to-pink-500"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: "text-green-600",
      hover: "hover:bg-green-100",
      gradient: "from-green-500 to-emerald-500"
    }
  };

  return (
    <>
      {/* Spacer for fixed bottom nav */}
      <div className="h-24 md:hidden" />

      {/* Bottom Navigation Container */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "h-24",
        "bg-white/95 backdrop-blur-sm",
        "border-t border-gray-100",
        "shadow-lg",
        className
      )}>
        {/* Inner Container */}
        <div className="relative h-full flex items-center justify-between px-4">
          
          {/* Left Button - Call */}
          <div className="relative w-20">
            <Link
              href={callLink}
              className="group flex flex-col items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Button Container */}
              <div className={cn(
                "relative w-14 h-14 rounded-2xl",
                colorMap.emerald.bg,
                colorMap.emerald.border,
                "border-2 flex flex-col items-center justify-center",
                "transition-all duration-300",
                colorMap.emerald.hover,
                "group-hover:shadow-md"
              )}>
                {/* Icon */}
                <div className={cn(
                  "p-2 rounded-lg",
                  colorMap.emerald.bg,
                  "border border-emerald-100",
                  "group-hover:border-emerald-200",
                  "transition-all duration-300"
                )}>
                  <Phone className={cn(
                    "w-6 h-6",
                    colorMap.emerald.icon
                  )} />
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-xs font-semibold",
                colorMap.emerald.text
              )}>
                Call Now
              </span>
            </Link>
          </div>

          {/* Center - Special Donate Button */}
          <div className="relative -mt-8">

            {/* Main Donate Button */}
            <Link
              href="/donate"
              onClick={() => handleItemClick("/donate")}
              className="group block"
            >
              {/* Button Container */}
              <div className="relative">
                {/* Gradient Border Container */}
                <div className={cn(
                  "absolute -inset-1 rounded-3xl",
                  "bg-primary/10",
                  "opacity-20 group-hover:opacity-30",
                  "transition-opacity duration-300"
                )} />

                {/* Main Button */}
                <div className={cn(
                  "relative w-24 h-24 rounded-3xl",
                  "bg-primary/20",
                  "border-2 border-primary",
                  "flex flex-col items-center justify-center p-4",
                  "group-hover:border-primary",
                  "group-hover:shadow-lg",
                  "transition-all duration-300"
                )}>
                  {/* Icon Container */}
                  <div className="relative mb-2">
                    {/* Icon Background */}
                    <div className={cn(
                      "w-16 h-16 rounded-2xl",
                      "bg-primary",
                      "flex items-center justify-center",
                      "shadow-lg",
                      "group-hover:shadow-xl",
                      "transition-all duration-300"
                    )}>
                      <Heart className="w-8 h-8 text-white" />
                      
                      {/* Sparkle Icon */}
                      {/* <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div> */}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center">
                    <div className={cn(
                      "text-sm font-bold",
                      "bg-primary",
                      "bg-clip-text text-transparent"
                    )}>
                      DONATE
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Button - WhatsApp */}
          <div className="relative w-20">
            <Link
              href={whatsappLink}
              className="group flex flex-col items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Button Container */}
              <div className={cn(
                "relative w-14 h-14 rounded-2xl",
                colorMap.green.bg,
                colorMap.green.border,
                "border-2 flex flex-col items-center justify-center",
                "transition-all duration-300",
                colorMap.green.hover,
                "group-hover:shadow-md"
              )}>
                {/* Icon */}
                <div className={cn(
                  "p-2 rounded-lg",
                  colorMap.green.bg,
                  "border border-green-100",
                  "group-hover:border-green-200",
                  "transition-all duration-300"
                )}>
                  <MessageCircle className={cn(
                    "w-6 h-6",
                    colorMap.green.icon
                  )} />
                </div>
              </div>

              {/* Label */}
              <span className={cn(
                "text-xs font-semibold",
                colorMap.green.text
              )}>
                WhatsApp
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-rose-500 to-green-500" />
        </div>

        {/* Corner Accents */}
        <div className="absolute bottom-4 left-4 w-3 h-3 border-l-2 border-b-2 border-emerald-200 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-green-200 rounded-br-lg" />
      </nav>
    </>
  );
}
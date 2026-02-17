'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ActivityCardProps } from '@/types/activity';



export default function ActivityCard({
  slug,
  title,
  description,
  tag,
  image,
  icon: Icon,
  className
}: ActivityCardProps) {
  return (
    <Link
      href={`/activities/${slug}`}
      className={cn(
        "group relative block h-full",
        className
      )}
    >
      {/* Card Container */}
      <div className="
        relative h-full min-h-[400px] rounded-3xl overflow-hidden
        bg-white border border-gray-200
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        hover:-translate-y-2
        flex flex-col
      ">
        {/* Image Container */}
        <div className="relative h-56 flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Tag Badge */}
          <div className="absolute top-4 right-4">
            <div className="
              px-4 py-1.5 rounded-full
              bg-white/95 backdrop-blur-sm border border-white/20
              shadow-lg
            ">
              <span className="text-xs font-semibold text-emerald-700 font-bangla">
                {tag}
              </span>
            </div>
          </div>
          
          {/* Icon Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="
              w-14 h-14 rounded-2xl
              bg-white/95 backdrop-blur-sm border border-white/20
              flex items-center justify-center
              shadow-lg group-hover:scale-110
              transition-transform duration-500
            ">
              <Icon className="w-7 h-7 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Color Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500" />

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="
            text-xl font-bold text-gray-900 mb-3 font-bangla
            leading-tight group-hover:text-emerald-700
            transition-colors duration-300 line-clamp-2
          ">
            {title}
          </h3>

          {/* Description */}
          <p className="
            text-gray-600 leading-relaxed mb-6 font-bangla
            flex-grow line-clamp-3
          ">
            {description}
          </p>

          {/* Action Footer */}
          <div className="
            flex items-center justify-between pt-5
            border-t border-gray-100
          ">
            <span className="
              text-sm font-semibold text-emerald-600
              font-bangla group-hover:text-emerald-700
              transition-colors duration-300
            ">
              বিস্তারিত দেখুন
            </span>
            
            <div className="
              w-10 h-10 rounded-full
              bg-gradient-to-r from-emerald-500 to-green-500
              flex items-center justify-center
              group-hover:scale-110 group-hover:shadow-lg
              transition-all duration-300
            ">
              <svg 
                className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-200 rounded-tl-2xl" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-200 rounded-br-2xl" />

        {/* Hover Overlay */}
        <div className="
          absolute inset-0 rounded-3xl
          bg-gradient-to-br from-emerald-500/0 to-green-500/0
          group-hover:from-emerald-500/5 group-hover:to-green-500/5
          transition-all duration-500 pointer-events-none
        " />
      </div>

      {/* Background Glow */}
      <div className="
        absolute -inset-4 rounded-3xl
        bg-gradient-to-br from-emerald-500/0 to-green-500/0
        group-hover:from-emerald-500/10 group-hover:to-green-500/10
        blur-xl transition-all duration-700 -z-10
        opacity-0 group-hover:opacity-100
      " />
    </Link>
  );
}
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'শিক্ষা কার্যক্রম',
    category: 'শিক্ষা',
    title: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউটে প্রশিক্ষণার্থীগণ'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'দুর্যোগে ত্রাণ',
    category: 'সেবা',
    title: 'বন্যা কবলিত অঞ্চলে ত্রাণ বিতরণ'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'ইফতার বিতরণ',
    category: 'রমজান',
    title: 'দুস্থ রোযাদারদের মধ্যে ইফতার বিতরণ'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'বৃক্ষরোপণ',
    category: 'পরিবেশ',
    title: 'ফাউন্ডেশনের বৃক্ষরোপণ কর্মসূচিতে অংশগ্রহণ'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'কুরবানী',
    category: 'ঈদ',
    title: 'সবার জন্য কুরবানী কার্যক্রম'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'নলকূপ স্থাপন',
    category: 'সেবা',
    title: 'গ্রামীণ এলাকায় নলকূপ স্থাপন'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openImage = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(prev => prev === 1 ? galleryImages.length : prev! - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(prev => prev === galleryImages.length ? 1 : prev! + 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <section className="relative py-6 bg-gradient-to-b from-white via-emerald-50/5 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl" />
          
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            {/* Subtle Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full px-4 py-2 mb-6 border border-emerald-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
              <span className="text-emerald-700 font-semibold text-sm font-bangla">
                আমাদের কার্যক্রমের ঝলক
              </span>
            </div>

            {/* Elegant Title */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-bangla leading-tight">
                <span className="block mb-3">কার্যক্রমের</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ছবিসমূহ
                  </span>
                  <div className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 font-bangla leading-relaxed max-w-2xl mx-auto">
                ফাউন্ডেশনের বিভিন্ন কার্যক্রমের মুহূর্তগুলো ক্যামেরাবন্দী করা কিছু দৃশ্য
              </p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  {/* Image */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-semibold text-gray-800 font-bangla">
                        {image.category}
                      </span>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => openImage(image.id)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 hover:scale-110 hover:bg-white"
                    aria-label="View image"
                  >
                    <Eye className="w-5 h-5 text-gray-800" />
                  </button>

                  {/* Image Info (Visible on hover) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h3 className="font-bold text-gray-900 mb-2 font-bangla">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-bangla">
                        বিস্তারিত দেখতে আইকনে ক্লিক করুন
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Effect */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:to-blue-500/10 transition-all duration-500 -z-10" />
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-16">
            <button
              onClick={() => openImage(1)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold font-bangla text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>সমস্ত ছবি দেখুন</span>
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="absolute top-6 right-20 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Current Image Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
              <div className="text-center">
                <div className="text-white font-bangla font-semibold">
                  {galleryImages[selectedImage - 1]?.title}
                </div>
                <div className="text-white/80 text-sm font-bangla mt-1">
                  {selectedImage} / {galleryImages.length}
                </div>
              </div>
            </div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-6xl max-h-[80vh]'} rounded-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage - 1]?.src}
                alt={galleryImages[selectedImage - 1]?.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              
              {/* Loading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black/30 flex items-center justify-center">
                <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
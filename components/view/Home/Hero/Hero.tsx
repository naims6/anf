'use client';

import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronRight, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DonationCard from './DonationCard';
import { homeBaanner } from '@/utils/assets';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import enMessages from '@/messages/en.json';
import bnMessages from '@/messages/bn.json';

const heroSlides = [
    {
        id: 1,
        image: homeBaanner.zakat.src,
        alt: 'Islamic charity volunteers distributing food',
    },
    {
        id: 2,
        image: homeBaanner.education.src,
        alt: 'Education support for underprivileged children',
    },
    {
        id: 3,
        image: homeBaanner.emergncy.src,
        alt: 'Emergency relief for flood victims',
    },
];

export default function Hero() {
    const { locale } = useLanguage();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Get translations based on current locale
    const t = locale === 'bn' ? bnMessages.HomePage.HeroSection : enMessages.HomePage.HeroSection;

    const autoplay = Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start' },
        [autoplay]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full overflow-hidden -mt-8">
            {/*  Carousel  */}
            <div
                className="embla relative h-[65vh] md:h-[75vh]"
                ref={emblaRef}
                aria-label="Hero carousel"
            >
                <div className="embla__container flex h-full">
                    {heroSlides?.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="embla__slide flex-[0_0_100%] min-w-0 h-full"
                        >
                            <div
                                className={`h-full w-full bg-cover bg-center transition-transform duration-1000 ease-out ${selectedIndex === index ? 'scale-100' : 'scale-105'}`}
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                                role="img"
                                aria-label={slide.alt}
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>

            {/* Content  */}
            <div className="w-full min-h-125 bg-linear-to-r from-green-900 via-primary/90 to-green-700 py-14">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl -mt-4 md:mt-24 ">
                        {/* Badge */}
                        {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-4">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-white text-sm font-medium font-bangla">
                                নিবন্ধন নম্বর: এস-০০০০/২০২৫
                            </span>
                        </div> */}

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-bangla">
                            {t.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-md text-white/90 mb-8 leading-relaxed font-bangla">
                            {t.subtitle}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                size="lg"
                                className="group bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-7 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bangla hover:cursor-pointer"
                            >
                                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform " />
                                {t.btn1}
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="group border-2 border-white/80 bg-white/5 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 font-bangla min-w-50 hover:cursor-pointer"
                            >
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                {t.btn2}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Donation Cards*/}
            <div className="pb-5">
                <div className="w-[90%] mx-auto -mt-25">
                    <DonationCard />
                </div>
            </div>
        </section>
    );
}


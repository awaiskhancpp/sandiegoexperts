'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

interface VideoReview {
    id: string;
    clientName: string;
    clientRole: string;
    clientCompany: string;
    videoUrl: string;
    isYouTube?: boolean;
}

const VIDEO_REVIEWS: VideoReview[] = [
    {
        id: '1',
        clientName: 'Sarah Mitchell',
        clientRole: 'CEO',
        clientCompany: 'TechFlow Solutions',
        videoUrl: '/hero.mp4',
        isYouTube: false,
    },
    {
        id: '2',
        clientName: 'Marcus Chen',
        clientRole: 'Founder',
        clientCompany: 'Urban Marketplace',
        videoUrl: '/hero.mp4',
        isYouTube: false,
    },
    {
        id: '3',
        clientName: 'Elena Rodriguez',
        clientRole: 'CMO',
        clientCompany: 'Nexus Digital',
        videoUrl: '/hero.mp4',
        isYouTube: false,
    },
    {
        id: '4',
        clientName: 'David Park',
        clientRole: 'CTO',
        clientCompany: 'Innovation Labs',
        videoUrl: '/hero.mp4',
        isYouTube: false,
    },
];

const VideoReviewsSection = () => {
    const [selectedVideo, setSelectedVideo] = useState<VideoReview | null>(null);
    const [featuredVideo, setFeaturedVideo] = useState<VideoReview>(VIDEO_REVIEWS[0]);

    return (
        <section className="w-full bg-white py-32 px-6 relative border-t border-black/5 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_70%)] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Heading with Description */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs text-black/50 uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full">
                                Client_Voices
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-grotesk font-bold text-black uppercase leading-none">
                            Video <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">Reviews</span>
                        </h2>
                    </div>
                    <div className="max-w-md text-right md:text-right">
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Don't take our word for it. Watch our clients explain how we transformed their digital presence and drove real business results.
                        </p>
                    </div>
                </div>

                {/* Large Featured Video */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <FeaturedVideoCard
                        video={featuredVideo}
                        onClick={() => setSelectedVideo(featuredVideo)}
                    />
                </motion.div>

                {/* Smaller Thumbnail Videos */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {VIDEO_REVIEWS.filter(v => v.id !== featuredVideo.id).map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <ThumbnailCard
                                video={video}
                                onClick={() => setFeaturedVideo(video)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal
                        video={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

const FeaturedVideoCard = ({ video, onClick }: { video: VideoReview; onClick: () => void }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            className="relative group cursor-pointer bg-white border border-black/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden shadow-sm"
        >
            {/* Large Video Preview */}
            <div className="relative aspect-video overflow-hidden">
                {/* Video Background */}
                <video
                    src={video.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                    muted
                    loop
                    playsInline
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Large Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                    >
                        <Play className="text-white ml-1" size={40} fill="white" />
                    </motion.div>
                </div>

                {/* Client Info - Bottom Left */}
                <div className="absolute bottom-0 left-0 p-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-purple-500" />
                        <h3 className="text-white font-bold text-2xl uppercase tracking-wide">
                            {video.clientName}
                        </h3>
                    </div>
                    <p className="text-gray-300 text-base">
                        {video.clientRole}
                    </p>
                    <p className="text-gray-500 text-sm uppercase tracking-widest mt-1">
                        {video.clientCompany}
                    </p>
                </div>

            </div>

            {/* Grain Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        </motion.div>
    );
};

const ThumbnailCard = ({ video, onClick }: { video: VideoReview; onClick: () => void }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            className="relative group cursor-pointer bg-white border border-black/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden shadow-sm"
        >
            {/* Thumbnail Video */}
            <div className="relative aspect-video overflow-hidden">
                <video
                    src={video.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    muted
                    loop
                    playsInline
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Small Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                    >
                        <Play className="text-white ml-0.5" size={16} fill="white" />
                    </motion.div>
                </div>

                {/* Client Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-1 bg-purple-500" />
                        <h4 className="text-white font-bold text-sm uppercase">
                            {video.clientName}
                        </h4>
                    </div>
                    <p className="text-gray-400 text-xs">
                        {video.clientRole}
                    </p>
                </div>

                {/* Corner Accents */}
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
        </motion.div>
    );
};

const VideoModal = ({ video, onClose }: { video: VideoReview; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white hover:text-purple-500 transition-colors z-10"
            >
                <X size={32} />
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative aspect-video bg-black border-2 border-purple-500/30">
                    {video.isYouTube ? (
                        <iframe
                            src={video.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <video
                            src={video.videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full"
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}

                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-white text-xl font-bold mb-1">{video.clientName}</h3>
                    <p className="text-gray-400 text-sm">
                        {video.clientRole} <span className="text-purple-500">@</span> {video.clientCompany}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default VideoReviewsSection;

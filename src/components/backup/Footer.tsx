'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, Twitter, Linkedin, Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

const Footer = () => {
    return (
        <footer id="contact" className="w-full bg-white pt-32 pb-12 px-6 border-t border-black/10 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* CTA Section with Embedded Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    {/* Text Side */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            <span className="  text-xs text-purple-500 uppercase tracking-widest">Accepting New Projects</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-grotesk font-bold text-black mb-6 leading-[0.9]">
                            START A <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/30">PROJECT.</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                            Ready to take your digital presence to the next level? Our team of engineers is ready to build your vision.
                        </p>
                    </div>

                    {/* Form Side */}
                    <ContactForm />
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-black/10 pt-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="mb-6 block">
                            <img src="/logo-new.png" alt="SDWE Logo" className="w-[200px] h-auto" />
                        </Link>
                        <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                            Constructing the digital infrastructure of tomorrow. We build high-performance web systems for brands that demand dominance.
                        </p>
                    </div>

                    <div>
                        <h4 className="  text-xs text-black/40 uppercase tracking-widest mb-6">Directory</h4>
                        <ul className="space-y-4">
                            <li><Link href="#services" className="text-gray-600 hover:text-black transition-colors text-sm">Services</Link></li>
                            <li><Link href="#projects" className="text-gray-600 hover:text-black transition-colors text-sm">Projects</Link></li>
                            <li><Link href="#tech" className="text-gray-600 hover:text-black transition-colors text-sm">Tech Stack</Link></li>
                            <li><Link href="#pricing" className="text-gray-600 hover:text-black transition-colors text-sm">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="  text-xs text-black/40 uppercase tracking-widest mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"><Twitter size={14} /> Twitter</a></li>
                            <li><a href="#" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"><Github size={14} /> GitHub</a></li>
                            <li><a href="#" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"><Linkedin size={14} /> LinkedIn</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="  text-xs text-black/40 uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <Mail size={14} />
                                <span>hello@sdwe.io</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <MapPin size={14} />
                                <span>San Diego, CA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
                    <p className="text-[10px]   text-gray-500 uppercase tracking-widest">
                        © {new Date().getFullYear()} SD WEBSITE EXPERTS
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-[10px]   text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[10px]   text-gray-500 hover:text-black uppercase tracking-widest transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            await new Promise(r => setTimeout(r, 800));
            setStatus('success');
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-black/[0.02] border border-purple-500/30 p-12 flex flex-col items-center justify-center text-center h-[450px] relative overflow-hidden backdrop-blur-sm">

                <div className="w-20 h-20 bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6 rounded-full border border-purple-500/20">
                    <CheckCircle size={32} />
                </div>

                <h3 className="text-3xl font-bold text-black mb-4 ">
                    Message Sent
                </h3>

                <p className="text-gray-600 text-sm max-w-xs mb-8 leading-relaxed">
                    Thank you for reaching out. We've received your inquiry and will get back to you within 24 hours.
                </p>

                <button
                    onClick={() => setStatus('idle')}
                    className="text-xs font-bold text-black border border-black/20 hover:bg-black hover:text-white px-8 py-3 uppercase tracking-widest transition-all"
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-black/10 relative group overflow-hidden">
            <div className="p-8 md:p-10 relative">

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 group/input">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium group-focus-within/input:text-purple-500 transition-colors">
                                Name
                            </label>
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-transparent border-b border-black/10 px-0 py-2 text-black placeholder:text-black/30 focus:outline-none focus:border-purple-500 transition-all font-light text-xl rounded-none"
                            />
                        </div>
                        <div className="space-y-2 group/input">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium group-focus-within/input:text-purple-500 transition-colors">
                                Email
                            </label>
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-transparent border-b border-black/10 px-0 py-2 text-black placeholder:text-black/30 focus:outline-none focus:border-purple-500 transition-all font-light text-xl rounded-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium group-focus-within/input:text-purple-500 transition-colors">
                            Message
                        </label>
                        <textarea
                            name="message"
                            required
                            placeholder="Tell us about your project..."
                            rows={3}
                            className="w-full bg-black/[0.02] border border-black/10 px-4 py-4 text-black placeholder:text-black/30 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 transition-all font-light text-sm resize-none rounded-none leading-relaxed"
                        />
                    </div>

                    {errorMessage && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs mb-4 uppercase tracking-widest">
                            Error: {errorMessage}
                        </div>
                    )}

                    <button
                        disabled={status === 'submitting'}
                        type="submit"
                        className="w-full bg-black text-white font-bold uppercase tracking-widest py-5 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-between px-6 group/btn disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
                    >
                        {status === 'submitting' ? (
                            <span className="flex items-center gap-4">
                                <Loader2 className="animate-spin" size={18} />
                                Processing...
                            </span>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Footer;

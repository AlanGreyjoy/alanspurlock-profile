import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type GlassCardProps = HTMLMotionProps<"div"> & {
    children: ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
};

export function GlassCard({ children, className = '', intensity = 'medium', ...props }: GlassCardProps) {
    const bgOpacity = {
        low: 'bg-white/40',
        medium: 'bg-white/60',
        high: 'bg-white/80',
    };

    const backdrop = {
        low: 'backdrop-blur-sm',
        medium: 'backdrop-blur-md',
        high: 'backdrop-blur-lg',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`
        relative overflow-hidden rounded-2xl border border-white/40 shadow-xl
        ${bgOpacity[intensity]} ${backdrop[intensity]}
        ${className}
      `}
            {...props}
        >
            {/* Shine effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
            {children}
        </motion.div>
    );
}

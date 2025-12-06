import { NavLink } from 'react-router-dom';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface NavButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    external?: boolean;
    children: ReactNode;
    activeClassName?: string;
    inactiveClassName?: string;
}

export function NavButton({
    to,
    external,
    children,
    className = '',
    activeClassName = 'text-[#ff0055] border-[#ff0055]',
    inactiveClassName = 'text-gray-600 hover:text-black border-transparent hover:border-black',
    ...props
}: NavButtonProps) {
    const baseClasses = 'text-base font-medium transition-colors border-b-2';

    if (external || !to) {
        return (
            <a
                href={to || props.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClasses} ${inactiveClassName} ${className}`}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClassName : inactiveClassName} ${className}`
            }
            {...props}
        >
            {children}
        </NavLink>
    );
}

export default NavButton;

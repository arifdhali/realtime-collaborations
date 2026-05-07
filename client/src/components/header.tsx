import { Link } from "react-router"

const Header = () => {
    return (
        <header className="bg-surface-container dark:bg-surface-container text-primary dark:text-primary border-b border-outline-variant flex justify-between items-center h-12 px-padding-md w-full sticky top-0 z-50">
            <div className="flex items-center gap-padding-md">
                <span className="text-headline-lg font-headline-lg font-bold text-secondary dark:text-secondary">DevFlow IDE</span>
            </div>
            <div className="flex items-center gap-padding-md">
                <div className="flex items-center gap-padding-md">
                    <Link to="/auth/login" className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm px-padding-md py-2">Login</Link>
                    <Link to="/auth/register" className="bg-primary text-on-primary px-padding-lg py-2 rounded-lg text-label-sm font-label-sm hover:opacity-90 transition-all shadow-sm active:scale-95">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header

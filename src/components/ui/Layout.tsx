import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="bg-gray-200 flex items-center justify-center w-[375px] h-screen relative">
            <img
                className="fixed top-0"
                src="/images/Rectangle 1.png"
                alt="Rectangle background"
            />
            <img
                className="fixed top-10 z-10"
                src="/images/logo.svg"
                alt="Logo"
            />
            <Outlet /> {/* This will render the matched route component */}
        </div>
    );
};

export default Layout;
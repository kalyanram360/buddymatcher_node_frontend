// import React from "react";
// import Header from "./components/header/header";
// import Footer from "./components/Footer/footer";
// import {Outlet} from "react-router-dom";
// function Layout(){
//     return (
//         <>
//             <Header />
//             <main className="pt-20"> {/* Add top padding to avoid header overlap */}
//                 <Outlet />
//             </main>
//             <Footer />
//         </>
//     )
// }

// export default Layout;



import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/Footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
    const location = useLocation();
    
    // Define routes that should show header instead of sidebar
    const headerRoutes = ['/', '/login', '/home'];
    const showHeader = headerRoutes.includes(location.pathname);

    if (showHeader) {
        // Layout for home and login pages
        return (
            <>
                <Header />
                <main className="pt-20">
                    <Outlet />
                </main>
                <Footer />
            </>
        );
    }

    // Layout for other pages with sidebar
    return (
        <div className="flex min-h-screen bg-[#0A1929]">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64"> {/* ml-64 to account for sidebar width */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
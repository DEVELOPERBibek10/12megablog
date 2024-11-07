import React from "react";
import Container from "../Container/Container";
import { Logo } from "./Logo";
import { LogoutBtn } from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header>
        <Container>
          <nav className="border-gray-200 mb-10 py-4 px-5">
            <div className="w-full mx-auto">
              <div className="mx-2 flex flex-wrap items-center justify-between">
                <Logo />
                <div className="flex md:hidden md:order-2">
                  <button
                    id="menu-toggle"
                    data-collapse-toggle="mobile-menu-3"
                    type="button"
                    className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                    aria-controls="mobile-menu-3"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`md:flex justify-between items-end w-full md:w-auto md:order-1`}
                  id="mobile-menu-3"
                >
                  <ul className="flex-col md:flex-row flex items-center md:space-x-8 mt-5 md:mt-0 md:text-sm md:font-medium">
                    {navItems.map((item) =>
                      item.active ? (
                        <li key={item.name}>
                          <button
                            onClick={() => navigate(item.slug)}
                            className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
                          >
                            {item.name}
                          </button>
                        </li>
                      ) : null
                    )}
                    {authStatus && (
                      <li>
                        <LogoutBtn />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;

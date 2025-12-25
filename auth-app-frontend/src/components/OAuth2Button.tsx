import { NavLink } from "react-router";
import { Button } from "./ui/button";

function OAuth2Button() {
return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NavLink to={`${
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8085"
            }/oauth2/authorization/google`}>
            <Button variant="outline" className="w-full cursor-pointer" type="button">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
            aria-hidden="true"
            >
            <path d="M12 11v2h5.6c-.2 1.4-.9 2.6-2 3.4l3.2 2.5c1.9-1.7 3-4.2 3-6.9 0-.6-.1-1.2-.2-1.8H12z" />
            <path d="M6.6 14.2a5 5 0 0 1 0-4.5L3.4 7.2a8.02 8.02 0 0 0 0 9.6l3.2-2.6z" />
            <path d="M12 4.8c2 0 3.8.7 5.2 2l3-3A11.7 11.7 0 0 0 12 2 10 10 0 0 0 3.4 7.2l3.2 2.5A5.9 5.9 0 0 1 12 4.8z" />
            <path d="M12 19.2c-1.5 0-2.9-.5-4-1.3l-3.2 2.5A10 10 0 0 0 12 22c2.7 0 5.1-1 6.9-2.7l-3.2-2.5a6.7 6.7 0 0 1-3.7.4z" />
            </svg>
            Google
            </Button>
        </NavLink>

        <NavLink to={`${
            import.meta.env.VITE_API_BASE_URL || "http://localhost:8085"
            }/oauth2/authorization/github`}>
            <Button variant="outline" className="w-full cursor-pointer" type="button">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
            aria-hidden="true"
            >
            <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.9 2.7 1.3.1-.8.4-1.3.8-1.6-2.3-.3-4.7-1.2-4.7-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.1-.5 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.4 5.1-4.7 5.4.4.3.9 1.1.9 2.2v3.3c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
            </svg>
            GitHub
            </Button>
        </NavLink>
    </div>
);
}

export default OAuth2Button;

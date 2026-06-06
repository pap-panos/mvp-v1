import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 items-center p-4 mt-4 shadow">
      <aside className="grid-flow-col items-center justify-self-center sm:justify-self-start">
        <p>Copyrights © {new Date().getFullYear()} - Made with ❤️ by pap</p>
      </aside>
      <nav className="grid-flow-col gap-4 justify-self-center sm:justify-self-end items-center">
        <a
          href="https://github.com/pap-panos/mvp-v1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="size-6 " />
        </a>
        <a
          href="https://www.youtube.com/@elapapi4732"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="size-6 text-red-600" />
        </a>
        <a
          href="https://www.linkedin.com/in/papachristodoulou-panagiotis/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="size-6 text-blue-700" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;

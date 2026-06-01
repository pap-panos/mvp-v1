const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 p-4 footer-center">
      <aside>
        <p>Copyrights © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;

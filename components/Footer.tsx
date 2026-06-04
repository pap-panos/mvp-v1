const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 p-4 items-center  mt-4">
      <label className="justify-self-center sm:justify-self-start items-center  grid-flow-col ">
        🌐 Language
      </label>
      <aside className="grid-flow-col justify-self-center items-center">
        <p>Copyrights © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <label className="justify-self-center sm:justify-self-end items-center  grid-flow-col ">
        🌗 Theme
      </label>
    </footer>
  );
};

export default Footer;

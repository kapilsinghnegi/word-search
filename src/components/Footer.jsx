const Footer = () => {
  return (
    <footer className="w-full mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-center text-center text-gray-600 dark:text-gray-400 text-sm py-4">
        <span>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/kapilsinghnegi/"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kapil Singh Negi
          </a>
        </span>
        <span className="mx-2 hidden md:inline">|</span>
        <span className="flex items-center space-x-2 mt-2 md:mt-0 md:ml-2">
          <a
            href="https://github.com/kapilsinghnegi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill ri-xl text-gray-400 hover:text-gray-500 transition-colors duration-300"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kapil-singh-negi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-fill ri-xl text-gray-400 hover:text-blue-500 transition-colors duration-300"></i>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

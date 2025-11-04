export const Navbar = () => {
  return (
    <nav className="panel mb-10 mt-3.5 mx-auto flex justify-center max-w-[300px] md:max-w-[500px]">
      <ul className="flex justify-around w-full">
        <a href="#home">
          <li className="link-nav text-xl md:text-2xl">Home</li>
        </a>
        <a href="#games-avaliable">
          <li className="link-nav text-xl md:text-2xl">Games</li>
        </a>
        <a href="#madeby">
          <li className="link-nav text-xl md:text-2xl">Made By</li>
        </a>
      </ul>
    </nav>
  );
};

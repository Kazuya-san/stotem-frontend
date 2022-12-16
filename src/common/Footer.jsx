export const Footer = () => {
  return (
    <div
      className="
        w-full
        h-20
        flex
        justify-center
        items-center
        md:px-16
        px-5
        bg-gray-700
        text-white
        "
    >
      Copyright &copy; STOTEM {new Date().getFullYear()}
    </div>
  );
};

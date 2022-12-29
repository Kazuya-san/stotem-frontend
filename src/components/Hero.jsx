import bg from "../assets/bg.jpeg";

const Hero = () => {
  return (
    <div>
      <div
        className="w-full h-[300px] md:h-[570px] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="text-center">
          <div
            className="md:text-5xl text-3xl m-5 font-[900] md:underline text-[#355070] mt-5 italic"
            style={{
              letterSpacing: "0.15rem",
            }}
          >
            <div className="md:block inline mb-2">
              YOUR EVENT, YOUR FRIENDS, YOUR
            </div>
            <div className="md:block inline ml-2 md:ml-0">STYLE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = false;
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user, navigate]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex flex-col items-center justify-center my-5 gap-0 md:gap-40 md:flex-row">
        {/* left side start here */}
        <div className="w-full h-full hidden lg:w-2/3 md:flex flex-col items-center justify-center ">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20 ">
            <span className="capitalize italic flex gap-1 py-1 px-3 rounded-full text-sm md:text-base border  border-blue-700 text-gray-600">
              manage your tasks from one palce!
            </span>
            <p className="flex flex-col text-4xl md:text-6xl 2xl:text-7xl gap-0 md:gap-4 font-bold text-center text-blue-700 ">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>
            <div className=" cell ">
              <div className="circle  rotate-in-up-left"></div>
            </div>
          </div>
        </div>
        {/* left side end here */}

        {/* right side start here */}
        <div className="w-full md:w-1/3 p-4 md:p-1  flex flex-col items-center justify-center">
          <form className="form-container  w-full md:w-[400px] flex flex-col gap-y-8 px-10  py-14 bg-gray-50 border border-blue-300 rounded-md">
            <div>
              <p className="text-3xl text-blue-500 font-bold text-center">
                Welcom Back!
              </p>
              <p className="text-center text-gray-600 text-base">
                Sign in to your account to do your tasks
              </p>
            </div>
            <div className="flex flex-col gap-y-5">
              <input
                type="email"
                placeholder="Enter your email..."
                id="email"
                className="w-full rounded-full px-4 py-2.5 bg-gray-100 focus: outline-none border border-blue-600"
              />
              <input
                type="password"
                placeholder="Enter your password..."
                id="password"
                className="w-full rounded-full px-4 py-2.5 bg-gray-100 focus: outline-none border border-blue-600"
              />
              <span className="text-sm pl-5 text-blue-500 hover:text-red-500 transition-all duration-300 hover:underline cursor-pointer ">
                {" "}
                Forget Password?
              </span>
              <button
                type="submit"
                className="w-full rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        {/* right side end here */}
      </div>
    </div>
  );
};

export default Login;

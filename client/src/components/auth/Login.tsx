import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 w-[25rem] p-8 rounded-xl">
        <p className="text-center font-bold text-2xl mb-2 bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">
          Talkle
        </p>
        <p className="text-center font-bold text-xl mb-4 bg-gradient-to-t from-violet-200 to-indigo-500 bg-clip-text text-transparent">
          A simple chating app
        </p>
        <p className="mb-3 text-xl text-neutral-400 text-center">Login in.!</p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full max-w-xs">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="py-2 px-4 rounded-xl mb-4 border-2 border-slate-400 bg-slate-600"
            />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <input
              type="password"
              name="password"
              id="password"
              className="py-2 px-4 mb-4 rounded-xl border-2 border-slate-400 bg-slate-600"
              placeholder="Password"
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="save-pass"
                id="save-pass"
                className="text-center accent-slate-500"
              />
              <label htmlFor="save-pass" className="text-slate-400">
                Save password
              </label>
            </div>
          </div>

          <button className="py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5">
            Login
          </button>
        </div>
        <Link to='/signup' className="flex justify-center"><span className="text-slate-300 hover:text-slate-200 cursor-pointer">Don't have an account in <span className="bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">Talkle</span> ?</span></Link>
      </div>
    </div>
  );
};

export default Login;

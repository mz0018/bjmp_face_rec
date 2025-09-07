import useSigninHook from "./hooks/useSigninHook";

const Signin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authMode, setAuthMode, signup, signin, loading } = useSigninHook(API_URL);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (authMode === "login") {
      signin({ emailOrUsername: form.email.value, password: form.password.value });
    } else {
      signup({
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        retype: form.retype.value,
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#0033A0]">
          {authMode === "login" ? "Admin Login" : "Admin Signup"}
        </h1>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`px-4 py-2 rounded-md font-medium ${
              authMode === "login"
                ? "bg-[#0033A0] text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("signup")}
            className={`px-4 py-2 rounded-md font-medium ${
              authMode === "signup"
                ? "bg-[#0033A0] text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {authMode === "signup" && (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-700 mb-1">
              {authMode === "login" ? "Email or Username" : "Email"}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder={authMode === "login" ? "Enter email or username" : "Enter email"}
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {authMode === "signup" && (
            <div className="flex flex-col">
              <label htmlFor="retype" className="text-sm text-gray-700 mb-1">Retype Password</label>
              <input
                type="password"
                id="retype"
                name="retype"
                placeholder="Retype password"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-2 rounded-md bg-[#CE1126] text-white font-medium hover:bg-[#b20f20] transition"
          >
            {loading
              ? "Processing..."
              : authMode === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          © 2025, BJMP Visitors Biometrics
        </p>
      </div>
    </main>
  );
};

export default Signin;

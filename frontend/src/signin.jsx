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
        <main className="max-w-md mx-auto p-6 mt-10 border rounded shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">
                {authMode === "login" ? "Admin Login" : "Admin Signup"}
            </h1>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className={`px-4 py-2 rounded ${authMode === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`px-4 py-2 rounded ${authMode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Signup
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {authMode === "signup" && (
                    <>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter username" required className="border px-2 py-1 rounded" />
                    </>
                )}

                <label htmlFor="email">{authMode === "login" ? "Email or Username" : "Email"}</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder={authMode === "login" ? "Enter email or username" : "Enter email"}
                    required
                    className="border px-2 py-1 rounded"
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" required className="border px-2 py-1 rounded" />

                {authMode === "signup" && (
                    <>
                        <label htmlFor="retype">Retype Password</label>
                        <input type="password" id="retype" name="retype" placeholder="Retype password" required className="border px-2 py-1 rounded" />
                    </>
                )}

                <button
                    type="submit"
                    className="mt-3 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? "Processing..." : authMode === "login" ? "Sign In" : "Sign Up"}
                </button>
            </form>
        </main>
    );
};

export default Signin;

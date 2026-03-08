import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [createAccount, setCreateAccount] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verified, setVerified] = useState(false);

  // Loading states — prevents duplicate requests
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, setToken, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  // OTP countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Reset OTP state when switching modes
  const switchMode = (toCreate) => {
    setCreateAccount(toCreate);
    setShowOtp(false);
    setOtp("");
    setVerified(false);
    setTimer(0);
    setName("");
    setEmail("");
    setPassword("");
  };

  // SEND OTP — guarded with isSendingOtp to prevent double-fire
  const sendOtp = async () => {
    if (!email) return toast.error("Enter your email first");
    if (isSendingOtp) return;

    setIsSendingOtp(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/otp/send-otp`, { email });
      if (data.success) {
        setShowOtp(true);
        setTimer(30);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");
    if (isVerifyingOtp) return;

    setIsVerifyingOtp(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/otp/verify-otp`, { email, otp });
      if (data.success) {
        toast.success(data.message);
        setVerified(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };



  // SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (createAccount && !verified) {
      toast.error("Please verify your email first");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = createAccount
        ? `${backendUrl}/api/user/register`
        : `${backendUrl}/api/user/login`;

      const payload = createAccount
        ? { name, email, password }
        : { email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Header bar */}
        <div className="bg-blue-500 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            {createAccount ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            {createAccount
              ? "Sign up to book your appointment"
              : "Login to manage your appointments"}
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => switchMode(false)}
            className={`cursor-pointer flex-1 py-3 text-sm font-medium transition-colors ${
              !createAccount
                ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchMode(true)}
            className={`cursor-pointer flex-1 py-3 text-sm font-medium transition-colors ${
              createAccount
                ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="px-8 py-6 space-y-5">

          {/* NAME */}
          {createAccount && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                type="email"
                required
                disabled={showOtp}
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {createAccount && !verified && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={timer > 0 || isSendingOtp}
                  className={`cursor-pointer px-4 py-2.5 rounded-lg text-sm font-medium text-white transition whitespace-nowrap ${
                    timer > 0 || isSendingOtp
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  }`}
                >
                  {isSendingOtp ? (
                    <span className="flex items-center gap-1">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending
                    </span>
                  ) : timer > 0 ? (
                    `${timer}s`
                  ) : (
                    "Send OTP"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* OTP FIELD */}
          {showOtp && createAccount && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3">
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:bg-gray-100 text-center tracking-widest font-mono"
                  type="text"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  disabled={verified}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {verified ? (
                  <div className="flex items-center gap-1 px-3 text-green-600 font-semibold text-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                    Verified
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={isVerifyingOtp}
                    className="px-4 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition whitespace-nowrap"
                  >
                    {isVerifyingOtp ? (
                      <span className="flex items-center gap-1">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Verifying
                      </span>
                    ) : "Verify"}
                  </button>
                )}
              </div>


              {verified && (
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Email verified successfully
                </p>
              )}
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              type="password"
              required
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {createAccount ? "Creating Account..." : "Logging In..."}
              </>
            ) : (
              createAccount ? "Create Account" : "Login"
            )}
          </button>

        </form>


      </div>
    </section>
  );
};

export default Login;
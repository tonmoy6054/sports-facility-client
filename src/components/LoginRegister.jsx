import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          {isLogin ? <LoginForm /> : <RegistrationForm />}
          <p className="text-center mt-4">
            {isLogin ? (
              <>
                Dont have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  Login here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

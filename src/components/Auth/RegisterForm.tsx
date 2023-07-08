import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuth from "@/hooks/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type RegisterProps = {
  toggle: () => void;
};

export type RegisterData = {
  email: string;
  password: string;
  repeatPassword?: string;
};

const Register: React.FC<RegisterProps> = ({ toggle }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const { register, error, loading } = useAuth();

  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    if (error) {
      setRegisterError("Email is already in use, please try another");
    } else {
      setRegisterError("");
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center my-4">
      <div className="text-3xl font-bold">Register</div>
      <div className="w-[90%]">
        <Formik
          initialValues={{ email: "", password: "", repeatPassword: "" }}
          validate={(values: RegisterData) => {
            const errors: Partial<RegisterData> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Password must contain atleast 6 characters";
            }
            if (!values.repeatPassword) {
              errors.repeatPassword = "Required";
            } else if (values.repeatPassword.length < 6) {
              errors.repeatPassword =
                "Password must contain atleast 6 characters";
            }
            if (values.password !== values.repeatPassword) {
              errors.repeatPassword = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            register(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col w-full">
              <div
                onClick={() => emailRef.current?.focus()}
                className="text-sm mt-4 mb-1 font-medium"
              >
                Email
              </div>
              <Field
                type="email"
                name="email"
                innerRef={emailRef}
                className="h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779]  border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                placeholder="Enter your email address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-[#b12124]"
              />
              <div
                onClick={() => passwordRef.current?.focus()}
                className="text-sm mt-3 mb-1 font-medium"
              >
                Password
              </div>
              <Field
                type="password"
                name="password"
                innerRef={passwordRef}
                className="h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                placeholder="Enter your password"
                autoComplete="off"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-[#b12124]"
              />
              <div
                onClick={() => repeatPasswordRef.current?.focus()}
                className="text-sm mt-3 mb-1 font-medium"
              >
                Repeat Password
              </div>
              <Field
                type="password"
                name="repeatPassword"
                innerRef={repeatPasswordRef}
                className="h-[36px] py-1 px-2 rounded-md dark:bg-[#25262b]  dark:focus:border outline-none dark:border-[#777779] border dark:border-none border-[#a1a1a3] placeholder:text-sm placeholder:color-[#777779] placeholder:font-light"
                placeholder="Repeat your password"
                autoComplete="off"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-sm text-[#b12124]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1c1c1d] h-[36px] py-1 px-2 rounded-md mt-4 text-white font-medium"
              >
                <div className="flex justify-center items-center space-x-2">
                  {loading && (
                    <div className="animate-spin">
                      <AiOutlineLoading3Quarters></AiOutlineLoading3Quarters>
                    </div>
                  )}
                  <div>Register</div>
                </div>
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {registerError && (
        <div className="w-[90%] flex text-[#b12124] overflow-hidden">
          {registerError}
        </div>
      )}
      <div className="w-[90%] flex justify-end mt-4">
        <div className="flex text-sm">
          <div>Already have an account?</div>
          <div className="ml-2 font-semibold cursor-pointer" onClick={toggle}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

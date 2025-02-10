import { useState, useEffect } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { setTokens } from "@/store/auth-slice";
import DefaultLayout from "@/layouts/default";
import { useApi } from "@/hooks/use-api";
import { ILogin } from "@/interfaces/ILogin";
import { loginUrl } from "@/config/endpoints";
import { RootState } from "@/store";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const api = useApi<ILogin>();
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    mode: "onChange",
  });

  useEffect(() => {
    if (userRole === "student") {
      navigate("/");
    } else if (userRole === "librarian") {
      navigate("/checkouts");
    }
  }, [userRole, navigate]);

  const onSubmit = async (data: ILogin) => {
    if (isValid) {
      try {
        const response = await api.post(loginUrl, data);

        const { access, refresh } = response as ILogin;

        if (!access || !refresh) {
          setError("Internal error, try again.");
        }

        setError(null);
        dispatch(setTokens({ accessToken: access!, refreshToken: refresh! }));

        return <Navigate to="/" />;
      } catch (error) {
        setError("Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center h-full justify-center gap-4 py-8 md:py-10">
        <Form
          className="flex flex-col w-96 gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            isClearable
            isRequired
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
          <Input
            isClearable
            isRequired
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div> // Display error message
          )}
          <Button
            className="w-full"
            color="primary"
            isDisabled={!isValid}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </section>
    </DefaultLayout>
  );
}

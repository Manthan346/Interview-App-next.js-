// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
//   FieldSeparator,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { authClient } from "@/lib/auth/auth-client";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useStore } from "@/lib/store/booking-data";

// const signupSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// type SignupFormData = z.infer<typeof signupSchema>;

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const { setUserData } = useStore();

//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: SignupFormData) => {
//     try {
//       const { email, password, name } = data;

//       const { error } = await authClient.signUp.email(
//         {
//           email,
//           password,
//           name,
//           callbackURL: "/",
//         },
//         {
//           onRequest: () => {
//             console.log("Signing up...");
//           },
//           onSuccess: (ctx) => {
//             // Store user data in Zustand
//             console.log(JSON.stringify(ctx.data));
//             console.log(JSON.stringify(ctx.response));
//             setUserData({
//               name: name,
//               email: email,
//               id: ctx.data?.user?.id,
//             });

//             toast.success("Signup successful!");
//             router.push("/");
//           },
//           onError: (ctx) => {
//             toast.error(ctx.error.message);
//           },
//         }
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const { data, error } = await authClient.signIn.social(
//       {
//         provider: "google",

//         // url to redirect on successful signin
//         callbackURL: "/interview",
//         // A URL to redirect if an error occurs during the sign in process
//         errorCallbackURL: "/error",
//         // A URL to redirect if the user is newly registered
//         newUserCallbackURL: "/interview",
//         // // disable the automatic redirect to the provider. default is false

//         disableRedirect: false,
//       },
//       {
//         onRequest: (ctx) => {
//           // show Loading
//           setIsLoading(!isLoading);
//         },

//         onSuccess: (ctx) => {
//           console.log("user data is", JSON.stringify(ctx));
//           // Store user data in Zustand
//           // setUserData({
//           //   name: ctx.data?.user?.name || "",
//           //   email: ctx.data?.user?.email,
//           //   id: ctx.data?.user?.id,
//           // });

//           toast.success("Login successful!");
//           // router.push("/");
//         },
//         onError: (ctx) => {
//           // display the error message and redirect to error page
//           console.log("Error while sign", ctx.error);
//           setIsLoading(!isLoading);
//         },
//       }
//     );
//   };

//   const handleLinkedInLogin = async () => {
//     const data = await authClient.signIn.social(
//       {
//         provider: "linkedin",
//         callbackURL: "/interview",
//         errorCallbackURL: "/error",
//         newUserCallbackURL: "/interview",
//         disableRedirect: false,
//       },
//       {
//         onRequest: (ctx) => {
//           setIsLoading(!isLoading);
//           console.log("hello i am requesting");
//         },
//         onSuccess: (ctx) => {
//           console.log("User is signed in", JSON.stringify(ctx));
//           // toast.success("Login successful!");
//         },
//         onError: (ctx) => {
//           // display the error message and redirect to error page
//           console.log("Error while sign", ctx.error);
//           setIsLoading(!isLoading);
//         },
//       }
//     );
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className={cn("flex flex-col gap-6", className)}
//       {...props}
//     >
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h1 className="text-2xl font-bold">Create your account</h1>
//           <p className="text-muted-foreground text-sm text-balance">
//             Fill in the form below to create your account
//           </p>
//         </div>

//         {/* Name Field */}
//         <Field>
//           <FieldLabel htmlFor="name">Full Name</FieldLabel>
//           <Input id="name" placeholder="John Doe" {...register("name")} />
//           {errors.name && (
//             <FieldDescription className="text-red-500">
//               {errors.name.message}
//             </FieldDescription>
//           )}
//         </Field>

//         {/* Email Field */}
//         <Field>
//           <FieldLabel htmlFor="email">Email</FieldLabel>
//           <Input
//             id="email"
//             type="email"
//             placeholder="m@example.com"
//             {...register("email")}
//           />
//           {errors.email && (
//             <FieldDescription className="text-red-500">
//               {errors.email.message}
//             </FieldDescription>
//           )}
//         </Field>

//         {/* Password Field */}
//         <Field>
//           <FieldLabel htmlFor="password">Password</FieldLabel>
//           <Input
//             id="password"
//             type="password"
//             placeholder="********"
//             {...register("password")}
//           />
//           {errors.password && (
//             <FieldDescription className="text-red-500">
//               {errors.password.message}
//             </FieldDescription>
//           )}
//         </Field>

//         <Field>
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Creating Account..." : "Create Account"}
//           </Button>
//         </Field>

//         <FieldSeparator>Or continue with</FieldSeparator>

//         <Field>
//           <div className="grid grid-cols-2 gap-7">
//             <Button
//               className="hover:bg-transparent hover:cursor-pointer"
//               variant="outline"
//               onClick={() => handleGoogleLogin()}
//               type="button"
//               disabled={isLoading}
//               title="Sign up with Google"
//             >
//               {/* Google Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 className="size-5"
//               >
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//               </svg>
//             </Button>

//             <Button
//               className="hover:bg-transparent hover:cursor-pointer"
//               variant="outline"
//               type="button"
//               title="Sign up with LinkedIn"
//               onClick={() => handleLinkedInLogin()}
//             >
//               {/* LinkedIn Icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 className="size-5"
//               >
//                 <path
//                   d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.744h3.554v1.378c.43-.664 1.195-1.612 2.905-1.612 2.12 0 3.714 1.383 3.714 4.356v5.622zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.927.762 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.563h3.891v10.889zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
//                   fill="#0A66C2"
//                 />
//               </svg>
//             </Button>
//           </div>
//         </Field>

//         <Field>
//           <FieldDescription className="px-6 text-center">
//             Already have an account? <Link href="/login">Login</Link>
//           </FieldDescription>
//         </Field>
//       </FieldGroup>
//     </form>
//   );
// }
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store/booking-data";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { setUserData } = useStore();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { email, password, name } = data;

      const { error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            console.log("Signing up...");
          },
          onSuccess: (ctx) => {
            // Store user data in Zustand
            console.log(JSON.stringify(ctx.data));
            console.log(JSON.stringify(ctx.response));
            setUserData({
              name: name,
              email: email,
              id: ctx.data?.user?.id,
            });

            toast.success("Signup successful!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/interview",
          errorCallbackURL: "/error",
          newUserCallbackURL: "/interview",
          disableRedirect: false,
        },
        {
          onRequest: (ctx) => {
            console.log("Initiating Google login...");
          },
          onSuccess: (ctx) => {
            // Don't show toast here - redirect happens immediately
            // Toast will be shown on the callback page after successful auth
            console.log("Google redirect initiated");
          },
          onError: (ctx) => {
            console.error("Error while signing in with Google:", ctx.error);
            toast.error(ctx.error.message || "Google login failed");
            setIsGoogleLoading(false);
          },
        }
      );
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Something went wrong with Google login");
      setIsGoogleLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    setIsLinkedInLoading(true);

    try {
      await authClient.signIn.social(
        {
          provider: "linkedin",
          callbackURL: "/interview",
          errorCallbackURL: "/error",
          newUserCallbackURL: "/interview",
          disableRedirect: false,
        },
        {
          onRequest: (ctx) => {
            console.log("Initiating LinkedIn login...");
          },
          onSuccess: (ctx) => {
            // Don't show toast here - redirect happens immediately
            // Toast will be shown on the callback page after successful auth
            console.log("LinkedIn redirect initiated");
          },
          onError: (ctx) => {
            console.error("Error while signing in with LinkedIn:", ctx.error);
            toast.error(ctx.error.message || "LinkedIn login failed");
            setIsLinkedInLoading(false);
          },
        }
      );
    } catch (err) {
      console.error("LinkedIn login error:", err);
      toast.error("Something went wrong with LinkedIn login");
      setIsLinkedInLoading(false);
    }
  };

  const isSocialLoading = isGoogleLoading || isLinkedInLoading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name Field */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          {errors.name && (
            <FieldDescription className="text-red-500">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <FieldDescription className="text-red-500">
              {errors.email.message}
            </FieldDescription>
          )}
        </Field>

        {/* Password Field */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && (
            <FieldDescription className="text-red-500">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={isSubmitting || isSocialLoading}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <div className="grid grid-cols-2 gap-7">
            <Button
              className="hover:bg-transparent hover:cursor-pointer"
              variant="outline"
              onClick={handleGoogleLogin}
              type="button"
              disabled={isSocialLoading}
              title="Sign up with Google"
            >
              {isGoogleLoading ? (
                <span className="size-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-5"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
            </Button>

            <Button
              className="hover:bg-transparent hover:cursor-pointer"
              variant="outline"
              type="button"
              title="Sign up with LinkedIn"
              onClick={handleLinkedInLogin}
              disabled={isSocialLoading}
            >
              {isLinkedInLoading ? (
                <span className="size-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-5"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.744h3.554v1.378c.43-.664 1.195-1.612 2.905-1.612 2.12 0 3.714 1.383 3.714 4.356v5.622zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.927.762 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.563h3.891v10.889zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                    fill="#0A66C2"
                  />
                </svg>
              )}
            </Button>
          </div>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

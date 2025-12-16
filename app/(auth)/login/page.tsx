"use client";

import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, LoginForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  BookOpen,
  Mail,
  Lock,
  LogIn,
  Github,
  Linkedin,
} from "lucide-react";
export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginForm) => {
    const res = await signIn("credentials", { redirect: false, ...data });

    if (res?.error) {
      alert("Invalid email or password");
      return;
    }

    const session = await getSession();
    const role = session?.user?.role;

    if (role === "TEACHER") router.replace("/teacher");
    else if (role === "STUDENT") router.replace("/student");
    else router.replace("/");
  };

//  // After successful sign-in, fetch the session from the API
//     const sessionRes = await fetch("/api/auth/session");
//     const sessionData = await sessionRes.json();

//     // Check role and redirect manually
//     const role = sessionData?.user?.role;
//     if (role === "TEACHER") router.replace("/teacher");
//     else if (role === "STUDENT") router.replace("/student");
//     else router.replace("/"); // fallback
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Assignment Manager
            </h1>
            <p className="text-gray-600 mt-2 text-sm font-medium">
              Streamline learning, empower teaching
            </p>
          </div>
        </div>

        <Card className="w-full shadow-xl border-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Sign in to continue to your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            className="pl-10 h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-gray-700 font-medium">
                          Password
                        </FormLabel>
                        <Button
                          type="button"
                          variant="link"
                          className="text-xs text-blue-600 h-auto p-0"
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            className="pl-10 h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <footer className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/Jithin7777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                <Github className="h-5 w-5" />
              </div>
              <span className="font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jithin-jose88"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">
              Developed by <span className="text-gray-800">Jithin Jose</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Smart Assignment Manager © 2025
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

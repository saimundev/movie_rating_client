"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EyeOpenIcon from "../icon/EyeOpenIcon";
import { useEffect, useState } from "react";
import EyeCloseIcon from "../icon/EyeCloseIcon";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpMutation } from "@/store/api/userApi";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/features/authSlice";
import { setCookie } from 'cookies-next';
import Container from "../shared/Container";
import Link from "next/link";


const FormSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "name must be at least 3 characters.",
      })
      .max(30, { message: "name must be max 30 characters" }),
    email: z
      .string()
      .min(6, {
        message: "email must be at least 6 characters.",
      })
      .max(30, { message: "email must be max 30 characters" })
      .email(),
    password: z
      .string()
      .min(5, {
        message: "password must be at least 5 characters.",
      })
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
  })

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const route = useRouter();
  const [createUser, { isSuccess, isLoading, error, data }] =
    useSignUpMutation();
  const dispatch = useAppDispatch();

  console.log(data)
  console.log(error)
  //error message
  useEffect(() => {
    if (error) {
      toast({
        title: (error as any)?.data?.message,
        variant: "destructive",
      });
    }
  }, [error]);

  //success message
  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "Account create successful",
        variant: "success",
      });

      route.push("/otp-verification");

      //store data in cookie storage
      setCookie("access_token", (data as any)?.token)
      dispatch(getUser((data as any)?.token))

    }
  }, [isSuccess, data, dispatch]);



  const onSubmit = (data: z.infer<typeof FormSchema>) => {

    //create user
    createUser(data);
  };


  return (
    <div className="text-bgColor h-screen">
      <Container>
        <div className="grid grid-cols-[1fr_1fr] items-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome to MOVIE.COM</h1>
            <h3 className="mt-3 text-xl text-white">Enjoy your time with MOVIE.COM</h3>
          </div>

          {/* sign up form */}
          <Card className="bg-black/40 mt-10 text-white border-none">
            <CardHeader>
              <CardTitle className="font-bold text-white">Create your account</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  {/* name field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} className="bg-black/80" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* email field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <div
                            className=""
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOpenIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                            ) : (
                              <EyeCloseIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />




                  <Button disabled={isLoading} type="submit" className="w-full !mt-6">
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button asChild variant="link" className="text-xs text-blue-200">
                <Link href="sign-in">Already have account? Sing-up please</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// import SocialButtons from '@/core/components/auth/social-buttons';
import VisibilityToggle from '@/core/components/auth/visibility-toggle';
import FormLoading from '@/core/components/shared/form-loading';
import { Button } from '@/core/components/ui/button';
import {
  Form,
  FormControl,
  FormControlIcon,
  FormControlWithIcon,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { signIn } from '@/core/actions/auth';
import { useErrorHandler } from '@/core/hooks/error';
import { TSignInSchema, signInSchema } from '@/core/schemas/auth';
import { TSignInArgs } from '@/core/types/auth';
import { cn } from '@/core/utils/common';

const SignInForm = () => {
  const searchParams = useSearchParams();
  const { toastError } = useErrorHandler();

  const [isPending, setPending] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'nextauth@proton.me',
      password: 'Guest01',
    },
  });

  const redirectTo = searchParams.get('redirectTo') || undefined;

  const onSubmit = async (values: TSignInSchema) => {
    const signinData: TSignInArgs = {
      email: values.email,
      password: values.password,
      redirectTo,
    };

    try {
      setPending(true);
      const res = await signIn(signinData);
      if (!res?.success && res?.error) {
        toastError(res.error);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      // toastError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('auth-form', { inactive: isPending })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControlWithIcon>
                <FormControlIcon>
                  <VisibilityToggle
                    onClick={() => setPwdVisible((prev) => !prev)}
                  />
                </FormControlIcon>
                <Input {...field} type={pwdVisible ? 'text' : 'password'} />
              </FormControlWithIcon>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="accent"
          loading={isPending}
          className="auth-form_button"
          type="submit"
        >
          Sign In
        </Button>
        {/* <SocialButtons /> */}
        <div className="flex justify-center">
          <Link href="/sign-up" className="auth-form_link">
            Create an account
          </Link>
        </div>
        <FormLoading loadigIconClassName="-mt-20" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignInForm;

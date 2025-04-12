'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/core/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { signUp } from '@/core/actions/auth';
import { useErrorHandler } from '@/core/hooks/error';
import { TSignUpSchema, signUpSchema } from '@/core/schemas/auth';
import FormLoading from '@/core/components/shared/form-loading';
import { cn } from '@/core/utils/common';

const SignUpForm = () => {
  const router = useRouter();
  const { toastError } = useErrorHandler();
  const [isPending, setPending] = useState(false);

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: TSignUpSchema) => {
    try {
      setPending(true);
      const res = await signUp({ email: values.email });
      if (!res?.success) {
        toastError(res);
        setPending(false);
        return;
      }

      // If success, redirect to the email verify page
      router.push(`/email/verify?e=${values.email}`);
    } catch (err: unknown) {
      toastError(err);
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
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          Continue
        </Button>
        <div className="flex justify-center">
          <Link href="/sign-in" className="auth-form_link">
            Already have an account ?
          </Link>
        </div>
        <FormLoading loadigIconClassName="-mt-14" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignUpForm;

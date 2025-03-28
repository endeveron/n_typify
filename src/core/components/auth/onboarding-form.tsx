'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { onboardUser } from '@/core/actions/user';
import { useErrorHandler } from '@/core/hooks/error';
import { TOnboardingSchema, onboardingSchema } from '@/core/schemas/auth';
import { cn } from '@/core/utils/common';

type TOnboardingFormProps = {
  userObjId: string;
};

const OnboardingForm = ({ userObjId }: TOnboardingFormProps) => {
  const router = useRouter();
  const { toastError } = useErrorHandler();

  const [pwdVisible, setPwdVisible] = useState(false);
  const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);
  const [isPending, setPending] = useState(false);

  const form = useForm<TOnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TOnboardingSchema) => {
    try {
      setPending(true);
      const res = await onboardUser({
        userObjId: userObjId,
        name: values.name,
        password: values.password,
      });

      // If success redirect to sign-in
      if (res?.success) {
        router.replace('/sign-in?redirectTo=dashboard');
        return;
      }

      toastError(res);
      setPending(false);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControlWithIcon>
                <FormControlIcon>
                  <VisibilityToggle
                    onClick={() => setConfirmPwdVisible((prev) => !prev)}
                  />
                </FormControlIcon>
                <Input
                  {...field}
                  type={confirmPwdVisible ? 'text' : 'password'}
                />
              </FormControlWithIcon>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isPending} className="auth-form_button" type="submit">
          Create an account
        </Button>
        <FormLoading loadigIconClassName="-mt-14" isPending={isPending} />
      </form>
    </Form>
  );
};

export default OnboardingForm;

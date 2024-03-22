import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginLayout from '@/layouts/LoginLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useLogin from '@/lib/api/useLogin';
import loginShema from '@/lib/schemas/loginShema';
import URLS from '@/lib/utils/constants/urls';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/text';

const LoginPage = () => {
  const { push } = useRouter();

  const { t } = useTranslation('common');

  const form = useForm<z.infer<typeof loginShema>>({
    resolver: zodResolver(loginShema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { mutate } = useLogin({
    onSuccess: () => {
      push(URLS.DASHBOARD);
    },
  });

  const onSubmit = (values: z.infer<typeof loginShema>) => {
    mutate(values);
  };

  return (
    <LoginLayout>
      <div className="flex w-2/3 flex-col items-center justify-center">
        <Text font="grapeNuts" size="4xl" bold="extra" className="mb-8 text-primary">
          {t('login.welcome_gaiagec')}
        </Text>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('form.email')} {...field} />
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
                  <FormControl>
                    <Input type="password" placeholder={t('form.password')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {t('form.login')}
            </Button>
          </form>
          <Link className="self-end" href={URLS.FORGET_PASSWORD}>
            <Text size="sm" className="text-primary">
              {t('login.forget_password')}
            </Text>
          </Link>
        </Form>
      </div>
    </LoginLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const namespaces = ['common'];
  const { serverProps } = await getServerProps({ context, namespaces });

  return {
    props: { ...serverProps },
  };
};

export default LoginPage;

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useCreatePackagings from '@/lib/api/useCreatePackagings';
import packagingsShema, { packagingInputs } from '@/lib/schemas/packagingsShema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FormFields from '@/components/FormFields';

type CreatePackagingsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
};

const CreatePackagingsSheet = ({ open, setOpen, onSuccess }: CreatePackagingsProps) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof packagingsShema>>({
    resolver: zodResolver(packagingsShema),
    defaultValues: {
      reference: '',
      name: '',
      additionalInformations: '',
      description: '',
      veryHighConcernSubstanceNames: '',
      recycledMaterialRatio: 0,
    },
  });

  const { mutate, isSuccess } = useCreatePackagings({
    onSuccess: () => {
      onSuccess();
      setOpen(false);
    },
  });

  useEffect(() => {
    form.reset();
  }, [isSuccess]);

  const onSubmit = (values: z.infer<typeof packagingsShema>) => {
    mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-3 border-b pb-2">{t('packagings.create.title')}</SheetTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
              {packagingInputs.map((input) => (
                <FormFields key={input.name} input={input} form={form} />
              ))}

              <Button className="w-full" type="submit">
                {t('certificates.create.submit')}
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CreatePackagingsSheet;

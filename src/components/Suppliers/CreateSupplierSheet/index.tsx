import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useCreateSupplier from '@/lib/api/useCreateSupplier';
import supplierSchema, { supplierInputs } from '@/lib/schemas/supplierSchema';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FormFields from '@/components/FormFields';

type CreateSupplierProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
};

const CreateSupplierSheet = ({ open, setOpen, onSuccess }: CreateSupplierProps) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof supplierSchema>>({
    resolver: zodResolver(supplierSchema),
  });

  const { mutate, isSuccess } = useCreateSupplier({
    onSuccess: () => {
      onSuccess();
      setOpen(false);
    },
  });

  useEffect(() => {
    form.reset();
  }, [isSuccess]);

  const onSubmit = (values: z.infer<typeof supplierSchema>) => {
    mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-3 border-b pb-2">{t('suppliers.create.title')}</SheetTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
              {supplierInputs.map((input) => (
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

export default CreateSupplierSheet;

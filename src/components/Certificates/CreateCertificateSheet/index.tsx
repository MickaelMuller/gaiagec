import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import useCreateCertificates from '@/lib/api/useCreateCertificates';
import useGetSuppliers from '@/lib/api/useGetSuppliers';
import certificateSchema, { certificateType } from '@/lib/schemas/certificateSchema';
import { capitalizeFirstChar } from '@/lib/utils/capitalizeFirstChar';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type CreateCertificateSheetProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
};

const CreateCertificateSheet = ({ open, setOpen, onSuccess }: CreateCertificateSheetProps) => {
  const { t } = useTranslation();
  const { data: supplier } = useGetSuppliers({ page: 1, size: 100 });

  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      reference: '',
    },
  });

  const fileRef = form.register('file');

  const { mutate, isSuccess } = useCreateCertificates({
    onSuccess: () => {
      onSuccess();
      setOpen(false);
    },
  });

  useEffect(() => {
    form.reset();
  }, [isSuccess]);

  const onSubmit = (values: z.infer<typeof certificateSchema>) => {
    mutate(values);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-7">{t('certificates.create.title')}</SheetTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t('certificates.create.reference')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certificateType"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('certificates.create.certificateType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {certificateType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {capitalizeFirstChar(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('certificates.create.supplier')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supplier?.results.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(!field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{t('certificates.create.valid_from')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(!field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{t('certificates.create.valid_to')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default CreateCertificateSheet;

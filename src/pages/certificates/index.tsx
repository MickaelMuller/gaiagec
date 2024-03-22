import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import useDebounce from 'react-use/lib/useDebounce';
import * as z from 'zod';

import useCreateCertificates from '@/lib/api/useCreateCertificates';
import useGetCertificates, {
  CertificatesParams,
  getCertificates,
} from '@/lib/api/useGetCertificates';
import useGetSuppliers from '@/lib/api/useGetSuppliers';
import certificateSchema, { certificateType } from '@/lib/schemas/certificateSchema';
import { capitalizeFirstChar } from '@/lib/utils/capitalizeFirstChar';
import { cn } from '@/lib/utils/cn';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
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
import useCertificatesColumns from '@/components/Certificates/useCertificatesColumns';
import { DataTable } from '@/components/DataTable';
import FacetsFilters from '@/components/FacetsFilters';
import PageHeader from '@/components/PageHeader';

const Certificates = ({ defaultQueryParams }: { defaultQueryParams: CertificatesParams }) => {
  const { t } = useTranslation();

  const [queryParams, setQueryParams] = useState<CertificatesParams>(defaultQueryParams);
  const [search, setSearch] = useState('');
  const [openCreateSheet, setOpenCreateSheet] = useState(false);

  const { data } = useGetCertificates(queryParams, { keepPreviousData: true });

  const columns = useCertificatesColumns({
    onChangeQueryParams: setQueryParams,
    queryParams,
  });

  const { data: supplier } = useGetSuppliers();

  const { mutate } = useCreateCertificates();

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      setQueryParams({ ...queryParams, name: search });
    },
    1000,
    [search]
  );

  const statusOptions = [
    { value: 'expired', label: 'Expiré' },
    { value: 'expireSoon', label: 'Expire bienôt' },
    { value: 'valid', label: 'Valide' },
  ];

  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
  });

  const fileRef = form.register('file');

  const onSubmit = (values: z.infer<typeof certificateSchema>) => {
    mutate(values);
  };

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader
        ns="certificates"
        actions={[
          {
            callback: () => setOpenCreateSheet(true),
            label: t('create'),
          },
        ]}
      />
      <Sheet open={openCreateSheet} onOpenChange={setOpenCreateSheet}>
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
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
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
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
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
                        <Input type="file" placeholder="shadcn" {...fileRef} />
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
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Input
            onChange={handleOnChangeSearch}
            value={search}
            className="w-48"
            placeholder="Recherche par nom"
          />
          <FacetsFilters
            filters={queryParams.status}
            title={t('table.status')}
            options={statusOptions}
            onReset={() => setQueryParams({ ...queryParams, status: [] })}
            onSelect={(values) => setQueryParams({ ...queryParams, status: values })}
          />
        </div>

        <DataTable columns={columns} data={data?.results ?? []} />
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultQueryParams: CertificatesParams = {
    page: 1,
    size: 10,
    name: '',
  };

  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES, queryString.stringify(defaultQueryParams)),
      queryFn: () =>
        getCertificates({
          req: context.req,
          res: context.res,
          params: defaultQueryParams,
        }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps, defaultQueryParams },
  };
};

export default Certificates;

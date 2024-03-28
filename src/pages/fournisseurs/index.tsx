import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import useDebounce from 'react-use/lib/useDebounce';

import useGetSuppliers, { getSuppliers, SuppliersParams } from '@/lib/api/useGetSuppliers';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import FacetsFilters from '@/components/FacetsFilters';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import CreateSupplierSheet from '@/components/Suppliers/CreateSupplierSheet';
import useSupppliersColumns from '@/components/Suppliers/useSupppliersColumns';

const optionsType = ['agent', 'weaver', 'dyer'];

const Suppliers = ({ defaultQueryParams }: { defaultQueryParams: SuppliersParams }) => {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<SuppliersParams>(defaultQueryParams);

  const [openCreateSheet, setOpenCreateSheet] = useState(false);

  const { data: suppliers } = useGetSuppliers(queryParams, { keepPreviousData: true });

  const [search, setSearch] = useState('');

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSuccessCreateSupplier = () => {
    setQueryParams(defaultQueryParams);
  };

  useDebounce(
    () => {
      if (search === '') return;

      setQueryParams({ ...queryParams, name: search });
    },
    1000,
    [search]
  );

  const columns = useSupppliersColumns({
    onChangeQueryParams: setQueryParams,
    queryParams,
  });

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader
        ns="suppliers"
        actions={[
          {
            callback: () => setOpenCreateSheet(true),
            label: t('suppliers.create.title'),
          },
        ]}
      />

      <CreateSupplierSheet
        open={openCreateSheet}
        setOpen={setOpenCreateSheet}
        onSuccess={handleSuccessCreateSupplier}
      />

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Input
            onChange={handleOnChangeSearch}
            value={search}
            className="w-48"
            placeholder="Recherche par nom"
          />
          <FacetsFilters
            filters={queryParams?.types}
            title={t('table.type')}
            options={optionsType}
            onReset={() => setQueryParams({ ...queryParams, types: [] })}
            onSelect={(values) => setQueryParams({ ...queryParams, types: values })}
          />
        </div>

        <DataTable data={suppliers?.results ?? []} columns={columns} />
        <Pagination
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          total={suppliers?.total as number}
        />
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultQueryParams = {
    page: 1,
    size: 10,
  };

  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.SUPPLIERS, queryString.stringify(defaultQueryParams)),
      queryFn: () =>
        getSuppliers({ req: context.req, res: context.res, params: defaultQueryParams }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps, defaultQueryParams },
  };
};

export default Suppliers;

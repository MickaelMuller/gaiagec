import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { useTranslation } from 'next-i18next';
import queryString from 'query-string';
import useDebounce from 'react-use/lib/useDebounce';

import useGetPackagings, { getPackagings, PackagingParams } from '@/lib/api/useGetPackagings';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import CreatePackagingsSheet from '@/components/Packagings/CreatePackagingSheet';
import usePackagingsColumns from '@/components/Packagings/useGetPackagingsColumns';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';

const Packaging = ({ defaultQueryParams }: { defaultQueryParams: PackagingParams }) => {
  const { t } = useTranslation();
  const [openCreateSheet, setOpenCreateSheet] = useState(false);
  const [search, setSearch] = useState('');

  const [queryParams, setQueryParams] = useState<PackagingParams>(defaultQueryParams);

  const { data: packagings } = useGetPackagings(queryParams, { keepPreviousData: true });

  const columns = usePackagingsColumns({
    onChangeQueryParams: setQueryParams,
    queryParams,
  });

  const handleSuccessCreatePackaging = () => {
    setQueryParams(defaultQueryParams);
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      setQueryParams({ ...queryParams, reference: search });
    },
    1000,
    [search]
  );

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader
        ns="packagings"
        actions={[
          {
            callback: () => setOpenCreateSheet(true),
            label: t('packagings.create.title'),
          },
        ]}
      />
      <CreatePackagingsSheet
        open={openCreateSheet}
        setOpen={setOpenCreateSheet}
        onSuccess={handleSuccessCreatePackaging}
      />

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Input
            onChange={handleOnChangeSearch}
            value={search}
            className="w-48"
            placeholder="Recherche par reference"
          />
        </div>

        <DataTable data={packagings?.results ?? []} columns={columns} />
        <Pagination
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          total={packagings?.total as number}
        />
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultQueryParams: PackagingParams = {
    page: 1,
    size: 10,
    reference: '',
  };

  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.PACKAGINGS, queryString.stringify(defaultQueryParams)),
      queryFn: () =>
        getPackagings({
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

export default Packaging;

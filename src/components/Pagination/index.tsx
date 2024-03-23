import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useTranslation } from 'next-i18next';

import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type PaginationProps = {
  queryParams: { page: number; size: number };
  setQueryParams: (params: { page: number; size: number }) => void;
  total: number;
};

const Pagination = ({ queryParams, setQueryParams, total }: PaginationProps) => {
  const { t } = useTranslation();
  const size = queryParams.size.toString();
  const maxPage = Math.ceil(total / queryParams.size);

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t('table.row_per_page')}</p>
          <Select
            value={size}
            onValueChange={(value) => {
              setQueryParams({ ...queryParams, size: parseInt(value) });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {queryParams?.page} {t('table.off')} {maxPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setQueryParams({ ...queryParams, page: 1 })}
            disabled={queryParams?.page === 1}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setQueryParams({ ...queryParams, page: queryParams?.page - 1 })}
            disabled={queryParams?.page === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setQueryParams({ ...queryParams, page: queryParams?.page + 1 })}
            disabled={queryParams?.page === maxPage}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              setQueryParams({
                ...queryParams,
                page: maxPage,
              })
            }
            disabled={queryParams?.page === maxPage}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import { ArrowDown, ArrowUpDown } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { Button } from '../ui/button';

type OrderByButtonProps = {
  orderBy: string;
  orderByName: string;
  title: string;
  onClick: (order: string) => void;
};

const OrderByButton = ({ orderBy, orderByName, title, onClick }: OrderByButtonProps) => {
  const orderByAsc = `${orderByName}Asc`;
  const orderByDsc = `${orderByName}Desc`;

  if (orderBy === orderByAsc || orderBy === orderByDsc) {
    return (
      <Button
        className="pl-0"
        variant="ghost"
        onClick={() => onClick(orderBy === orderByAsc ? orderByDsc : orderByAsc)}
      >
        {title}
        <ArrowDown
          className={cn('ml-2 h-4 w-4', {
            'rotate-180 transition-all': orderBy === orderByDsc,
          })}
        />
      </Button>
    );
  }

  return (
    <Button className="pl-0" variant="ghost" onClick={() => onClick(orderByAsc)}>
      {title}

      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default OrderByButton;

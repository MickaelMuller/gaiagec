import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

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
  if (orderBy === orderByAsc) {
    return (
      <Button className="pl-0" variant="ghost" onClick={() => onClick(orderByDsc)}>
        {title}
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  if (orderBy === orderByDsc) {
    return (
      <Button className="pl-0" variant="ghost" onClick={() => onClick(orderByAsc)}>
        {title}
        <ArrowUp className="ml-2 h-4 w-4" />
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

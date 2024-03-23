import { GripVertical, LucideIcon } from 'lucide-react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Text from '../ui/text';

const ActionsTable = ({
  actions,
}: {
  actions: { label: string; callback: () => void; icon: LucideIcon }[];
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <GripVertical />
        <span className="sr-only"></span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[160px]">
      {actions.map(({ label, callback, icon: Icon }, index) => (
        <DropdownMenuItem className="space-x-4" key={`${label}_${index}`} onClick={callback}>
          <Icon />
          <Text>{label}</Text>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ActionsTable;

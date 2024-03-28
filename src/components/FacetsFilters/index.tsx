import { PlusCircledIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import camelToSnakeCase from '@/lib/utils/camelToSnakeCase';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

type FacetsFiltersProps<Filters> = {
  title: string;
  filters: Filters;
  options: string[];
  onSelect: (value: Filters) => void;
  onReset: () => void;
};

function FacetsFilters<Filters>({
  title,
  filters,
  options,
  onSelect,
  onReset,
}: FacetsFiltersProps<Filters>) {
  const { t } = useTranslation();
  const selectedValues = new Set(filters as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {t(`table.${camelToSnakeCase(option)}`)}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Chercher par ${title.toLocaleLowerCase()}`} />
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option);
                      } else {
                        selectedValues.add(option);
                      }
                      const filterValues = Array.from(selectedValues);
                      onSelect(filterValues as Filters);
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>

                    <span>{t(`table.${camelToSnakeCase(option)}`)}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={onReset} className="justify-center text-center">
                    {t('table.reset_filter', {
                      count: 1,
                    })}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FacetsFilters;

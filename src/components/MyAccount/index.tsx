import { User } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import useGetBrands from '@/lib/api/useGetBrands';
import useSession from '@/lib/hooks/useSession';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Text from '../ui/text';

const MyAccount = () => {
  const { session, logout } = useSession();
  const { data: brands } = useGetBrands();

  const { t } = useTranslation('common');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mr-5 flex self-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer self-center">
            <User className="mr-2" color="white" />
            <Text bold="light" className="text-white">
              {`${session?.firstName} ${session?.lastName}`} -{' '}
              <Text bold="light" className="text-gray-300" is="span">
                {brands?.[0].name}
              </Text>
            </Text>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('navbar.switch_brand')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {brands?.map((brand) => (
                  <DropdownMenuItem key={brand.id}>{brand.name}</DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>{t('navbar.logout')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MyAccount;

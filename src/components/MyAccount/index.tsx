import useGetBrands from '@/lib/api/useGetBrands';
import useSession from '@/lib/hooks/useSession';

import Text from '../ui/text';

const MyAccount = () => {
  const session = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: brands } = useGetBrands();

  return (
    <div className="mr-5 self-center">
      <Text>
        {session?.firstName} {session?.lastName} -
      </Text>
    </div>
  );
};

export default MyAccount;

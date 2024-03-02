import Text from '../ui/text';

type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => (
  <Text className="border-b pb-6" bold="light" font="hind" size="4xl" is="h1">
    {title}
  </Text>
);

export default PageHeader;

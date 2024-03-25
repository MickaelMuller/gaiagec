import { useTranslation } from 'next-i18next';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const FormFields = ({ input, form }) => {
  const { t } = useTranslation();

  const renderInput = (field) => {
    switch (input.type) {
      case 'number':
      case 'text':
        return (
          <FormControl>
            <Input type={input.type} placeholder={t(input.placeholder)} {...field} />
          </FormControl>
        );
      case 'select':
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t(input.placeholder)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {input.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {t(`form.options.${option}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(input.label)}</FormLabel>
          {renderInput(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFields;

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormField, FormFieldType } from "@/models/form";
import { FormSubmitRequestDto } from "@/pages/api/form-submit";
import { getInputRules, getInputType } from "@/utils/form";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const FormBuilder = ({
  fields,
  isLoadingFields,
  isSubmitting,
  onSubmit: onSubmit = () => {},
}: {
  fields: FormField[];
  isLoadingFields: boolean;
  isSubmitting: boolean;
  onSubmit?: SubmitHandler<FormSubmitRequestDto>;
}) => {
  const form = useForm<FormSubmitRequestDto>({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 border-gray-500 border rounded-md px-4 py-2"
    >
      {isLoadingFields ? (
        <Spinner className="w-[50px] h-[50px] text-blue-500 self-center" />
      ) : (
        <>
          {fields.map((field: FormField) => {
            const key = field.key as keyof FormSubmitRequestDto;
            return (
              <div key={field.key} className="flex flex-col gap-1">
                <label>
                  {field.label} {field.required === true && "*"}
                </label>

                <FormInput field={field} form={form} />
                {errors[key] ? (
                  <div className="text-red-500 h-4">{errors[key]?.message}</div>
                ) : (
                  // the div here to prevent the ui from jumping when the error message is removed
                  <div className="h-4" />
                )}
              </div>
            );
          })}

          <Button type="submit" size="lg" className="w-[80px]">
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </>
      )}
    </form>
  );
};

interface FormInputProps {
  field: FormField;
  form: UseFormReturn<FormSubmitRequestDto, any, undefined>;
}

const FormInput = ({ form, field }: FormInputProps) => {
  const { type } = field;
  const key = field.key as keyof FormSubmitRequestDto;

  const { register } = form;

  const rules = getInputRules(field);
  const registerItem = register(key, {
    value: field.value as string | number | boolean | undefined,
    ...rules,
  });

  if (
    type === FormFieldType.TEXT ||
    type === FormFieldType.EMAIL ||
    type === FormFieldType.TEL ||
    type === FormFieldType.DATE ||
    type === FormFieldType.DATETIME ||
    type === FormFieldType.TIME ||
    type === FormFieldType.URL ||
    type === FormFieldType.PASSWORD ||
    type === FormFieldType.HIDDEN ||
    type === FormFieldType.NUMBER
  ) {
    return (
      <Input
        className={cn(type === FormFieldType.HIDDEN && "hidden")}
        type={getInputType(type)}
        placeholder={field.placeholder}
        {...registerItem}
      />
    );
  }

  if (type === FormFieldType.SELECT) {
    return (
      <select
        disabled={field.disabled}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        {...registerItem}
      >
        {field.options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        )) ?? []}
      </select>
    );
  }

  if (type === FormFieldType.CHECKBOX) {
    return (
      <label htmlFor={field.key} className="text-sm font-medium leading-none">
        <input
          {...registerItem}
          type={"checkbox"}
          id={field.key}
          className="mr-2"
        />
        {field.placeholder}
      </label>
    );
  }

  if (type === FormFieldType.RADIO) {
    return (
      <div className="flex flex-col gap-1">
        {field.options?.map((option) => (
          <div className="flex items-center space-x-2" key={option.value}>
            <label htmlFor={option.value}>
              <input
                {...registerItem}
                type={"radio"}
                value={option.value}
                id={option.value}
                className="mr-2"
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (type === FormFieldType.TEXTAREA) {
    return <Textarea {...registerItem} placeholder={field.placeholder} />;
  }

  // throw error on typescript to prevent missing type
  const exhaustiveCheck: never = type;
  throw new Error(`Unhandled type: ${exhaustiveCheck}`);
};

export default FormBuilder;

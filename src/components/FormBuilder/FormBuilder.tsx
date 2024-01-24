import { FormField } from "@/models/form";
import { useForm } from "react-hook-form";

const FormBuilder = ({
  fields,
  onSubmit: onSubmit = () => {},
}: {
  fields: FormField[];
  onSubmit?: () => void; // TODO: Define appropriate type
}) => {
  const {
    handleSubmit,
    register,
    formState,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Render form fields as defined in `fields` */}
    </form>
  );
};

export default FormBuilder;

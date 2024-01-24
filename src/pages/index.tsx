import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { FormField } from "@/models/form";

export default function Home() {
  const fields: FormField[] = []; // TODO: Define form fields for each of the field types
  const onSubmit = () => {}; // TODO: Define onSubmit handler to log form values to console

  return (
    <div>
      <h1>hello world</h1>
      <FormBuilder fields={fields} onSubmit={onSubmit} />
    </div>
  );
}

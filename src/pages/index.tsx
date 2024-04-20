import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseData } from "@/models/api";
import { FormField, FormFieldType } from "@/models/form";
import {
  FormSubmitRequestDto,
  FormSubmitResponseDto,
} from "@/pages/api/form-submit";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    getFields();
  }, []);

  const getFields = async () => {
    setIsLoadingFields(true);
    // // log form value to console
    const response = await fetch("/api/form", {
      method: "GET",
    });

    const responseBody = (await response.json()) as ApiResponseData<
      FormField[]
    >;

    if (!responseBody.success) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:responseBody.errorMessage ?? "Error on GET form fields",
      })
    } else if (responseBody.success && responseBody.data) {
      console.log("GET FORM Response data:", responseBody.data);
      setFields(responseBody.data);
    }

    setIsLoadingFields(false);
  };

  const onSubmit = async (formData: FormSubmitRequestDto) => {
    setIsSubmitting(true);
    // log form value to console
    console.log("Form data:", formData);
    const response = await fetch("/api/form-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseBody =
      (await response.json()) as ApiResponseData<FormSubmitResponseDto>;

    if (!responseBody.success) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: responseBody.errorMessage ?? "Error on form submit",
      })

    } else if (responseBody.success && responseBody.data) {
      toast({
        title: "Form Submitted",
      })
      console.log("SUBMIT FORM Response data:", responseBody.data);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg font-semibold">
        A Form using react-hook-form, Tailwind and Shadcn UI
      </h1>
      <FormBuilder
        fields={fields}
        onSubmit={onSubmit}
        isLoadingFields={isLoadingFields}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

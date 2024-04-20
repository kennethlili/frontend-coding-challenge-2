import { FormField, FormFieldType } from "@/models/form";

export function getInputType(type: FormFieldType) {
  if (
    type === FormFieldType.TEXT ||
    type === FormFieldType.EMAIL ||
    type === FormFieldType.TEL ||
    type === FormFieldType.URL
  ) {
    return "text";
  } else if (type === FormFieldType.DATE) {
    return "date";
  } else if (type === FormFieldType.DATETIME) {
    return "datetime-local";
  } else if (type === FormFieldType.TIME) {
    return "time";
  } else if (type === FormFieldType.PASSWORD) {
    return "password";
  } else if (type === FormFieldType.NUMBER) {
    return "number";
  } else {
    return "text";
  }
}

export function getInputRules(field: FormField) {
  return {
    required: field.required && field.errorMessages?.required,
    pattern: field.pattern
      ? {
          value: new RegExp(field.pattern),
          message: field.errorMessages?.pattern ?? "",
        }
      : undefined,
    minLength: field.minLength
      ? {
          value: field.minLength,
          message: field.errorMessages?.minLength ?? "",
        }
      : undefined,
    maxLength: field.maxLength
      ? {
          value: field.maxLength,
          message: field.errorMessages?.maxLength ?? "",
        }
      : undefined,
    min: field.min
      ? {
          value: field.min,
          message: field.errorMessages?.min ?? "",
        }
      : undefined,
    max: field.max
      ? {
          value: field.max,
          message: field.errorMessages?.max ?? "",
        }
      : undefined,
  };
}

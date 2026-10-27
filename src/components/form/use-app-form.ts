import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";
import { SubmitButton } from "./submit-button";
import { TextField } from "./text-field";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
});

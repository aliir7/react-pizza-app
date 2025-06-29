// types/form.ts
import type { FieldApi } from "@tanstack/react-form";

// 👇 Generic Field با حداقل تایپ مورد نیاز
export type TypedField<TValue = unknown> = FieldApi<
  unknown, // TParentData
  string, // TName
  TValue, // TData
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any // TParentSubmitMeta
>;

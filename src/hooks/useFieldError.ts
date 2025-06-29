import type { TypedField } from "../types/form";

export function useFieldError<TValue>(field: TypedField<TValue>): string {
  return field.state.meta.touchedErrors?.[0] ?? "";
}

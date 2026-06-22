export type MobileValidation = {
  valid: boolean;
  e164: string | null;
};

export function validateSouthAfricanMobile(value: string): MobileValidation {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("27") ? digits.slice(2) : digits.replace(/^0/, "");

  return {
    valid: local.length === 9 && /^[6-8]/.test(local),
    e164: local.length === 9 ? `+27${local}` : null,
  };
}

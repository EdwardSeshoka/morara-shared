export type MemberProfileType =
  | "enthusiast"
  | "professional"
  | "estate"
  | "distributor";

export type MemberContactMethod = "mobile" | "email";

/**
 * Canonical wire shape of a member profile as exchanged over HTTP.
 * Dates are ISO-8601 strings; absent optional values are `null`.
 *
 * This is the single source of truth shared by:
 *  - the backend `MemberDto` (DynamoDB serialization) and `GET /user/profile` response
 *  - the frontend `MemberDTO` (network) and `MemberRepositoryAppDouble` mock
 */
export type MemberContract = {
  userId: string;
  name: string;
  profileType: MemberProfileType;
  contactMethod: MemberContactMethod;
  contactValue: string;
  tasteNote: string | null;
  professionalRole: string | null;
  organization: string | null;
  organizationPlaceId: string | null;
  businessName: string | null;
  businessPlaceId: string | null;
  address: string | null;
  addressPlaceId: string | null;
  latitude: number | null;
  longitude: number | null;
  region: string | null;
  country: string | null;
  onboardingCompleted: boolean;
  createdAt: string;
};

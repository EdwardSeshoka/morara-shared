import type { MemberContract } from "./profile.js";

/** Response body of `GET /user/profile`. `null` when no profile exists yet. */
export type GetMemberProfileResponse = MemberContract | null;

/** Response body of `POST /user/profile`. */
export type SaveMemberProfileResponse = {
  success: boolean;
};

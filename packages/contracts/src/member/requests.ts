import type { MemberContract } from "./profile.js";

/**
 * Body accepted by `POST /user/profile`.
 *
 * `userId` is derived from the authenticated JWT on the server, so it is not
 * required here; `createdAt` is server-assigned on first write and therefore
 * optional. Clients may still send the full {@link MemberContract} — the server
 * ignores fields it owns.
 */
export type SaveMemberProfileRequest = Omit<
  MemberContract,
  "userId" | "createdAt"
> & {
  createdAt?: string;
};

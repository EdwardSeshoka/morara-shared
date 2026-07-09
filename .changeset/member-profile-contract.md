---
"@edwardseshoka/contracts": minor
---

Add member profile contract under the `@edwardseshoka/contracts/member` subpath.

Exposes `MemberContract`, `MemberProfileType`, `MemberContactMethod`,
`SaveMemberProfileRequest`, `GetMemberProfileResponse`, and
`SaveMemberProfileResponse` as the single source of truth for the
`GET/POST /user/profile` endpoints, shared by the backend Lambda handlers and
the frontend member-data layer (including the member repository app double).

# Dataset privacy and takedown procedure

This document applies to the standalone `gagandeepreehal/indus-ad` dataset release.

## Public notice

The dataset contains recordings made on public roads. At immutable video-content revision `4ef41cd594234980f416136a543e3374be01735a`, all 9,927 INDUS-AD MP4s are recorded as face/plate blurred in the release manifests. Automated blur can miss or over-blur content, and recordings may still contain people, faces, registration plates, homes, businesses, signs, and other identifying details. INDUS-AD publishes global ENU and latitude/longitude at approximately 1 m horizontal resolution while retaining precise local ENU, height, timing, and sensor-quality fields. This reduces exposure but does not make trajectories anonymous or remove linkage risk.

Do not use the datasets to identify or track a person, infer sensitive personal information, expose sensitive locations, or combine the recordings with external data in a way that increases privacy risk. Dataset access does not remove the user's obligation to comply with applicable privacy, data-protection, publicity, recording, and research-ethics requirements.

## How to report a concern

INDUS-AD is published by Gagandeep Reehal. Submit a private report by email to [indus-ad@gagandeepreehal.com](mailto:indus-ad@gagandeepreehal.com) with the subject `Dataset privacy or takedown request`.

Include, when available:

- the Hugging Face dataset repository;
- the `recording_id`, file path, or approximate video position;
- a concise description of the concern;
- whether the request concerns a person, vehicle, property, or sensitive location; and
- a private way to contact the requester for clarification.

Do not post identifying evidence in a public Hugging Face discussion.

## Response and withdrawal process

1. Acknowledge the report privately.
2. Resolve the exact recording and every representation derived from it.
3. If the report is credible and continued exposure may increase harm, restrict the affected material while the review is in progress.
4. Review the request with the designated privacy/legal owner and document the decision.
5. For an approved withdrawal, remove or gate the recording in the source repository, INDUS-AD videos and tables, Viewer metadata, manifests, caches controlled by the publisher, and all future versions.
6. Publish a non-identifying changelog entry containing the affected `recording_id` and withdrawal revision, unless doing so would itself increase privacy risk.
7. Verify the result anonymously against immutable repository revisions and notify the requester of the outcome.
8. Prevent withdrawn recordings from being reintroduced in later releases.

The publisher cannot erase copies already downloaded by third parties, but an approved withdrawal notice should instruct downstream users to stop using and redistributing the affected recording.

## Publisher and manual withdrawal operation

Gagandeep Reehal handles privacy reports and recording withdrawals manually.
Send requests privately to [indus-ad@gagandeepreehal.com](mailto:indus-ad@gagandeepreehal.com).
The publisher reviews the report and carries out any required restriction or removal
using the response and withdrawal process above.

| Item | Publisher record |
| --- | --- |
| Publisher and intake/withdrawal owner | **Gagandeep Reehal** |
| Access configuration | **Public repository with manual gated access; no raw launch** |
| Privacy and takedown contact | **indus-ad@gagandeepreehal.com** |
| Acknowledgement target | **Within 2 business days** |
| Resolution/review target | **Within 7 business days; urgent credible reports receive temporary restriction during review** |
| Representative final-clip privacy review | **Completed, as confirmed by the publisher on 24 October 2026** |

On 24 October 2026, the publisher confirmed manual email-based withdrawal handling
and removed the requirement for a pre-launch withdrawal drill or a separate launch
approval gate. The privacy review completion is publisher-confirmed; no new
independent inspection or numerical detector-recall result is asserted here.
The access decision, response targets, public contact route, and responsibility
for responding to concerns remain in effect.

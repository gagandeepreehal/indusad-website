# Sensor and timing conventions

This reference describes sensor and timing conventions for the decoded INDUS-AD release.

## Cameras

The observed camera identities are `cam_front`, `cam_front_left`, `cam_front_right`, `cam_front_tilted`, `cam_rear`, `cam_rear_left`, and `cam_rear_right`. In INDUS-AD, the six non-tilted identities are present for all 1,469 recordings; `cam_front_tilted` is present for 1,113 recordings and is null for 356.

Raw camera payloads are H.265/HEVC Annex-B access units in MCAP messages. INDUS-AD provides one MP4 per available recording-camera pair and publishes codec, width, height, timescale, frame counts, keyframes, timestamp bounds, missing-frame estimates, discontinuities, and maximum gaps in its tables. Byte sizes and SHA-256 identities remain in the integrity manifest outside the Dataset Viewer.

Camera identity must come from the decoded schema field. Do not infer it from protobuf array position, filename ordering, or frame number.

## Timing and synchronization

Camera cadence is variable data, not an assumed constant. Across the preserved 9,927 recording-camera streams, per-camera median cadence is approximately 10.0007–10.0008 FPS.

Synchronization is measured within decoded producer batches as the range between the earliest and latest distinct camera timestamps. Across 3,028,347 groups, median spread is 0.020 ms and p95 spread is 0.025 ms. A discrete tail of 40,689 groups (1.3436%) exceeds 20 ms, entirely in the seven-camera topology.

Hardware triggering and synchronization are confirmed by the producer. These values separately describe timestamp alignment; they do not independently measure trigger jitter, exposure simultaneity, calibrated clock domains, or end-to-end latency. Use the per-recording fields in `recording_quality_summary.parquet` to set a task-specific tolerance.

## GNSS publication and joins

INDUS-AD keeps nanosecond time-of-day values and per-recording nanosecond offsets. Precise local ENU and height are retained; global ENU and global latitude/longitude are published at approximately 1 m horizontal resolution. Missing source coordinate objects remain null and invalid. An invalid row may still contain sensor-reported coordinates; validity must be checked independently of coordinate presence. Local ENU is per recording: do not concatenate local coordinate frames into one global trajectory without verified origins/transforms. Use `recording_id` plus published timing fields to join GNSS, camera, and pseudo-label tables.

## Calibration and coordinate systems

Use the per-recording calibration tables and their additive `calibrated_extrinsics` struct for producer-confirmed seven-camera mounting geometry. The legacy `fields_json.extrinsic` vectors are preserved source evidence with no verified convention. See [camera extrinsics](CAMERA_EXTRINSICS.md) for rig versus front-reference frames, units, signed angles and transform direction. Do not treat the launch sensor illustration as a geometric reference: it is conceptual and not to scale.

## Published camera and GNSS hardware

Gagandeep Reehal, the dataset author and publisher, confirmed hardware triggering and synchronization on 16 October 2026. This is producer-supplied system information. The timestamp statistics above describe observed alignment; they do not independently measure exposure simultaneity, trigger jitter, clock calibration, or end-to-end latency.

| Item | Producer-supplied specification / published evidence |
| --- | --- |
| Camera family | Sensing SG2-AR0233C-5200-G2A, onsemi AR0233 color sensor |
| Manufacturer capability | 1920×1080, up to 30 FPS, GMSL2, rolling shutter; released cadence is approximately 10 FPS |
| Nominal field of view | Approximately 118° horizontal, as supplied in the dataset specification; exact per-camera lens suffix is not asserted |
| Intrinsics/extrinsics | Intrinsics and legacy source vectors remain inside `fields_json`; the added `calibrated_extrinsics` struct carries producer-confirmed mounting geometry. See [camera extrinsics](CAMERA_EXTRINSICS.md). |
| GNSS/INS receiver | Trimble BX992 dual-antenna GNSS receiver with integrated inertial navigation, identified in the producer-supplied specification |
| Trigger/synchronization | Hardware-triggered and hardware-synchronized, confirmed by the producer |
| Coordinate geometry | Use the published calibration transforms; the conceptual camera diagram is not a calibrated mounting plan |

The [manufacturer selection guide](https://wiki.sensing-world.com/docs/1_1_Serdes_Camera/GMSL_Camera/Camera_Selection) lists the SG2-AR0233C family. Manufacturer capability is not a guarantee of every recording's dimensions, rate, lens variant, or achieved GNSS accuracy. Producer-supplied camera mounting coordinates are documented in [camera extrinsics](CAMERA_EXTRINSICS.md). Exact lens suffixes, trigger wiring/clock-source details and independently surveyed accuracy are not supplied here. This INDUS-AD camera/GNSS release does not include a LiDAR payload.

To read calibration, use `pyarrow.parquet.ParquetFile(path).read()` and parse `fields_json` as JSON. The inspected calibration schema has `recording_id`, `kind`, `key`, `time_of_day_ns`, `time_offset_ns`, and `fields_json`; calibration rows contain both `intrinsic` and `extrinsic`. For corrected mounting geometry, read `calibrated_extrinsics` instead of the legacy vectors in `fields_json.extrinsic`. Its explicit frame names, millimetres and matrix direction are defined in [camera extrinsics](CAMERA_EXTRINSICS.md). The original vectors do not establish these conventions. Camera identity comes from the `key` prefix, never array position.

## GNSS timestamps and stream interpretation

The owner-authenticated GNSS Viewer schema observed on 2026-10-16 exposes these timestamp pairs:

| Domain | Time of day | Offset |
| --- | --- | --- |
| Logging | `log_time_of_day_ns` | `log_time_offset_ns` |
| Publishing | `publish_time_of_day_ns` | `publish_time_offset_ns` |
| Sensor message | `time_of_day_ns` | `time_offset_ns` |
| UTC field | `utc_time_of_day_ns` | `utc_time_offset_ns` |
| Receiver field | `rec_time_of_day_ns` | `rec_time_offset_ns` |

These are distinct field namespaces, not evidence of separate physical receivers, a calibrated common clock, or a verified receiver rate. The Viewer also exposes `frame_id`, `rec_frame_id`, and `local_enu_origin_offset_ns`; it does not expose a source topic or stream-ID column. Do not infer source streams from row order or frame identifiers. The normalized GNSS table retains the source `channel` values `gnss` and `rec_gnss`; their clock relationships must be checked separately. Validate timestamp monotonicity, duplicates, validity, and gaps within each recording before interpolation. Time-of-day values can wrap; do not treat them as globally unique timestamps.

The Viewer flattens local coordinates into `local_east_m`, `local_north_m`, and `local_up_m`; source-table schemas can use nested coordinate objects. Inspect the table schema before choosing column paths. Preserve per-recording frames and use exact published timing keys. Do not assume that logging, publishing, sensor, UTC, and receiver offsets are interchangeable.

## Annotation coverage

Camera annotations cover sampled frames. File counts and Viewer row counts do not establish per-camera or per-recording completeness. Consult the dense index for archive members and exact keys. Missing annotations must remain missing. See [dataset schema and coverage](DATASET_SCHEMA.md).

## The two GNSS paths

The 18,373,026-row GNSS Viewer is a combined representation of two paths that share `autonome.Pose`: `gnss` (live pose output, 15,317,896 messages) and `rec_gnss` (recorded pose path, 3,055,130 messages). The counts are documented in the source archive and sum exactly to the combined published count. A bounded inspection of the normalized table confirms that both channel names are preserved. A new full-corpus channel recount was not performed for this documentation update.

Do not treat the sum as unique physical position samples or use it to infer one receiver rate. The existing flattened `gnss` Viewer lacks a channel column and is retained for browsing compatibility. For trajectories, rates, deduplication or joins, use `data/tables/gnss/` and explicitly filter its `channel` before parsing `fields_json`. Do not infer the channel from null fields, row order, frame IDs or timestamp namespaces.

```python
import pyarrow as pa
import pyarrow.compute as pc
import pyarrow.parquet as pq

messages = pq.ParquetFile("selected-gnss.parquet").read()
live = messages.filter(pc.equal(messages["channel"], pa.scalar("gnss")))
recorded = messages.filter(pc.equal(messages["channel"], pa.scalar("rec_gnss")))
```

Validate monotonicity, duplicate timestamps and gaps within the chosen recording and channel. Do not merge the two paths into a denser trajectory without an explicit source-aware policy.

## Current devkit image-resize policy

The publisher confirmed pure 1920×1080-to-1280×720 resizing without cropping on 23 October 2026 for the integrated devkit workflow. Use explicit `intrinsic_image_transform: "resize"`; the adapter scales pixel-valued intrinsics and retains dimensionless distortion coefficients. See [intrinsics](CAMERA_INTRINSICS.md) and [published sensor acceptance](https://github.com/gagandeepreehal/indus-ad-devkit/blob/main/docs/published-sensor-acceptance.md). This producer confirmation does not establish independent calibration accuracy.

## Devkit camera timing and partial recordings

For every recording, the devkit defaults to camera payload `rec_timestamp` (`rec_time_offset_ns`) for camera selection, synchronization and exported times, and main `gnss` payload `timestamp` (`time_offset_ns`) for GNSS. Untimed quality-flagged GNSS messages define excluded gaps; leading portions can be trimmed from an export without rejecting the whole recording. Raw table fields and annotation source identities are unchanged. See [exact fields and trimming policy](DEVKIT_TIMING_POLICY.md).

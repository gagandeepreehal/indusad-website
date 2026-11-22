# Column dictionary for normalized source tables

Inspected representative Parquet footers at revision `473b9ea659064ac13f63b11b9d6b77829ded6b6d` on 16 October 2026. This dictionary covers all ten `data/tables/` families plus frame-label and dense-index tables. Per-file Arrow schemas remain authoritative where optional fields vary. Nullability means permitted by the inspected schema, not measured non-null coverage. JSON payloads preserve source-defined nested fields; they are not replaced with invented enumerations or units.

Time-of-day fields are nanoseconds without capture date. Offset fields are recording-relative values in their own timestamp domain; do not assume different domains interchangeable. Exact joins require recording/camera/channel identity and compatible published timestamps. The frame-label `split` field is a legacy sampling-group label; its folders now use `sample_group=` and no benchmark split is asserted.

## auxiliary-messages

Example: `data/tables/auxiliary-messages/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `log_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the log namespace; date removed. |
| `log_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the log timestamp namespace. |
| `publish_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the publish namespace; date removed. |
| `publish_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the publish timestamp namespace. |
| `channel` | `string` | yes | Original message topic; GNSS uses gnss or rec_gnss. Filter before computing rates or trajectories. |
| `schema_name` | `string` | yes | Source field schema name. Meaning must be interpreted within the associated record schema. |
| `schema_hash` | `string` | yes | Opaque source-schema identity; not an accuracy or privacy score. |
| `sequence` | `int64` | yes | Source message sequence value; not a universal frame clock. |
| `fields_json` | `string` | yes | JSON-encoded source fields. GNSS includes pose/quality objects; calibration includes intrinsic/extrinsic. Inspect nested source metadata before geometric use. |

## calibrations

Example: `data/tables/calibrations/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `kind` | `string` | yes | Source metadata/calibration record kind. |
| `key` | `string` | yes | Source metadata/calibration record key. |
| `time_of_day_ns` | `int64` | yes | Nanoseconds; time of day. Interpret in the associated source timing domain. |
| `time_offset_ns` | `int64` | yes | Nanoseconds; time offset. Interpret in the associated source timing domain. |
| `fields_json` | `string` | yes | JSON-encoded source fields. GNSS includes pose/quality objects; calibration includes intrinsic/extrinsic. Inspect nested source metadata before geometric use. |

## camera-frames

Example: `data/tables/camera-frames/camera=cam_front/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `camera_index` | `int16` | yes | Source camera index; use source_camera_name for identity. |
| `source_camera_name` | `string` | yes | Decoded camera identity; do not infer from array position. |
| `camera_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the camera namespace; date removed. |
| `camera_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the camera timestamp namespace. |
| `frame_id` | `int64` | yes | Published frame identifier in its source namespace. |
| `rec_frame_id` | `int64` | yes | Recorded-path frame identifier; not interchangeable with frame_id. |
| `rec_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the rec namespace; date removed. |
| `rec_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the rec timestamp namespace. |
| `batch_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the batch namespace; date removed. |
| `batch_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the batch timestamp namespace. |
| `declared_camera_count` | `int32` | yes | Camera count declared by the producer message. |
| `full_batch` | `bool` | yes | Source flag for a full producer batch. |
| `log_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the log namespace; date removed. |
| `log_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the log timestamp namespace. |
| `publish_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the publish namespace; date removed. |
| `publish_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the publish timestamp namespace. |
| `channel` | `string` | yes | Original message topic; GNSS uses gnss or rec_gnss. Filter before computing rates or trajectories. |
| `schema_hash` | `string` | yes | Opaque source-schema identity; not an accuracy or privacy score. |
| `sequence` | `int64` | yes | Source message sequence value; not a universal frame clock. |
| `message_index` | `int64` | yes | Source message index within a recording. |
| `format` | `string` | yes | Source encoded format identifier. |
| `width` | `int32` | yes | Pixel width. |
| `height` | `int32` | yes | Pixel height. |
| `file_name` | `string` | yes | Published media path/reference; resolve relative to the documented dataset context. |
| `discontinuity_interval_id` | `int32` | yes | Identifier for a decoded discontinuity interval. |
| `packet_index` | `int64` | yes | Encoded packet/access-unit index. |
| `relative_pts_ns` | `int64` | yes | Nanoseconds; relative pts. Interpret in the associated source timing domain. |
| `relative_dts_ns` | `int64` | yes | Nanoseconds; relative dts. Interpret in the associated source timing domain. |
| `duration_ns` | `int64` | yes | Nanoseconds; duration. Interpret in the associated source timing domain. |
| `keyframe` | `bool` | yes | Encoded-frame keyframe indicator. |
| `access_unit_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `nal_payload_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |

## camera-messages

Example: `data/tables/camera-messages/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `message_index` | `int64` | yes | Source message index within a recording. |
| `log_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the log namespace; date removed. |
| `log_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the log timestamp namespace. |
| `publish_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the publish namespace; date removed. |
| `publish_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the publish timestamp namespace. |
| `channel` | `string` | yes | Original message topic; GNSS uses gnss or rec_gnss. Filter before computing rates or trajectories. |
| `sequence` | `int64` | yes | Source message sequence value; not a universal frame clock. |
| `schema_hash` | `string` | yes | Opaque source-schema identity; not an accuracy or privacy score. |
| `declared_camera_count` | `int32` | yes | Camera count declared by the producer message. |
| `full_batch` | `bool` | yes | Source flag for a full producer batch. |
| `fields_json` | `string` | yes | JSON-encoded source fields. GNSS includes pose/quality objects; calibration includes intrinsic/extrinsic. Inspect nested source metadata before geometric use. |
| `access_unit_sha256_json` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `nal_payload_sha256_json` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |

## gap-events

Example: `data/tables/gap-events/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `scope` | `string` | yes | Gap-event scope. |
| `camera` | `string` | yes | Camera identity associated with the gap, when populated. |
| `previous_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the previous namespace; date removed. |
| `previous_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the previous timestamp namespace. |
| `next_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the next namespace; date removed. |
| `next_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the next timestamp namespace. |
| `previous_frame_id` | `int64` | yes | Source field previous frame id. Meaning must be interpreted within the associated record schema. |
| `next_frame_id` | `int64` | yes | Source field next frame id. Meaning must be interpreted within the associated record schema. |
| `inferred_missing_count` | `int64` | yes | Count inferred missing from timing; not directly observed missing image content. |
| `gap_duration_ns` | `int64` | yes | Nanoseconds; gap duration. Interpret in the associated source timing domain. |
| `discontinuity_interval_id` | `int32` | yes | Identifier for a decoded discontinuity interval. |

## gnss

Example: `data/tables/gnss/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `log_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the log namespace; date removed. |
| `log_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the log timestamp namespace. |
| `publish_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the publish namespace; date removed. |
| `publish_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the publish timestamp namespace. |
| `channel` | `string` | yes | Original message topic; GNSS uses gnss or rec_gnss. Filter before computing rates or trajectories. |
| `schema_hash` | `string` | yes | Opaque source-schema identity; not an accuracy or privacy score. |
| `sequence` | `int64` | yes | Source message sequence value; not a universal frame clock. |
| `fields_json` | `string` | yes | JSON-encoded source fields. GNSS includes pose/quality objects; calibration includes intrinsic/extrinsic. Inspect nested source metadata before geometric use. |

## keyframes

Example: `data/tables/keyframes/camera=cam_front/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `camera_index` | `int16` | yes | Source camera index; use source_camera_name for identity. |
| `source_camera_name` | `string` | yes | Decoded camera identity; do not infer from array position. |
| `camera_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the camera namespace; date removed. |
| `camera_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the camera timestamp namespace. |
| `frame_id` | `int64` | yes | Published frame identifier in its source namespace. |
| `rec_frame_id` | `int64` | yes | Recorded-path frame identifier; not interchangeable with frame_id. |
| `rec_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the rec namespace; date removed. |
| `rec_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the rec timestamp namespace. |
| `batch_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the batch namespace; date removed. |
| `batch_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the batch timestamp namespace. |
| `declared_camera_count` | `int32` | yes | Camera count declared by the producer message. |
| `full_batch` | `bool` | yes | Source flag for a full producer batch. |
| `log_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the log namespace; date removed. |
| `log_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the log timestamp namespace. |
| `publish_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the publish namespace; date removed. |
| `publish_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the publish timestamp namespace. |
| `channel` | `string` | yes | Original message topic; GNSS uses gnss or rec_gnss. Filter before computing rates or trajectories. |
| `schema_hash` | `string` | yes | Opaque source-schema identity; not an accuracy or privacy score. |
| `sequence` | `int64` | yes | Source message sequence value; not a universal frame clock. |
| `message_index` | `int64` | yes | Source message index within a recording. |
| `format` | `string` | yes | Source encoded format identifier. |
| `width` | `int32` | yes | Pixel width. |
| `height` | `int32` | yes | Pixel height. |
| `file_name` | `string` | yes | Published media path/reference; resolve relative to the documented dataset context. |
| `discontinuity_interval_id` | `int32` | yes | Identifier for a decoded discontinuity interval. |
| `packet_index` | `int64` | yes | Encoded packet/access-unit index. |
| `relative_pts_ns` | `int64` | yes | Nanoseconds; relative pts. Interpret in the associated source timing domain. |
| `relative_dts_ns` | `int64` | yes | Nanoseconds; relative dts. Interpret in the associated source timing domain. |
| `duration_ns` | `int64` | yes | Nanoseconds; duration. Interpret in the associated source timing domain. |
| `keyframe` | `bool` | yes | Encoded-frame keyframe indicator. |
| `access_unit_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `nal_payload_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |

## recording-metadata

Example: `data/tables/recording-metadata/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `kind` | `string` | yes | Source metadata/calibration record kind. |
| `key` | `string` | yes | Source metadata/calibration record key. |
| `time_of_day_ns` | `int64` | yes | Nanoseconds; time of day. Interpret in the associated source timing domain. |
| `time_offset_ns` | `int64` | yes | Nanoseconds; time offset. Interpret in the associated source timing domain. |
| `fields_json` | `string` | yes | JSON-encoded source fields. GNSS includes pose/quality objects; calibration includes intrinsic/extrinsic. Inspect nested source metadata before geometric use. |

## recording-quality-summary

Example: `data/tables/recording-quality-summary/recording_quality_summary.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `recording_duration_ns` | `int64` | yes | Longest camera-stream duration for the recording, in nanoseconds. |
| `available_camera_count` | `int64` | yes | Number of available camera streams. |
| `available_cameras` | `list<element: string>` | yes | Available camera identities. |
| `camera_frame_count` | `int64` | yes | Source counted camera frames. |
| `camera_inferred_missing_count` | `int64` | yes | Timing-inferred missing camera frames. |
| `camera_discontinuity_count` | `int64` | yes | Camera discontinuity count. |
| `camera_max_gap_ns` | `int64` | yes | Nanoseconds; camera max gap. Interpret in the associated source timing domain. |
| `gnss_sample_count` | `int64` | yes | Combined GNSS message count across source channels; not deduplicated positions. |
| `gnss_valid_count` | `int64` | yes | Combined messages marked valid by source quality fields. |
| `gnss_valid_known_count` | `int64` | yes | Messages with known source validity. |
| `gnss_valid_ratio` | `double` | yes | Valid fraction under the source summary definition. |
| `gnss_gaps_over_500ms_count` | `int64` | yes | Count of GNSS gaps above 500 milliseconds under the source summary. |
| `gnss_max_gap_ms` | `double` | yes | Milliseconds; gnss max gap. |
| `sync_group_count` | `int64` | yes | Number of decoded synchronization groups. |
| `sync_groups_over_20ms_count` | `int64` | yes | Groups whose observed timestamp spread exceeds 20 milliseconds. |
| `sync_median_skew_ns` | `int64` | yes | Nanoseconds; sync median skew. Interpret in the associated source timing domain. |
| `sync_p95_skew_ns` | `int64` | yes | Nanoseconds; sync p95 skew. Interpret in the associated source timing domain. |
| `sync_max_skew_ns` | `int64` | yes | Nanoseconds; sync max skew. Interpret in the associated source timing domain. |
| `source_dataset_revision` | `string` | yes | Immutable source-representation provenance revision. |
| `decoded_dataset_revision` | `string` | yes | Immutable decoded-representation provenance revision. |
| `quality_schema_version` | `int64` | yes | Version of the quality-summary schema. |

## sync-groups

Example: `data/tables/sync-groups/bucket=00/part-12-18-59.400-29e39d129f8745b535957b42fb1cc041.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `schema_version` | `int16` | yes | Serialized table schema version. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `group_index` | `int64` | yes | Synchronization-group index. |
| `start_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the start namespace; date removed. |
| `start_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the start timestamp namespace. |
| `end_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the end namespace; date removed. |
| `end_time_offset_ns` | `int64` | yes | Recording-relative nanoseconds in the end timestamp namespace. |
| `nominal_period_ns` | `int64` | yes | Nanoseconds; nominal period. Interpret in the associated source timing domain. |
| `expected_cameras` | `list<element: string>` | yes | Expected camera identities for the group. |
| `available_cameras` | `list<element: string>` | yes | Available camera identities. |
| `late_start_cameras` | `list<element: string>` | yes | Cameras classified as starting late. |
| `early_end_cameras` | `list<element: string>` | yes | Cameras classified as ending early. |
| `observed_counts` | `list<element: int64>` | yes | Per-camera observed counts. |
| `missing_counts` | `list<element: int64>` | yes | Per-camera inferred missing counts. |
| `coverage_ratios` | `list<element: double>` | yes | Per-camera coverage fractions. |
| `maximum_skew_ns` | `int64` | yes | Nanoseconds; maximum skew. Interpret in the associated source timing domain. |
| `complete_strict` | `bool` | yes | Strict completeness result under the source quality rule. |

## annotations/frame-labels

Example: `data/annotations/camera/frame-labels/sample_group=test/part-0312a1165e8b12306b77174258fee89664bd3d54d1262e2c4554f20c14ee6e2a.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `recording_id` | `string` | no | Date-free recording join key. |
| `camera_name` | `string` | no | Named camera identity. |
| `selected_time_of_day_ns` | `int64` | yes | Time-of-day nanoseconds in the selected namespace; date removed. |
| `recording_offset_ns` | `int64` | yes | Recording-relative timestamp, nanoseconds, for the sampled frame. |
| `frame_index` | `int64` | yes | Frame index in the referenced camera sequence. |
| `frame_id` | `string` | no | Published frame identifier in its source namespace. |
| `sample_kind` | `string` | no | Source annotation sampling-kind label. |
| `window_id` | `string` | no | Sampling-window identifier. |
| `split` | `string` | no | Legacy source sampling group (train/validation/test), not an authored benchmark partition. |
| `decoded_width` | `int32` | yes | Decoded pixel width. |
| `decoded_height` | `int32` | yes | Decoded pixel height. |
| `semantic_model_id` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `semantic_model_revision` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `semantic_checkpoint_sha256` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `semantic_fractions` | `list<element: struct<class_id: int16, fraction: float>>` | yes | List of class_id/fraction entries; machine-generated class-area fractions, not human truth. |
| `drivable_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `lane_marking_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `person_rider_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `two_wheeler_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `four_wheeler_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `building_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `vegetation_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `sky_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `depth_model_id` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `depth_model_revision` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `depth_checkpoint_sha256` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `depth_normalization_min` | `float` | yes | Source depth-map normalization bound; interpret with its encoding metadata. |
| `depth_normalization_max` | `float` | yes | Source depth-map normalization bound; interpret with its encoding metadata. |
| `depth_p10` | `float` | yes | Machine-generated metric-depth percentile, metres; not measured sensor depth. |
| `depth_p50` | `float` | yes | Machine-generated metric-depth percentile, metres; not measured sensor depth. |
| `depth_p90` | `float` | yes | Machine-generated metric-depth percentile, metres; not measured sensor depth. |
| `weather_model_id` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `weather_model_revision` | `string` | yes | Retained source provenance/attribution metadata; not an evaluation result. Required licensing disclosures remain applicable. |
| `weather_clear_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_overcast_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_rain_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_fog_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_low_light_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_uncertain_mixed_probability` | `float` | yes | Machine-generated condition score; not a validated calibrated probability. |
| `weather_label` | `string` | yes | Weak condition label. |
| `weather_confidence` | `float` | yes | Source score for selected weak label; not calibrated accuracy. |
| `weather_margin` | `float` | yes | Source score separation; not calibrated uncertainty. |
| `weather_uncertain` | `bool` | yes | Source weak-label uncertainty flag. |
| `luminance_mean` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `luminance_p05` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `luminance_p95` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `contrast_std` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `saturation_mean` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `laplacian_variance` | `float` | yes | Source image-quality statistic; scale/threshold follows the annotation schema, not a human quality label. |
| `dark_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `overexposed_fraction` | `float` | yes | Machine-generated class-area fraction; not human ground truth. |
| `semantic_file_name` | `string` | yes | Referenced artifact file name/path in the source annotation record. |
| `semantic_byte_size` | `int64` | yes | Artifact byte count. |
| `semantic_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `depth_file_name` | `string` | yes | Referenced artifact file name/path in the source annotation record. |
| `depth_byte_size` | `int64` | yes | Artifact byte count. |
| `depth_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `status` | `string` | no | Source processing status; not privacy approval. |
| `error_type` | `string` | yes | Source processing error category, when present. |
| `error_message` | `string` | yes | Source processing diagnostic, when present. |
| `semantic_archive_path` | `string` | yes | Published dense archive path. |
| `semantic_archive_member` | `string` | yes | Member path inside the corresponding dense archive. |
| `depth_archive_path` | `string` | yes | Published dense archive path. |
| `depth_archive_member` | `string` | yes | Member path inside the corresponding dense archive. |

## annotations/dense-index

Example: `data/annotations/camera/dense-index/part-shard-0153c796105695e336f6f136046da2f002c09423d4f743e83ace14413215cb33.parquet`.

| Column | Arrow type | Nullable | Meaning / unit |
| --- | --- | --- | --- |
| `artifact_kind` | `string` | yes | Dense artifact kind (semantic/depth as present). |
| `camera_name` | `string` | yes | Named camera identity. |
| `dtype` | `string` | yes | Dense member numeric encoding. |
| `frame_index` | `int64` | yes | Frame index in the referenced camera sequence. |
| `height` | `int64` | yes | Pixel height. |
| `member_path` | `string` | yes | Member path within a dense archive. |
| `payload_bytes` | `int64` | yes | Artifact byte count. |
| `payload_sha256` | `string` | yes | SHA-256 content identity (or JSON mapping of identities), not a quality metric. |
| `recording_id` | `string` | yes | Date-free recording join key. |
| `recording_offset_ns` | `int64` | yes | Recording-relative timestamp, nanoseconds, for the sampled frame. |
| `shard_path` | `string` | yes | Published dense archive path. |
| `width` | `int64` | yes | Pixel width. |

## Nested calibration and GNSS fields

The inspected calibration `fields_json` contains `intrinsic` and `extrinsic`; obtain per-camera parameters and transforms there rather than substituting nominal lens specifications. GNSS `fields_json` contains the decoded pose fields; the flattened Viewer column dictionary in [DATASET_SCHEMA.md](DATASET_SCHEMA.md) lists exposed position, velocity, orientation, validity, and RTK fields. It is a projection, not the normalized GNSS source schema.

## Producer-confirmed seven-camera extrinsics

Every existing camera row in `data/tables/calibrations/` adds the non-null `calibrated_extrinsics` struct. Original columns and source JSON remain unchanged. This includes explicit camera identity, signed yaw/tilt, rig and front-reference camera centres in millimetres, and row-major homogeneous transforms with named direction. The tilted front camera is +4 degrees downward. The rig axes are X left, Y forward, Z up; the front reference subtracts [0,0,1546] mm and is not an optical frame. See [the complete schema, equations, provenance and join rules](CAMERA_EXTRINSICS.md). Existing source `schema_version` values are retained; the additive model is identified by its own `calibration_id`.

## Devkit camera timing and partial recordings

For every recording, the devkit defaults to camera payload `rec_timestamp` (`rec_time_offset_ns`) for camera selection, synchronization and exported times, and main `gnss` payload `timestamp` (`time_offset_ns`) for GNSS. Untimed quality-flagged GNSS messages define excluded gaps; leading portions can be trimmed from an export without rejecting the whole recording. Raw table fields and annotation source identities are unchanged. See [exact fields and trimming policy](DEVKIT_TIMING_POLICY.md).

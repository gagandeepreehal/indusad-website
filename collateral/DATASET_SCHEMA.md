# Dataset schema and annotation coverage

Observed 2026-10-16 using owner-authenticated Viewer first-row/schema and size endpoints. Configurations have different row meanings; their row counts must not be combined into a count of independent examples. The technical split name `train` is retained for API compatibility in all configurations and is not an authored benchmark partition.

| Configuration | Row meaning | Reported rows |
| --- | --- | ---: |
| videos | One recording with seven camera slots | 1,469 |
| camera_annotations | One sampled camera frame with weak pseudo-labels | 34,306 |
| gnss | One decoded GNSS message | 18,373,026 |
| semantic_depth | One sampled frame with display previews | 34,306 |

A control-file audit on 24 October 2026 checked all 34,306 camera-annotation Viewer rows and dense indexes: distinct frame IDs and camera/time and camera/frame-index keys are unique; no annotation refers to an absent video stream. Labels occur in 3,169 of 9,927 streams, leaving 6,758 without labels. Dense indexes contain 34,306 semantic and 34,306 depth references matched to the annotation identities. This is not a complete join audit against all source camera-frame tables or decoded videos. See [per-stream coverage](annotation-coverage.csv) and [summary with input hashes](annotation-coverage.json). Semantic class IDs/fractions and the listed aggregate fraction fields are auxiliary machine-generated signals, not a human-verified ontology-coverage result. Weather scores are not validated probabilities, and metric-depth outputs are not measured depth ground truth.

Camera annotation and semantic/depth configurations expose `recording_id`, `camera_name`, `selected_time_of_day_ns`, `recording_offset_ns`, `frame_index`, and `frame_id`. Use the dense index to resolve archive members; inspect uniqueness and missing joins before matching tables. No per-class accuracy, detector recall, or privacy QA score is asserted.

The GNSS Viewer flattens coordinate fields. See [sensor conventions](SENSOR_AND_TIMING_CONVENTIONS.md) for timestamp namespaces, per-recording local ENU, invalid rows with coordinates, and unresolved source-stream composition.

## Observed Viewer columns

### gnss

`recording_id`, `log_time_of_day_ns`, `log_time_offset_ns`, `publish_time_of_day_ns`, `publish_time_offset_ns`, `frame_id`, `is_valid`, `time_of_day_ns`, `time_offset_ns`, `utc_time_of_day_ns`, `utc_time_offset_ns`, `rec_frame_id`, `rec_time_of_day_ns`, `rec_time_offset_ns`, `local_enu_origin_offset_ns`, `global_east_m`, `global_north_m`, `global_up_m`, `global_ref_system_type`, `latitude_deg`, `longitude_deg`, `height_m`, `local_east_m`, `local_north_m`, `local_up_m`, `pitch_rad`, `roll_rad`, `yaw_rad`, `pitch_variance_rad2`, `roll_variance_rad2`, `yaw_variance_rad2`, `covariance_en`, `east_sigma_m`, `north_sigma_m`, `up_sigma_m`, `position_rms`, `hdop`, `pdop`, `vdop`, `correction_age_s`, `position_fix_type`, `rtk_condition`, `published_horizontal_resolution_m`, `re_init`, `vehicle_ref_pt`, `velocity_east_mps`, `velocity_north_mps`, `velocity_up_mps`.

### camera_annotations

`recording_id`, `camera_name`, `selected_time_of_day_ns`, `recording_offset_ns`, `frame_index`, `frame_id`, `sample_kind`, `window_id`, `decoded_width`, `decoded_height`, `semantic_fractions`, `drivable_fraction`, `lane_marking_fraction`, `person_rider_fraction`, `two_wheeler_fraction`, `four_wheeler_fraction`, `building_fraction`, `vegetation_fraction`, `sky_fraction`, `depth_p10`, `depth_p50`, `depth_p90`, `weather_clear_probability`, `weather_overcast_probability`, `weather_rain_probability`, `weather_fog_probability`, `weather_low_light_probability`, `weather_uncertain_mixed_probability`, `weather_label`, `weather_confidence`, `weather_margin`, `weather_uncertain`, `luminance_mean`, `luminance_p05`, `luminance_p95`, `contrast_std`, `saturation_mean`, `laplacian_variance`, `dark_fraction`, `overexposed_fraction`.

### semantic_depth

`recording_id`, `camera_name`, `selected_time_of_day_ns`, `recording_offset_ns`, `frame_index`, `frame_id`, `original_width`, `original_height`, `preview_width`, `preview_height`, `depth_min_m`, `depth_max_m`, `semantic_mask`, `depth_map`.

### videos

`recording_id`, `cam_front_video`, `cam_front_left_video`, `cam_front_right_video`, `cam_front_tilted_video`, `cam_rear_video`, `cam_rear_left_video`, `cam_rear_right_video`, `cam_front_video_privacy_status`, `cam_front_left_video_privacy_status`, `cam_front_right_video_privacy_status`, `cam_front_tilted_video_privacy_status`, `cam_rear_video_privacy_status`, `cam_rear_left_video_privacy_status`, `cam_rear_right_video_privacy_status`.

Column presence does not establish a populated value in every row. Image and video columns are Viewer representations; authoritative files remain in the published video tree and dense archives. Display preview dimensions do not establish native sensor resolution. Exact upstream model revisions, attribution and bounded license-review conclusions are published in [third-party notices](THIRD_PARTY_NOTICES.md).

## Source tables and sampling folders

The [column dictionary](TABLE_COLUMN_DICTIONARY.md) documents all normalized source-table families. Annotation folders now use `sample_group=`. The Parquet `split` column remains a legacy sampling-group field; Viewer technical `train` splits remain API-compatible. The [path migration map](sample-group-path-migration.json) records content-preserving moves.

GNSS source tables retain `channel` (`gnss` / `rec_gnss`); the existing flattened Viewer does not. Use source tables for channel-specific rate/trajectory analysis. Combined source-documentation counts are 15,317,896 and 3,055,130, respectively.

## Source annotation row-count audit

Metadata-only Parquet footer inspection at `473b9ea659064ac13f63b11b9d6b77829ded6b6d` counted 34,306 rows across all 1,469 source frame-label files. The Viewer reports 34,306 rows. Row counts are not a distinct-frame count or a guarantee of complete joins.

## Producer-confirmed seven-camera extrinsics

Every existing camera row in `data/tables/calibrations/` adds the non-null `calibrated_extrinsics` struct. Original columns and source JSON remain unchanged. This includes explicit camera identity, signed yaw/tilt, rig and front-reference camera centres in millimetres, and row-major homogeneous transforms with named direction. The tilted front camera is +4 degrees downward. The rig axes are X left, Y forward, Z up; the front reference subtracts [0,0,1546] mm and is not an optical frame. See [the complete schema, equations, provenance and join rules](CAMERA_EXTRINSICS.md). Existing source `schema_version` values are retained; the additive model is identified by its own `calibration_id`.

## Devkit camera timing and partial recordings

For every recording, the devkit defaults to camera payload `rec_timestamp` (`rec_time_offset_ns`) for camera selection, synchronization and exported times, and main `gnss` payload `timestamp` (`time_offset_ns`) for GNSS. Untimed quality-flagged GNSS messages define excluded gaps; leading portions can be trimmed from an export without rejecting the whole recording. Raw table fields and annotation source identities are unchanged. See [exact fields and trimming policy](DEVKIT_TIMING_POLICY.md).

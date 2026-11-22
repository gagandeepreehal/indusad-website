# Seven-camera extrinsics overlay

Producer-confirmed calibration extension. Base dataset: `gagandeepreehal/indus-ad` at `406674a320879221cfb3050c252dae7110577ee6`. This overlay targets all 1,469 normalized `data/tables/calibrations/**/*.parquet` files. All existing columns, row order, values, types, nulls and schema metadata are retained; the added non-null struct is `calibrated_extrinsics`. Existing `schema_version` remains 1 because it identifies the original decoded source representation. The new struct has its own `calibration_id`.

## Calibration authority and frames

The dataset owner supplied the positions and signed angles in this task and confirmed millimetres, X left / Y forward / Z up, positive yaw right, and conversion to a front-centred reference by subtracting `[0,0,1546]`. The owner corrected the tilted camera angle from +5° to **+4° downward**. These are producer-supplied calibration parameters, without an independent survey, reprojection error assessment or proof of rig stability over all recordings.

The rig frame has an origin 1546 mm below the front camera centre; its ground/vehicle/IMU identity is unspecified. Do not name it the IMU, LiDAR or vehicle-centre frame. `front_reference` has the same axes as the rig frame, with its origin at the front camera centre. It is not an optical frame. Translation is camera centre in the named parent frame, not the world-to-camera projection translation `-R C`.

| Camera | Z yaw right (deg) | X tilt down (deg) | Rig centre (mm) | Front-reference centre (mm) |
|---|---:|---:|---|---|
| cam_front | 0 | 0 | [0,0,1546] | [0,0,0] |
| cam_front_right | 62.5 | 0 | [-651,-50,1546] | [-651,-50,0] |
| cam_front_left | -62.5 | 0 | [651,-50,1546] | [651,-50,0] |
| cam_front_tilted | 0 | 4 | [0,0,1500] | [0,0,-46] |
| cam_rear | 180 | 0 | [0,-2133,1546] | [0,-2133,0] |
| cam_rear_left | -117.5 | 0 | [651,-90,1546] | [651,-90,0] |
| cam_rear_right | 117.5 | 0 | [-651,-90,1546] | [-651,-90,0] |

The X-left/Y-forward/Z-up axes form a **left-handed** frame. The camera mount frame uses the same local axis convention, Y along the viewing direction. Its matrix is defined numerically as `Rz(yaw_right) @ Rx(-tilt_down)` using the conventional sine/cosine matrix formulas. This explicitly makes positive yaw turn Y toward negative X (right), and positive tilt turn Y toward negative Z (down). The signed mounting angles are not an unspecified Rodrigues rotation vector or a generic Euler triple.

The optical frame uses X right / Y down / Z forward. Its optical-to-mount basis matrix is `B = [[-1,0,0],[0,0,1],[0,-1,0]]`. Thus `T_parent_from_camera_optical = T_parent_from_camera_mount @ diag(B,1)`. Optical/rig conversion changes handedness, so its 3×3 block has determinant **−1**. Do not convert that block directly to a unit quaternion or force determinant +1. Mount-to-rig blocks have determinant +1.

All 4×4 matrices are fixed-size float64 lists of 16 values, row-major, for homogeneous column vectors: `p_destination = T_destination_from_source @ p_source`. Matrix translations are millimetres. For metre-valued points, divide only the translation column by 1000. The front-reference-from-front-mount matrix is identity; the front-reference-from-front-optical matrix is the optical basis conversion.

## Added struct

`calibrated_extrinsics` contains:

- `calibration_id`, `camera_name`, `provenance`, `rig_axes`, `optical_axes`, `translation_unit`, `angle_unit`: strings.
- `yaw_right_deg`, `tilt_down_deg`: float64.
- `camera_center_rig_mm`, `camera_center_front_reference_mm`: fixed-size float64[3].
- `T_rig_from_camera_mount`, `T_front_reference_from_camera_mount`, `T_rig_from_camera_optical`, `T_front_reference_from_camera_optical`, `T_camera_optical_from_front_reference`: fixed-size float64[16].

Camera identity is parsed from the explicit calibration `key` prefix before `:`, and checked against the seven names. No array order or camera index is assumed. Each existing calibration row receives the same owner-supplied mounting model for its named camera. Absent cameras receive no invented calibration events. The seven-camera catalog describes the mounting model, not availability in a recording.

## Source preservation and consumers

The original `fields_json.extrinsic` vectors remain verbatim as source evidence. The inspected source had rotation `[1,2,3]` and translation `[4,5,6]`; these have no verified transform convention. Consumers needing the corrected model must explicitly read `calibrated_extrinsics`. Do not silently fall back to those legacy vectors for geometric projection.

`data/tables/camera-messages/` retains the original producer message JSON, including its parallel calibration arrays. Frame indexes, keyframes, pseudo-labels, videos, Viewer tables and privacy controls are unchanged. A per-frame copy of static matrices would duplicate the authoritative calibration model; join through `(recording_id, source_camera_name)` to `(recording_id, calibrated_extrinsics.camera_name)` instead. Since calibration rows repeat over time, first assert that each recording-camera has one distinct `calibrated_extrinsics` value and then deduplicate to a many-to-one join. Do not join all calibration events to all frames.

The native devkit already acquires the full calibration Parquet as a `calibration` artifact; no acquisition change is needed for an additive column. Its legacy decoded reader expects another table layout and interprets the original calibration JSON. It must not be treated as an automatic consumer of this new model. `read_extrinsics.py` provides a strict reader for the new schema, with no legacy fallback.

Intrinsics are retained as supplied. Sampled source calibration is 1920×1080 while sampled decoded video is 1280×720. This update establishes mounting geometry only; it does not verify resizing/cropping, distortion, camera–GNSS/IMU/LiDAR transforms, or metric reprojection accuracy.

## Validation and release

Each source file is downloaded from the immutable base revision and checked against repository LFS SHA-256 and size. Each output is read back and compared against all original columns with metadata equality, then against the complete intended table. Receipts contain both hashes, row counts and camera counts. Unit tests check headings, the 4° downward direction, frame origins, inverses, handedness, rejection paths, and preservation of an unrelated nullable column and custom metadata.

This package performs no remote writes. Before a public release: review owner approval for applying this one rig model to the full corpus, obtain task-specific release/privacy approval for the exact overlay, confirm the remote parent is still the pinned base (or rebase and revalidate), and inspect the existing privacy release controls. Then independently verify remote hashes and any affected Viewer schemas after publication. No privacy reprocessing or access change is included.

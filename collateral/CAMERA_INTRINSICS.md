# Published camera intrinsics and distortion coefficients

This readable reference transcribes the camera intrinsics stored in the INDUS-AD calibration tables. These are source-reported values; independent per-camera calibration accuracy has not been established.

## Intrinsic parameters

| Parameter | Published value |
| --- | ---: |
| `width` | `1920.0` |
| `height` | `1080.0` |
| `focal_length_x` | `1018.4666137695312` |
| `focal_length_y` | `1018.491943359375` |
| `optical_center_x` | `961.8368530273438` |
| `optical_center_y` | `539.9344482421875` |
| `skew` | `0.0` |
| `rmse` | `0.006899999920278788` |

## Distortion coefficients

The coefficient order below is exactly the published array order. The table does not establish a distortion-model convention or assign coefficient names.

```json
[
  25.8650601396,
  12.657001442,
  -7.02086e-05,
  1.94319e-05,
  0.5069227052,
  26.2723717293,
  22.7056487856,
  3.1677229543
]
```

## Camera coverage

The inspected source table contains the same intrinsic values for these cameras:

- `cam_front`
- `cam_front_left`
- `cam_front_right`
- `cam_front_tilted`
- `cam_rear`
- `cam_rear_left`
- `cam_rear_right`

An earlier random sample of 10 additional recording tables at revision `24c2a4c8da16d3bd12814830b6a0ea90059807c4` contained the same values across 69,542 calibration rows. This is sampled evidence, not a full-corpus calibration audit.

## Resolution and geometric use

The calibration declares 1920 x 1080. The inspected recording has 1280 x 720 camera media. For the current devkit workflow, the publisher confirmed pure 1920×1080-to-1280×720 resizing without cropping on 23 October 2026. The adapter requires the explicit `intrinsic_image_transform: "resize"` policy and scales focal lengths, principal point and skew while retaining dimensionless distortion coefficients. See [published sensor acceptance](https://github.com/gagandeepreehal/indus-ad-devkit/blob/016ac6a9a38da70e1dc4d2251517f3af963f4551/docs/published-sensor-acceptance.md). This is producer-supplied pipeline information, not independent per-camera accuracy validation; the coefficient order/model limitation above remains. The reported RMSE has no verified unit or evaluation procedure in this reference.

These values alone do not establish camera-to-ego, IMU-to-camera, or camera-to-LiDAR extrinsics.

## Historical inspection and current source

- Dataset revision: `051887c71328ef4a5263e07aa1d03c36f5b5b712`
- Recording: `13-54-05.989-ef644bcba8d2e75a927420ae450726ee`
- [Calibration Parquet](../data/tables/calibrations/bucket=55/part-13-54-05.989-ef644bcba8d2e75a927420ae450726ee.parquet)
- Source Parquet SHA-256: `7b7084d57d5157eb194ffd7408eb2d529ced438a0b429256ac5cc4f165643841`
- Inspected calibration rows: 1,428
- Verified on 22 October 2026 (Asia/Kolkata).

The revision and hash above describe the historical inspection. The relative Parquet link opens the current table, including the later calibration overlay; its bytes differ from that earlier inspected source. Historical revision identifiers are retained as provenance and are not current download pins.

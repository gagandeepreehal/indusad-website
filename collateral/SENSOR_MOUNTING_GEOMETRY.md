# Owner-confirmed sensor mounting geometry

Owner-confirmed by Gagandeep Reehal on 22 October 2026. The [machine-readable geometry](sensor_mounting_geometry.json) accompanies this reference. These are physical mounting coordinates and source rotation parameters, separate from camera optical-frame projection matrices and recorded calibration payloads.

## Mounting coordinate convention

Positions are in **metres**, relative to the normal front camera (`cam_front`). **Y is forward and Z is up**. Preserve the source X signs: named left cameras have positive X; named right cameras have negative X. The normal-front reference rotation is 0°. The rig IMU shares this origin; its rotation is unspecified.

| Sensor | Position [X, Y, Z] (m) | Source rotation parameter |
| --- | --- | --- |
| `cam_front` | [0.000, 0.000, 0.000] | Reference rotation 0° |
| `cam_front_tilted` | [0.000, 0.000, -0.046] | Rx(+5°) |
| `cam_front_right` | [-0.651, -0.050, 0.000] | Rz(+62.5°) |
| `cam_front_left` | [0.651, -0.050, 0.000] | Rz(-62.5°) |
| `cam_rear` | [0.000, -2.133, 0.000] | Rz(+180°) |
| `cam_rear_left` | [0.651, -0.090, 0.000] | Rz(-117.5°) |
| `cam_rear_right` | [-0.651, -0.090, 0.000] | Rz(+118.5°); later owner alternative Rz(+117.5°), both retained |
| Rig IMU | [0, 0, 0] | Unspecified |
| OS1-128 LiDAR | [0, -0.545, +0.334] | Pitch magnitude approximately 4°; sign unspecified |

The rear-right **Rz(+118.5°)** comes from the camera source below. **Rz(+117.5°)** is a later owner-supplied alternative. Both are preserved with provenance; no single value is selected. Unspecified rotation components are not filled in.

## Ground heights and LiDAR offsets

- Normal front camera: **1.546 m** above ground.
- Tilted front camera: **1.500 m** above ground (`1.546 - 0.046`).
- LiDAR: **1.880 m** above ground, derived from **0.380 m above the tilted camera** (`1.500 + 0.380`). Its rebased Z is `1.880 - 1.546 = 0.334 m`.
- LiDAR is **0.545 m behind the tilted camera** (negative Y); its X offset is explicitly **0 m**. Relative to the tilted camera it is `[0, -0.545, +0.380] m`.

## Camera-source provenance and rebasing



Source positions were converted from millimetres to metres, then rebased by subtracting `[0, 0, 1.546] m`:

```text
position_m = source_position_mm * 0.001 - [0, 0, 1.546]
```

The normal-front reference, co-origin rig IMU, and explicit LiDAR X=0 are owner-provided. LiDAR mounting offsets, heights, approximate pitch magnitude, and the later rear-right alternative are also owner-supplied. Rotations are retained as source Rx/Rz parameters, in degrees. No optical-frame matrices are generated: axis mapping and transform direction must first be established. These mounting values do not overwrite or reinterpret the [recorded calibration tables](../data/tables/calibrations/).

## Embedded LiDAR internal transforms

These are internal transforms, **not vehicle mounting transforms**. All translations in this section are **MILLIMETRES**, unlike the metre-valued mounting coordinates above. Directions are retained as supplied.

| Direction | R | Translation (mm) |
| --- | --- | --- |
| Beam → LiDAR | identity | [16.721, 0, 0] |
| LiDAR → sensor | diag(-1, -1, 1) | [0, 0, 38.195] |
| Internal IMU → sensor | identity | [-2.441, -9.725, 7.533] |

The LiDAR internal IMU is distinct from the rig IMU at the front-camera origin. Do not substitute internal transforms for mounting transforms. Documenting the OS1-128 mounting geometry does not imply that LiDAR payloads are included in this camera/GNSS release.

The [sensor and timing conventions](SENSOR_AND_TIMING_CONVENTIONS.md) describe the recorded tables and timing. This owner-confirmed mounting reference supplies the heights and mounting offsets separately from those existing conventions.

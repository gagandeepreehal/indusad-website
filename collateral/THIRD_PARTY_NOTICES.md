# Third-party annotation provenance and license review

Reviewed 23 October 2026 for the non-commercial INDUS-AD research release. The dataset contains generated annotations, not copies of these model weights. Model/code licenses, output redistribution, upstream training-data terms, and the INDUS-AD dataset license are distinct questions. A missing Hugging Face license tag is not evidence that outputs cannot be redistributed. No output-license pass-through or commercial permission is inferred here.

## Semantic annotations

- Model: [facebook/mask2former-swin-large-mapillary-vistas-semantic](https://huggingface.co/facebook/mask2former-swin-large-mapillary-vistas-semantic/tree/4772b6bf101d91f2534c106dc524d906aeb3c68a).
- Recorded immutable revision: `4772b6bf101d91f2534c106dc524d906aeb3c68a`.
- The pinned model card reports `license: other` and identifies the original Mask2Former repository. Its [official model zoo](https://github.com/facebookresearch/Mask2Former/blob/main/MODEL_ZOO.md#license) states that downloadable model weights use CC BY-NC 4.0. The repository's MIT code license should not be substituted for that weights statement.
- Attribution: Bowen Cheng, Ishan Misra, Alexander G. Schwing, Alexander Kirillov, Rohit Girdhar, *Masked-attention Mask Transformer for Universal Image Segmentation*, CVPR 2022. This checkpoint was trained on Mapillary Vistas.
- Published artifacts are weak semantic masks and derived fractions produced from INDUS-AD images; they are not human ground truth or redistributed pretrained weights.

## Depth annotations

- Model: [depth-anything/Depth-Anything-V2-Metric-VKITTI-Large](https://huggingface.co/depth-anything/Depth-Anything-V2-Metric-VKITTI-Large/tree/070e97e4b80e317ec1d03c19927304f4091a180b).
- Recorded immutable revision: `070e97e4b80e317ec1d03c19927304f4091a180b`.
- The pinned metric model card reports Apache-2.0. In a [specific reply about Metric VKITTI Large](https://github.com/LiheYoung/Depth-Anything/issues/191#issuecomment-2169113532), project author Lihe Yang confirmed that the metric depth models use Apache-2.0. General Base/Large/Giant non-commercial statements also exist in the main project and later author replies, but do not explicitly retract this named metric-model exception. This review treats the specific author statement and pinned model card as supporting Apache-2.0 for the exact metric checkpoint, rather than conflating it with the relative Large checkpoint.
- Attribution: Lihe Yang, Bingyi Kang, Zilong Huang, Zhen Zhao, Xiaogang Xu, Jiashi Feng, Hengshuang Zhao, *Depth Anything V2*, NeurIPS 2024. The metric checkpoint is the outdoor Virtual KITTI 2 variant.
- Published artifacts are predicted depth maps and summaries of INDUS-AD images, not measured depth ground truth or pretrained weights.

## Weather annotations

- Model: [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32/tree/3d74acf9a28c67741b2f4f2ea7635f0aaf6f0268).
- Recorded immutable revision: `3d74acf9a28c67741b2f4f2ea7635f0aaf6f0268`.
- The pinned Hugging Face model card has no license metadata. The [official CLIP repository](https://github.com/openai/CLIP/blob/main/LICENSE) carries the MIT license, copyright (c) 2021 OpenAI. A [Hugging Face maintainer explains](https://discuss.huggingface.co/t/question-regarding-clips-model-open-sourceness-and-commerciality/67501/2) that the repository permits commercial use and that the model-card deployment warning concerns unassessed applications. No output-publication restriction was found. That explanation is not a new legal grant from OpenAI, and unanswered questions about the exact converted weights remain part of the provenance record.
- Attribution: Alec Radford et al., *Learning Transferable Visual Models From Natural Language Supervision*, ICML 2021. The model card describes research uses and warns against unvalidated deployment. Weather scores are weak model similarities/scores, not validated meteorological probabilities.

## Scope and release decision

INDUS-AD retains its existing CC BY-NC 4.0 dataset license. These notices do not relicense upstream code, weights, training datasets, or third-party rights. No upstream weight files are included in this dataset. Required existing license and NOTICE files must remain intact.

Source/provenance review found no explicit prohibition on publishing generated annotations from the publisher's own footage as a non-commercial research release. On 23 October 2026, the publisher confirmed that annotation generation was solely for this public research release, not for commercial model/product development. On that stated scope, no license prohibition on publishing these generated annotations was identified in the sources reviewed. On 23 October 2026, the publisher authorized publication of these revised notices for the stated research-only release. This records the publisher’s release decision and the bounded source review; it is not an upstream permission or a legal-clearance certificate. No annotation layer has been removed or relicensed.

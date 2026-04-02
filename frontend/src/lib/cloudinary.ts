type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "pad";
  quality?: "auto" | "auto:good" | "auto:eco" | "auto:best" | string;
  format?: "auto" | string;
  gravity?: "auto" | "center" | "north" | "south" | "east" | "west" | string;
  dpr?: "auto" | string;
};

const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

const isCloudinaryImageUrl = (url: string) =>
  /^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//i.test(url);

export const optimizeCloudinaryImageUrl = (
  url: string,
  options: CloudinaryTransformOptions = {}
) => {
  if (!url || !isCloudinaryImageUrl(url)) {
    return url;
  }

  const transforms = [
    options.format ?? "f_auto",
    options.quality ?? "q_auto",
    options.dpr ?? "dpr_auto",
    options.width ? `w_${Math.round(options.width)}` : null,
    options.height ? `h_${Math.round(options.height)}` : null,
    options.crop ? `c_${options.crop}` : "c_fill",
    options.gravity ? `g_${options.gravity}` : "g_auto",
  ].filter(Boolean);

  const [prefix, suffix] = url.split(CLOUDINARY_UPLOAD_SEGMENT);

  if (!suffix) {
    return url;
  }

  return `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}${transforms.join(",")}/${suffix}`;
};
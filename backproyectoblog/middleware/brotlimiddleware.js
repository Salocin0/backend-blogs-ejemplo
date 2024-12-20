import compression from "compression";
import zlib from "zlib";
export const brotliCompression = compression({
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024, // Comprimir respuestas mayores a 1 KB
  brotli: {
    enabled: true,
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // 0-11
    },
  },
});

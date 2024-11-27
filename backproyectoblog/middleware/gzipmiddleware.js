import compression from "compression";
import zlib from "zlib";
export const gzipCompression = compression({
    filter: (req, res) => {
      // Determina si la compresión debe aplicarse
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
    threshold: 1024, // Comprimir respuestas mayores a 1 KB
    zlib: {
      level: 9, // 0-9
    },
  });
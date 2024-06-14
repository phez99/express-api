import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

const port = process.env.PORT;

web.listen(port, () => {
  logger.info(`App start on port ${port}`);
});

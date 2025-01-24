export {};

import { entityType } from "../models/Entity";
import { fileType } from "../models/File";
import { userType } from "../models/User";

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface Request {
    file: fileType;
    contains_token: boolean;
    token_is_valid: boolean;
    user_id: string;
    user: userType;
  }
}

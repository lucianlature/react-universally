// Deploys to now.
// @see https://zeit.co/now

import { exec } from '../utils';
const cmd = 'now -e SSL_CERTIFICATE=false';
exec(cmd);

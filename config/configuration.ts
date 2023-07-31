import * as process from 'process';

/**
 * Function which switch data from process to config module
 */
export default () => ({
  refreshTokenExpirationTime: process.env.RefreshTokenExpirationTime,
  maxRegisteredDevicesCount: process.env.MaxRegisteredDevicesCount,
  refreshSign: process.env.SecretSign,
  secretSign: process.env.RefreshSign,
});

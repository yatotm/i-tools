export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface QrCodeData {
  qrCodeUrl: string;
  sid: string;
}

export interface TokenInfo {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface TokenResponseEncrypt extends ApiResponse<{
  ciphertext: string;
  iv: string;
}> {}

export interface QrCodeStatus {
  status: 'WaitLogin' | 'LoginSuccess' | 'QRCodeExpired' | 'ScanSuccess' | 'LoginFailed';
  authCode?: string;
}

export interface DeviceInfo {
  akv: string;
  apv: string;
  b: string;
  d: string;
  m: string;
  mac: string;
  n: string;
  t: number;
  wifiMac: string;
}

export interface TokenRequest extends DeviceInfo {
  refresh_token?: string;
  code?: string;
  'Content-Type': string;
}
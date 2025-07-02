export function isBusinessError(errorCode) {
  const businessErrorCodes = ['U3', 'U4']; // 휴면, 비밀번호 만료
  return businessErrorCodes.includes(errorCode);
}
export function ResponseModel(message: string, data = {}) {
  return {
    message,
    data,
  };
}

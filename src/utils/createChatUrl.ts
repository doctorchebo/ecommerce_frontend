export const createChatUrl = (name: string, phone: string) => {
  let message = `Hola ${name}, quisiera más información sobre los productos DXN.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const checkExists = async (fn) => {
  try {
    await Deno.readFile(fn);
    return true;
  } catch (e) {
  }
  return false;
};

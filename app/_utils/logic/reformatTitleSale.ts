export default function reformatTitleSale(title: string) {
  if (!title.includes("$")) {
    return title;
  }

  const split = title.split("$");
  return "$" + split[split.length - 1].split(" ")[0];
}

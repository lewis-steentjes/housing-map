export default function reformatTitle(title: string) {
  const split = title.split("$");

  return "$" + split[split.length - 1].split(" ")[0];
}

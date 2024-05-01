export default function freshnessToColour(freshness: number) {
  // Takes a freshness value and returns a colour based on the value
  // The colour is based on the following ranges:
  // 0 Freshness: red
  // 1 Freshness: green
  // Ensure freshness is within range [0, 1]
  freshness = Math.min(Math.max(freshness, 0), 1);
  console.log("computed fresh", freshness);

  // Compute colours to display for listings based on their age
  let red = Math.round(255 * (1 - freshness));
  let green = Math.round(255 * freshness);
  const tint = Math.round((255 - red) * 0.3);
  const otherTint = Math.round((255 - green) * 0.3);
  red += tint;
  green += otherTint;

  const colour = "#" + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + "00";
  return colour;
}

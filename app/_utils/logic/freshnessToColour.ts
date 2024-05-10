export default function freshnessToColour(freshness: number) {
  // Takes a freshness value and returns a colour based on the value
  // The colour is based on the following ranges:
  // 0 Freshness: red
  // 1 Freshness: green
  // Ensure freshness is within range [0, 1]
  freshness = Math.min(Math.max(freshness, 0), 1);

  // Compute colours to display for listings based on their age
  let red = 0; // Math.round(255 * (1 - freshness));
  let green = 0; // Math.round(255 * freshness);
  const tint = 0; //Math.round((255 - red) * 0.3);
  const otherTint = 0; //Math.round((255 - green) * 0.3);
  red += tint;
  green += otherTint;
  // let brightness = Math.round(255 * freshness * (2 - freshness));
  let brightness = 150;
  red = Math.round(100 * (1 - freshness));
  green = Math.round(255 * freshness);

  const colour =
    "#" +
    red.toString(16).padStart(2, "0") +
    green.toString(16).padStart(2, "0") +
    "00" +
    brightness.toString(16).padStart(2, "0");
  return String(colour);
}

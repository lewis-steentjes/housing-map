import { useState } from "react";

export default function useHistory() {
  const history = new Map();

  return useState(history);
}

import { blue, green, pink, red } from "../constants/colors";

export default function colorByMembers(count: number) {
  switch (count) {
    case 1:
      return blue;
    case 2:
      return green;
    case 3:
      return pink;
    default:
      return red;
  }
}

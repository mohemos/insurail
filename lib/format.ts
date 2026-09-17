/** Format an integer amount in naira: 44150 -> "₦44,150". Locale-independent to keep SSR and client output identical. */
export function formatNaira(amount: number): string {
  const digits = Math.round(Math.abs(amount)).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${amount < 0 ? "-" : ""}₦${grouped}`;
}

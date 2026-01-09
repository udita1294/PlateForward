export default function NgoStatusBadge({ status }) {
  if (!status) return null;

  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    picked: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const className = `${base} ${styles[status] || "bg-gray-100 text-gray-700"}`;

  return <span className={className}>{status.toUpperCase()}</span>;
}

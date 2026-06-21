function StatusBadge({ status }) {
  const colors = {
    draft: { background: "#fef3c7", color: "#92400e" },
    confirmed: { background: "#dbeafe", color: "#1e40af" },
    closed: { background: "#dcfce7", color: "#166534" },
  };

  const style = colors[status] || colors.draft;

  return (
    <span
      style={{
        ...style,
        padding: "4px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
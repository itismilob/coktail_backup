const AdminSearchIcon = ({
  width = '31',
  height = '31',
  stroke = '#545454',
  viewBox = '0 0 31 31',
  fill = 'none',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11.6" cy="11.6" r="9.6" stroke={stroke} strokeWidth="4" />
      <path d="M19.0571 19.0571L29 29" stroke={stroke} strokeWidth="4" />
    </svg>
  )
}

export default AdminSearchIcon

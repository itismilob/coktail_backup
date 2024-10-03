const HamburgerIcon = ({
  width = '20',
  height = '25',
  fill = 'none',
  stroke = '#797979',
  viewBox = '0 0 19 18',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 1H18" 
        stroke={stroke} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M1 8.72705H18" 
        stroke={stroke}  
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M1 16.4546H18" 
        stroke={stroke} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  )
}

export default HamburgerIcon

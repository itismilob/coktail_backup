const SearchIcon = ({
  width = '25',
  height = '25',
  fill = 'none',
  stroke = '#797979',
  viewBox = '0 0 22 23',
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
        d="M9.88889 19.3704C14.7981 19.3704 18.7778 15.258 18.7778 10.1852C18.7778 5.11235 14.7981 1 9.88889 1C4.97969 1 1 5.11235 1 10.1852C1 15.258 4.97969 19.3704 9.88889 19.3704Z" 
        stroke={stroke} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M21.0001 21.6668L16.1667 16.6724" 
        stroke={stroke}  
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>

  )
}

export default SearchIcon;
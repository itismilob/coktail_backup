const ActivityIcon = ({
  width = '28',
  height = '24',
  fill = '#FFB6B5',
  viewBox = '0 0 28 24',
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
        d="M24 24H0V0H18.4V2.4H2.4V21.6H22.4V12.8H24.8V24H24ZM4.48 11.58L6.287 9.773L11.709 15.195L25.389 1.515L27.2 3.318L11.709 18.809L4.48 11.58Z"
        fill={fill}
      />
    </svg>
  )
}

export default ActivityIcon
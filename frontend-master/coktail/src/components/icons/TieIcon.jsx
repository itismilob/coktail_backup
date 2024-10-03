const TieIcon = ({ 
  width = '35', 
  height = '35', 
  fill = '#ffffff', 
  viewBox="0 0 42 42" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4982 4.47666L18.1427 9.72339C20.0127 10.281 19.2964 10.1664 21.2181 10.5885C23.177 10.1548 22.4013 10.2731 24.2732 9.72339L24.998 4.43411C23.4098 4.27912 22.905 4.25176 21.2163 4.25325C19.446 4.25021 18.7505 4.33262 17.4982 4.47666ZM18.1427 12.0184L15.4992 33.7233L21.2178 41.4466L26.9992 33.7233L24.2732 12.0184L18.1427 12.0184Z"
        fill={fill}
      />
    </svg>
  )
}


export default TieIcon;
const DefaultProfileIcon = ({
  width = '128px',
  height = '128px',
  fill = '#FFB6B5',
  fillFace = '#ffffff',
  viewBox = '0 0 30 30',
}) => {
  return (
  <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.5912 28.4697L20.0759 26.9543H29.9258L28.4104 28.4697M24.2432 33.0159V37.562H20.4547V39.0774H29.547V37.562H25.7585V33.0159L31.82 26.9543V25.439H18.1816V26.9543L24.2432 33.0159Z" fill={fillFace}/>
  <circle cx="20.1614" cy="21.2596" r="1.97977" fill={fillFace}/>
  <circle cx="29.8391" cy="21.2596" r="1.97977" fill={fillFace}/>
  <circle cx="25.0001" cy="26.0194" r="15.9786" fill={fill}/>
  <mask id="mask0_1077_673" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
  <path d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z" fill={fillFace}/>
  </mask>
  <g mask="url(#mask0_1077_673)">
  <path d="M45.5916 53.6951C45.5916 62.5199 36.3155 69.6737 24.873 69.6737C13.4304 69.6737 4.1543 62.5199 4.1543 53.6951C4.1543 44.8704 13.4304 37.7166 24.873 37.7166C36.3155 37.7166 45.5916 44.8704 45.5916 53.6951Z" fill={fill}/>
  <path d="M45.7186 51.9112C45.7186 60.7359 36.4425 67.8898 24.9999 67.8898C13.5573 67.8898 4.28125 60.7359 4.28125 51.9112C4.28125 43.0865 13.5573 35.9326 24.9999 35.9326C36.4425 35.9326 45.7186 43.0865 45.7186 51.9112Z" fill={fill}/>
  </g>
  <path d="M21.5912 28.4697L20.0759 26.9543H29.9258L28.4104 28.4697M24.2432 33.0159V37.562H20.4547V39.0774H29.547V37.562H25.7585V33.0159L31.82 26.9543V25.439H18.1816V26.9543L24.2432 33.0159Z" fill={fillFace}/>
  <circle cx="20.1614" cy="21.2596" r="1.97977" fill={fillFace}/>
  <circle cx="29.8391" cy="21.2596" r="1.97977" fill={fillFace}/>
  <circle cx="14.4407" cy="13.7803" r="3.73956" fill={fill}/>
  <circle cx="34.679" cy="13.7803" r="3.73956" fill={fill}/>
  </svg>
  )
}

export default DefaultProfileIcon
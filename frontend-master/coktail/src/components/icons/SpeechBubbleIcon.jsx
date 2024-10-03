const SpeechBubble = ({
  width = '28',
  height = '26',
  fill = '#FFA1A1',
  viewBox = '0 0 28 26',
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
        d="M14 0C21.7315 0 28 5.04635 28 11.2719C28 17.4975 21.7315 22.5439 14 22.5439C13.258 22.5439 12.5282 22.497 11.8177 22.4069C8.81125 25.3861 5.22025 25.922 1.75 26V25.2699C3.62425 24.3595 5.25 22.7034 5.25 20.8097C5.24973 20.5496 5.22984 20.2899 5.1905 20.0328C2.02475 17.9657 0 14.8096 0 11.2719C0 5.04635 6.2685 0 14 0Z"
        fill={fill}
      />
    </svg>
  )
}

export default SpeechBubble;

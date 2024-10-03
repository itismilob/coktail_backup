import { useEffect, useState } from 'react'

/* img */
import StarIcon from '@/components/icons/StarIcon'

function Star({ size, filled, onClick }) {
  return (
    <span
      role="button"
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    >
      <StarIcon width={size} fill={filled ? '#FFD600' : '#D9D9D9'} />
    </span>
  )
}

export default function StarRating({
  max = 5,
  size = 25,
  setRating,
  defaultValue,
}) {

  const [rate, setRate] = useState(0)

  useEffect(() => {
    setRate(defaultValue)
  }, [defaultValue])

  const onClick = (newRating) => {
    setRate(newRating)
    setRating(newRating)
  }
  return (
    <div>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          filled={rate >= i + 1}
          onClick={() => {onClick(i + 1)}}
        />
      ))}
    </div>
  )
}

/* 시멘틱 > role */

import { Link } from 'react-router-dom'

import ImageAndCircle from '@/components/ImageAndCircle'
import StarsArray from '@/components/StarsArray'

import { BsChatDotsFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'

const starTitle = ['단맛', '쓴맛', '신맛', '도수']

export default function Suggest({ data }) {
  const stars = [data.sweet, data.bitter, data.sour, data.abv]
  return (
    <div className="suggestDrink">
      <Link to={`/cocktails/${data._id}`}>
        <div>
          <div>
            <ImageAndCircle imgUrl={data.image} />
          </div>

          <div>
            <div className="tag">
              <div>{data.base}</div>
            </div>
            <h1>{data.name}</h1>

            <div className="stars">
              {stars.map((star, index) => (
                <div key={index}>
                  <div>{starTitle[index]}</div>
                  <div>
                    <StarsArray starCount={star} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
